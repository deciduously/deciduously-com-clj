(set-env!
 :source-paths #{"src/"}
 :resource-paths #{"resources/"}
 :dependencies '[[org.clojure/clojure "1.9.0"]
                 [bk/ring-gzip "0.2.1"]
                 [clygments "1.0.0"]
                 [enlive "1.1.6"]
                 [hiccup "1.0.5"]
                 [markdown-clj "1.0.1"]
                 [midje "1.9.1"]
                 [optimus "0.20.1"]
                 [ring/ring-core "1.6.3"]
                 [ring/ring-jetty-adapter "1.6.3"]
                 [ring/ring-devel "1.6.3"]
                 [stasis "2.3.0"]
                 [zilti/boot-midje "0.2.2-SNAPSHOT"]
                 [pandeiro/boot-http "0.8.3"]])

(task-options!
  aot {:all true}
  pom {:project 'deciduously-com
       :version "0.1.2"}
  jar  {:main 'deciduously-com.core
        :file "server.jar"}
  sift {:include #{#"server.jar"}})

(require '[deciduously-com.web :refer [export port target-dir]]
         '[pandeiro.boot-http :refer [serve]]
         '[zilti.boot-midje :refer [midje]])

(deftask dev
  "Run live development server"
  []
  (comp
   (serve :handler 'deciduously-com.web/dev-handler :reload true :port port)
   (wait)))

(deftask prod
  "Export and serve static site"
  []
  (do (export target-dir) (comp (serve :handler 'deciduously-com.web/prod-handler :port port) (wait))))

(deftask build
  "Exports the static site and builds a production uberjar"
  []
  (do
    (export target-dir)
    (comp
      (aot)
      (pom)
      (uber)
      (jar)
      (sift)
      (target))))
