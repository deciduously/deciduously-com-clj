(ns deciduously-com.core
  (:require [deciduously-com.web :refer [port prod-handler]]
            [ring.adapter.jetty :refer [run-jetty]])
  (:gen-class))

(defn -main [& args]
  (run-jetty prod-handler {:port port}))
