(ns deciduously-com.test
  (:require  [deciduously-com.web :refer :all]
             [midje.sweet :refer :all]
             [net.cgrand.enlive-html :as enlive]))

(fact "All pages respond with 200 OK"
      (doseq [url (keys (get-pages))]
        (let [status (:status (dev-handler {:uri url}))]
          [url status] => [url 200])))

(defn link-valid? [pages link]
  (let [href (get-in link [:attrs :href])]
    (or
     (not (.startsWith href "/"))
     (contains? pages href)
     (contains? pages (str href "index.html")))))

(fact "All links are valid"
      (let [pages (get-pages)]
        (doseq [url (keys pages)
                link (-> (:body (dev-handler {:uri url}))
                         java.io.StringReader.
                         enlive/html-resource
                         (enlive/select [:a]))]
          (let [href (get-in link [:attrs :href])]
            [url href (link-valid? pages link)] => [url href true]))))