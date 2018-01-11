(ns deciduously-com.web
  (:require [deciduously-com.highlight :refer [highlight-code-blocks]]
            [clojure.string :as str]
            [hiccup.page :refer [html5]]
            [markdown.core :refer [md-to-html-string]]
            [optimus.assets :as assets]
            [optimus.export]
            [optimus.html :refer [link-to-css-bundles]]
            [optimus.link :as link]
            [optimus.optimizations :as optimizations]
            [optimus.prime :as optimus]
            [optimus.strategies :refer [serve-live-assets serve-frozen-assets]]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.middleware.gzip :refer [wrap-gzip]]
            [ring.middleware.not-modified :refer [wrap-not-modified]]
            [ring.middleware.reload :refer [wrap-reload]]
            [stasis.core :as s]))

(def system-env #(or (System/getenv %) %2))

(def port (Integer/valueOf (system-env "PORT" "3000")))
(def version (second (str/split (slurp "version.properties") #"=")))
(def target-dir (system-env "DIST" "dist/"))
(def build (system-env "BUILD" "dev"))

(defn get-assets []
  (concat
   (assets/load-bundle "public" "styles.css" ["/styles/main.css"])
   (assets/load-assets "public" ["/img/favicon.ico"])))

(defn get-exported-pages [target]
  (s/slurp-directory target #".+\.(html|js|css)$"))

(defn layout-page [request page]
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport"
            :content "width=device-width, initial-scale=1.0"}]
    [:title "deciduously"]
    [:link {:rel "icon" :href (link/file-path request "/img/favicon.ico")}]
    (link-to-css-bundles request ["styles.css"])]
   [:body
    [:div.body page
     [:footer.footer "Copyright 2018 Herb Stratum." [:br]
      [:a {:href (str "https://github.com/releases/tag/" version)} version]]]]))

(defn partial-pages [pages]
  (zipmap (keys pages)
          (map #(fn [req] (layout-page req %)) (vals pages))))

 ; TODO run edn through hiccup instead of just having raw html

(defn markdown-pages [pages]
  (zipmap (map #(str (str/replace % #"\.md$" "") "/") (keys pages))
          (map #(fn [req] (layout-page req (md-to-html-string %))) (vals pages))))

(defn get-raw-pages []
  (s/merge-page-sources
   {:public (s/slurp-directory "resources/public/" #"\.(html|js|css)$") ;TODO prevent non-used css files from getting in the bundle
    :partials (partial-pages (s/slurp-directory "resources/partials/" #"\.html$"))
    :markdown (markdown-pages (s/slurp-directory "resources/md/" #"\.md$"))}))

(defn prepare-page [page req]
  (-> (if (string? page) page (page req))
      highlight-code-blocks))

(defn prepare-pages [pages]
  (zipmap (keys pages)
          (map #(partial prepare-page %) (vals pages))))

(defn get-pages [] (prepare-pages (get-raw-pages)))

(def dev-handler
  (-> (s/serve-pages (get-pages))
      (optimus/wrap get-assets optimizations/none serve-live-assets)))

(def prod-handler
  (-> (s/serve-pages (get-exported-pages target-dir))
      wrap-content-type
      wrap-not-modified
      wrap-gzip))

(defn export [target-dir]
  (let [assets (optimizations/all (get-assets) {})]
    (s/empty-directory! target-dir)
    (optimus.export/save-assets assets target-dir)
    (s/export-pages (get-pages) target-dir {:optimus-assets assets})))
