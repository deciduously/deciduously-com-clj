# deciduously.com
[Personal landing page](http://deciduously.com) source code.
### Usage

Download the latest release and execute the following:
```shell
tar xvf deciduously-com-0.1.0.tar.xz
cd deciduously-0.1.0.tar.xz/
java -jar bin/server.jar
```
`server.jar` reads environment variables `PORT` defaulting to 3000 and `BUILD` with no default.

If `BUILD` is not set, the `server.jar` will use development settings.
Set `BUILD=prod` to first bundle and export the optimized static site to dist/ and then run jetty on the static output.

### Develop

`build-release.sh` requires the target dir to be specified with `-d` and can
optionally compress the output directory with xz by specifying `-c=true`.  It will build the server on first run.

For example:

`./build-release.sh -d "../releases" -c true`
#### Tasks Tasks
* `boot build` to build a production uberjar at target/server.jar.
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

