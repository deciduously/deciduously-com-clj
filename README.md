# deciduously.com
[Personal landing page](http://deciduously.com) source code.
### Boot Tasks
* `boot build` to build a production uberjar at target/server.jar.
* `boot dev` to start a development server with hot reloading.
* `boot midje` to run the test suite.
* `boot prod` to export and serve the static site
### Usage
Run with `java -jar target/server.jar`.
Reads environment variables `PORT` defaulting to 3000 and `build` with no default.

If `build` is not set, the `server.jar` will use development settings.
Set `build=prod` to first bundle and export the optimized static site to dist/ and then run jetty on the static output.
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

