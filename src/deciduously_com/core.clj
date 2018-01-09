(ns deciduously-com.core
  (:require [deciduously-com.web :refer [export prod-handler]]
            [ring.adapter.jetty :refer [run-jetty]])
  (:gen-class))

(def port (Integer/valueOf (or (System/getenv "PORT") "3000")))
(def target-dir (or (System/getenv "DIST") "dist/"))

(defn -main [& args]
  (export target-dir)
  (run-jetty prod-handler {:port port}))
