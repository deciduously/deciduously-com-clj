(ns deciduously-com.highlight
  (:require [clygments.core :as clygments]
            [net.cgrand.enlive-html :as enlive]))

(defn- extract-code
  "Use Enlive to grab the code element to highlight"
  [highlighted]
  (-> highlighted java.io.StringReader. enlive/html-resource (enlive/select [:pre]) first :content))

(defn- highlight
  "Apply proper class for styling to node"
  [node]
  (let [code (->> node :content (apply str))
        lang (->> node :attrs :class keyword)]
    (assoc node :content (-> code (clygments/highlight lang :html) extract-code))))

(defn highlight-code-blocks
  "Run highlighter on each code block"
  [page]
  (enlive/sniptest page
                   [:pre :code] highlight
                   [:pre :code] #(assoc-in % [:attrs :class] "highlight")))
