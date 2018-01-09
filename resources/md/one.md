# Blog
Insights

This is some clojurescript:
```clojure
(defn checksum
  "Adds up result of f for each row"
  [s f]
  (->> (split s "\n")
       (map #(split % "\t"))
       (map #(let [xs (map js/parseInt %)] (f xs)))
       (reduce +)))
```

Have a good day!
