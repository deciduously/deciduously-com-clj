# deciduously.com
[![GithubVersion](https://img.shields.io/badge/version-0.2.0-red.svg?style=flat-square)](https://github.com/deciduously/deciduously-com/tree/v0.2.0-alpha-r1)
[![Heroku](https://heroku-badge.herokuapp.com/?app=polar-refuge-87230&style=flat)](http://www.deciduously.com)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)]()
[![Build Status](https://travis-ci.org/deciduously/deciduously-com.svg?branch=release)](https://travis-ci.org/deciduously/deciduously-com)
[![GitHub last commit (release)](https://img.shields.io/github/last-commit/google/skia/infra/config.svg?style=flat-square)](https://github.com/deciduously/deciduously-com.git)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/badges/shields.svg?style=flat-square)](htt[s://github.com/deciduously/deciduously-com.git)
1. [Run](#run) - requires a [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html) present
2. [Build](#build) - [requirements](#requirements)
3. [Libraries](#libraries)
4. [Acknowledgements](#acknowledgements)
### Run
#### Requirements
To download and run the [latest release](https://github.com/deciduously/deciduously-com/releases/tag/v0.2.0-alpha-r1) execute the following (until I write a script):
```shell
cd ~ # or wherever you like downloads

wget https://github.com/deciduously/deciduously-com/releases/download/v0.2.0-alpha-r1/deciduously-com-0.2.0.tar.xz
# or curl, aria2c, your C++ homework from a decade ago, etc

tar xvf deciduously-com-0.2.0.tar.xz
# if you don't have xz don't want to install it or the build tools, open an issue!

cd deciduously-0.2.0.tar.xz/
java -jar target/server.jar
```
`server.jar` reads the following environment variables, given with their
defaults:
```shell
PORT=3000
DIST=dist/
```
### Build
#### Requirements
* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [boot](https://github.com/boot-clj/boot)
* [bash](https://www.gnu.org/software/bash/)
* [make](https://www.gnu.org/software/make/)
* [curl](https://curl.haxx.se/)
#### Bundle
```shell
git clone https://github.com/deciduously/deciduously-com
cd deciduously-com/
make deps
make release
```
This takes about four minutes to run - go put on a nice hot cup of your
favorite kind of tea.  The resulting
folder or archive can then be used as described in Usage.  Run `make help` for a list of all available make targets.
#### Hack
You may also invoke `boot` directly:
* `boot build` to export the static site and build a production uberjar at target/server.jar.
* `boot dev` to start a development server with hot reloading
* `boot dist` to export the static site
* `boot midje` to run the test suite
* `boot prod` to export and serve the static site
### Libraries
* [**Clygments**](https://github.com/bfontaine.clygments) - Clojure wrapper for [Pygments](https://pygments.org)
* [**Enlive**](https://github.com/cgrand/enlive) - HTML/XML extraction and transformation
* [**Hiccup**](https://github.com/weavejester/hiccup) - Represent HTML in Clojure
* [**markdown-clj**](https://github.com/yogthos/markdown-clj) - Markdown parser
* [**Midje**](https://github.com/marick/midje) - Test framework
* [**boot-midje**](https://bitbucket.org/zilti/boot-midje) - Boot plugin for midje
* [**Ring**](https://ring-clojure/ring) - HTTP server abstraction
* [**Optimus**](https://github.com/magnars/optimus) - Ring middleware for frontend performance optimization
* [**Stasis**](https://github.com/magnars/stasis) - Static website toolset
* [**boot-http**](https://github.com/pandeiro/boot-http) - Boot http server plugin
### Acknowledgements
Many thanks to [Christian Johansen's](https://github.com/cjohansen) [tutorial](https://cjohensen.no/building-statis-sites-in-clojure-with-stasis/).
  I use boot instead of lein but otherwise followed this quite closely for the static site component.
