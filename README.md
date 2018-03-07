# deciduously.com
[![GithubVersion](https://img.shields.io/badge/version-0.1.4-red.svg?style=flat-square&color=brightgreen)](https://github.com/deciduously/deciduously-com/tree/v0.1.4)
[![Build Status](https://travis-ci.org/deciduously/deciduously-com.svg?branch=release)](https://travis-ci.org/deciduously/deciduously-com)
[![GitHub license](https://img.shields.io/github/license/deciduously/deciduously-com.svg?style=flat-square)](https://github.com/deciduously/deciduously-com/blob/release/LICENSE)
### Contents
1. [Run](#run)
2. [Build](#build) - [requirements](#requirements)
3. [Libraries](#libraries)
4. [Acknowledgements](#acknowledgements)
### Run
To download and run the [latest release](https://github.com/deciduously/deciduously-com/releases/tag/v0.1.4) make sure you have `java` available and execute the following:
```shell
cd ~
wget https://github.com/deciduously/deciduously-com/releases/download/v0.1.4/deciduously-com-0.1.4-bundle.bin.tar.xz
tar xvf deciduously-com-0.1.4.bin.tar.xz
cd deciduously-com/ && java -jar target/server.jar
```
`server.jar` reads the following environment variables, given with their
defaults:
```shell
PORT=3000
DIST=dist/
BUILD=dev
```
### Build
#### Requirements
* [Oracle JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html) or [OpenJDK](http://openjdk.java.net/)
* [bash](https://www.gnu.org/software/bash/)
* [make](https://www.gnu.org/software/make/)
* [curl](https://curl.haxx.se/)
* [xz](https://tukaani.org/xz/)
#### Bundle
```shell
git clone https://github.com/deciduously/deciduously-com
cd deciduously-com/ && make install
```
This takes about four minutes to run, longer the first time as boot gathers
dependencies - go put on a nice hot cup of your
favorite kind of tea.  The resulting
folder can then be used as described in "Run" at `dist/`. `make release` will produce a compressed archive at `release/deciduously-com-0.1.3-bundle.tar.xz`.  Run `make help` for a list of all available make targets.
#### Hack
`boot -h` for the full list of available tasks.  I define the following
in
[build.boot](https://github.com/deciduously/deciduously-com/blob/release/build.boot):
* `boot build` to export the static site and build a production uberjar at target/server.jar.
* `boot dev` to start a development server with hot reloading
* `boot dist` to export the static site
* `boot prod` to export and serve the static site

Instead of `boot build` at first, I recommend using `make install` to invoke `boot build` and put together the runtime environment for you.  Fewer stacktraces are almost guaranteed.

Use `make test` to run `make release` and then `boot midje`.  Check [Travis](https://travis-ci.org/deciduously/deciduously-com) for recent outputs.
### Libraries
* [**Clygments**](https://github.com/bfontaine.clygments) - Clojure wrapper for [Pygments](https://pygments.org)
* [**Enlive**](https://github.com/cgrand/enlive) - HTML/XML extraction and transformation
* [**Hiccup**](https://github.com/weavejester/hiccup) - Represent HTML in Clojure
* [**markdown-clj**](https://github.com/yogthos/markdown-clj) - Markdown parser
* [**Midje**](https://github.com/marick/midje) - Test framework
* [**boot-midje**](https://bitbucket.org/zilti/boot-midje) - Boot plugin for midje
* [**Ring**](https://github.com/ring-clojure/ring) - HTTP server abstraction
* [**Optimus**](https://github.com/magnars/optimus) - Ring middleware for frontend performance optimization
* [**Stasis**](https://github.com/magnars/stasis) - Static website toolset
* [**boot-http**](https://github.com/pandeiro/boot-http) - Boot http server plugin
### Acknowledgements
Many thanks to [Christian Johansen's](https://github.com/cjohansen) [tutorial](https://cjohensen.no/building-statis-sites-in-clojure-with-stasis/).
  I use boot instead of lein but otherwise followed this quite closely for the static site component.

 The makefile is adapted partially from [boot's](https://github.com/boot-clj/boot/blob/master/Makefile) very own - I'd never written one and read theirs, hacked some stuff together and destroyed it for a day and a half.  Feel free to point and laugh, sling vegetables, and/or open a pull request!

