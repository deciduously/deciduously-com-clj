# deciduously.com
[Personal landing page](http://www.deciduously.com) source code.
### Usage

Requires a JDK installed, either [Oracle](www.oracle.com/technetwork/java/javase/downloads/index.html") or [OpenJDK](https://openjdk.java.net) to run the binary.  I've only tested with 1.8 and 1.9
so far.

Download the latest release and execute the following:
```shell
tar xvf deciduously-com-0.1.2.tar.xz
cd deciduously-0.1.2.tar.xz/
java -jar target/server.jar
```
`server.jar` reads the following environment variables, given with their
defaults:
```shell
PORT=3000
DIST=dist/
```
### Develop
To build, you need to install [boot](https://github.com/boot-clj/boot) as well
as a JDK.  To use the provided script on Linux or OS X run for example:
```shell
git clone https://github.com/deciduously/deciduously-com
cd deciduously-com/
chmod +x build-release.sh
./build-release.sh -d "../releases" -c true
```
The script takes about five minutes to run - such is Clojure.

`build-release.sh` requires the target dir to be specified with `-d` and can
optionally compress the output directory with xz by specifying `-c=true`.  It will build the server first, no need to run `boot build` separately.
#### Tasks
You may also invoke `boot` directly:
* `boot build` to export the static site and build a production uberjar at target/server.jar.
* `boot dev` to start a development server with hot reloading.
* `boot midje` to run the test suite.
* `boot prod` to export and serve the static site

### Libraries
* [**Clygments**](https://github.com/bfontaine.clygments) - Clojure wrapper for [Pygments](https://p)
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
