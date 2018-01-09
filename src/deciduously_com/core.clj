(ns deciduously-com.core
  (:require [deciduously-com.web :refer [export port prod-handler target-dir]]
            [ring.adapter.jetty :refer [run-jetty]])
  (:gen-class))

(defn -main [& args]
  (export target-dir)
  (run-jetty prod-handler {:port port}))
