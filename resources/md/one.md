# Static Site in Clojure
## Part 1: boot
What better way to birth a blog than a discussion of the guts?

Is there a less disgusting way to phrase this question?

As you read on you'll find out - probably and definitely.  Here we go!
## Intro
I built this blog (almost) entirely in [Clojure](https://clojure.org/).  Not only that, but very very little Clojure.  The meatiest source file [web.clj](https://github.com/deciduously/deciduously-com/blob/master/src/deciduously_com/web.clj) clocks in at around 100 lines.  Granted, this is *not* a compliated website, but it's still impressive how much you can accomplish with so few lines of code.  This is made possible both through the terseness of the language and the thoughtfulness of the library designers.

According to [`loc`](https://github.com/cgag/loc)at time of writing I have 185 sloc of Markdown, 160 sloc of Clojure, 77 of CSS including externs, 70 for the Makefile, and 8 of HTML - 450 exactly.

If you're unfamiliar with Clojure, it would help to spend some time with Chapter 3 of Clojure for the Brave and True: [Do Things](https://www.braveclojure.com/do-things/).  It's a good crash course in the syntax - there really isn't much syntax to learn, and you really don't need a ton to understand this post/series.

To start off, the bulk of the static site engine is directly taken from this excellent 2011 [tutorial](https://cjohensen.no/building-statis-sites-in-clojure-with-stasis/) by [Christian Johansen](https://github.com/cjohansen).  I will try as much as possible to avoid overlapping except where necessary - go read the tutorial, it's fun.

This is not intended to be a rewrite, despite the overlap.  Instead, my intent here is to walk through the process of getting that six year old Clojure tutorial working for me in a larger context, using modern tools.  His walkthrough takes you up to exporting an optimized static site for uploading elsewhere, and except for a few sticking points worked without much pain.  I wanted to take a stab at building the server and deploying to Heroku as well, though, two things I'd never done.

I will try to be in depth where this project differs and brief where they don't, and I'll do my best to provide links for added clarity if necessary.

Please tell me at [contact@deciduously.com](contact@deciduously.com) if something needs work!

The fact that the tutorial itself required little tweaking if any should come as no surprise - many Clojure libraries seem to hit a point where they're done and stop development.  A lot of robust tools can feel like abandonware when you look at their commit history.  When things don't work, though, it can be difficult to track down answers to your questions which is why I wanted to do this from scratch as simply as possible.

This post will be concerned with setting up the project, stay tuned for more!
## Booting Up
#### Dependencies
If you have a JDK, GNU `make`, and `curl` installed, you're good to go.  If you don't, your OS/package manger will be able to help you out.  That's really it - I use `xz` to compress releases, you can use anything you like.
#### Boot vs. Lein
Using [`boot`](http://boot-clj.com) instead of `lein` ended up causing a lot of friction simply because `lein` is the de facto standard in the Clojure community, and `boot` is simply newer.  There is a pretty large documentation gap between the two, and a pretty large official support gap regarding services like Heroku and Travis.

Getting everything working, though, ended up being a both a great way to learn more about how boot works, and highlighted some of the problems it was designed specifically to solve.  The way it allows you to script build tasks is very natural, and there is a lot more untapped power there I'm looking forward to playing with.

Setting up a `build.boot` file is very similar to setting a up `project.clj` like Christian's.  The flexibility of the format means I didn't have to do anything I hadn't done before in small projects - just composing pipelines.  It's easy to tweak and test, and most of my tweaking had to do with my utter inability to write a proper Makefile.
#### build.boot
If you've only used `lein`, initial setup is slightly but not very different.  First, set up your folder:
```shell
mkdir -p example-com/ && cd example-com/ && git init
echo "target/\n" > .gitignore
echo "v0.0.1" > version.properties
```
I also add `.#\n.nrepl-` to filter out emacs/cider things, you should tailor to fit.

You're welcome to procure [boot](http://boot-clj.com) any way you like, and may want to install it globally eventually, but you can use the following Makefile to provide a `make deps` command to install boot to the project location.  The shim is very small and just loads version you specify, latest by default, for you, and reads the users maven repository.

We'll use the Makefile again, so I recommend adding it to your project to follow along even if you do choose another installation route.  You can download it [here](https://gist.github.com/deciduously/3451bfc89414c56ef734ceebeeb7db14) or copy it below:]
```makefile
# Makefile
.PHONY: help deps

SHELL       := /bin/bash
export PATH := bin:$(PATH)

help:
	@echo "Usage: make {deps|help}" 1>&2 && false
    
bin/boot:
	(mkdir -p bin/                                                                              && \
	curl -fsSLo bin/boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh  && \
	chmod 755 bin/boot)

deps: bin/boot
```
After installing boot, run `boot -u > boot.properties`.  Use this file to specify versions for the shim to load.

Issue `touch build.boot` in the root dir of the project and open it with your favorite [editor](http://spacemacs.org).  Start with `set-env!`:
```clojure
;; build.boot
(set-env!
 :source-paths #{"src/"}
 :dependencies '[[org.clojure/clojure "1.9.0"]
                 [hiccup "1.0.5" :scope "test"]
                 [ring/ring-core "1.6.3"]
                 [ring/ring-jetty-adapter "1.6.3"]
                 [ring/ring-devel "1.6.3"]
                 [stasis "2.3.0"]
                 [pandeiro/boot-http "0.8.3" :scope "test"]])
```
Notably the `:dependencies` vector is quoted to pass to `set-env`, unlike for `defproject`, and you use a set for :source-paths.  I'll go over library each as we use them.

Specifying `:scope "test"` ensures those deps stay [out of the jar](https://www.zazzle.com/rlv/stay_out_hands_candy_cookie_jar_candy_jars-r7ec7cc8b404143a3be44e853c1d7e4ef_2ih7l_8byvr_512.jpg), which will only need to serve pre-compiled html, css, and javascript!

The license/description information is specified with the `pom` options in `task-options`:
```clojure
(task-options!
  pom {:project 'example-com
       :description "Static website generator and server"
       :url "http://www.example.com"
       :license {"MIT" "https://mit-license.org"}
       :developers {"you" "dev@example.com"}})
  
(require '[example-com.web :refer [dev-handler]]
         '[pandeiro.boot-http :refer [serve]])
```
Set whatever `pom` options you'd like. The only necessary ones are `:project` and `:version`, which you can get from `version.properties` by adding `(second (str/split (slurp "version.properties") #"="))` after the `(require)` form. `#""` is a reader macro that compiles to a [`java.util.regex.Pattern`](https://docs.oracle.com/javase/9/docs/api/java/util/regex/Pattern.html).

We also pull in the `web` namespace we're going to write and the `serve` task from `boot-http`(https://github.com/pandeiro/boot-http).

Now you can add a dev task and a build task:
```clojure
(deftask dev
  "Run live development server"
  []
  (comp
    (serve :handler `example.core/dev-handler :reload true :port 3000)
    (wait)))
```
And that's that!  Four forms.  Configuring `boot` starts off quite simple.  You compose your own build pipelines with `comp` - these are very readable and act as you expect.  Because the `target` task always clobbers, you don't need to clean it.

Now, finally, let's make a Clojure file.  Execute `mkdir -p src/example_com/ && touch web.clj`.  Then declare the namespace:
```clojure
;; web.clj
(ns example-com.web
  (:require [hiccup.core :refer [html]]))
```
We just pull in the `html` function to compile Clojure vectors to html strings from [`hiccup`](https://github.com/weavejester/hiccup).

Then add a very basic [Ring handler](https://github.com/ring-clojure/ring/wiki/Concepts):
```clojure
(defn dev-handler [req]
  {:status 200
   :headers {"Content-Type" "text/plain"}
   :body (html [:h1 "Hello, world!"]
               [:p (str "IP: " (:remote-addrs req))])})
```
I'm deliberately reserving `core` for the `server.jar` main function - you can name the namespace whatever you like.  
That's it!  Run `boot dev -h`, and then `boot dev` will run a server on `localhost:3000`.  If you point your brower there, you should see:
# Hello, world!
Congratulations!  You built a webserver.  Go make a cup of tea.

Thanks for playing, and come back next time to export and deploy your very own jar!
