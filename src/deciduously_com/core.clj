(ns deciduously-com.core
  (:require [deciduously-com.web :refer [export prod-handler dev-handler]]
            [ring.adapter.jetty :refer [run-jetty]])
  (:gen-class))

(def port (Integer/valueOf (or (System/getenv "PORT") "3000")))

(defn -main [& args]
  (let [mode (System/getenv "BUILD")]
    (if (= mode "prod")
      (do (export) (run-jetty prod-handler {:port port}))
      (run-jetty dev-handler {:port port}))))
