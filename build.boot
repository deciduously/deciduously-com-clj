(set-env!
 :source-paths #{"src/"}
 :resource-paths #{"resources/"}
 :dependencies '[[org.clojure/clojure "1.9.0"]
                 [bk/ring-gzip "0.2.1"]
                 [clygments "1.0.0"]
                 [enlive "1.1.6" :scope "test"]
                 [hiccup "1.0.5" :scope "test"]
                 [markdown-clj "1.0.1" :scope "test"]
                 [midje "1.9.1" :scope "test"]
                 [optimus "0.20.1"]
                 [ring/ring-core "1.6.3"]
                 [ring/ring-jetty-adapter "1.6.3"]
                 [ring/ring-devel "1.6.3"]
                 [stasis "2.3.0"]
                 [zilti/boot-midje "0.2.2-SNAPSHOT" :scope "test"]
                 [pandeiro/boot-http "0.8.3" :scope "test"]])

(task-options!
  aot {:namespace #{'deciduously-com.core}}
  pom {:project 'deciduously-com
       :description "Personal blog"
       :url "http://www.deciduously.com"
       :license {"MIT" "https://github.com/deciduously/deciduously-com/blob/release/LICENSE"}
       :developers {"deciduously" "dev@deciduously.com"}}
  jar  {:main 'deciduously-com.core
        :file "server.jar"}
  sift {:include #{#"server.jar"}})

(require '[deciduously-com.web :refer [export port target-dir version]]
         '[deciduously-com.test]
         '[pandeiro.boot-http :refer [serve]]
         '[zilti.boot-midje :refer [midje]])

(deftask dev
  "Run live development server"
  []
  (comp
   (serve :handler 'deciduously-com.web/dev-handler :reload true :port port)
   (wait)))

(deftask dist
  "Export static site"
  []
  (do (println "***** Bundling and exporting...") (export target-dir)))

(deftask prod
  "Export and serve static site"
  []
  (do (dist) (comp (serve :handler 'deciduously-com.web/prod-handler :port port) (wait))))

(deftask build
  "Exports the static site and builds a production uberjar"
  []
  (do
    (dist)
    (println "***** Compiling jar")
    (comp
      (aot)
      (pom :version version)
      (uber)
      (jar)
      (sift)
      (target))))