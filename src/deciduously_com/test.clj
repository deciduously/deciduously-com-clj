(ns deciduously-com.test
  (:require  [deciduously-com.web :refer :all]
             [midje.sweet :refer :all]
             [net.cgrand.enlive-html :as enlive]))

(def prod? (= "prod" build))

(fact "All pages respond with 200 OK"
      (doseq [url (keys (get-exported-pages target-dir))]
        (let [status (:status (prod-handler {:uri url}))]
          [url status] => [url 200])))

(defn link-valid? [pages link]
  (let [href (get-in link [:attrs :href])]
    (or
     (not (.startsWith href "/"))
     (contains? pages href)
     (contains? pages (str href "index.html")))))

(fact "All links are valid"
      (let [pages (get-exported-pages target-dir)]
        (doseq [url (keys pages)
                link (-> (:body (prod-handler {:uri url}))
                         java.io.StringReader.
                         enlive/html-resource
                         (enlive/select [:a]))]
          (let [href (get-in link [:attrs :href])]
            [url href (link-valid? pages link)] => [url href true]))))


;(fact "File structure fo ot what we expect"
;      (let [dev [pages (get-pages)]]
;        (doseq [prod-files (file-seq (clojure.java.io/file ""))])))
            
