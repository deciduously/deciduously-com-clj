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

;; Configuration

(def domain "deciduously")

(def system-env #(or (System/getenv %) %2))

(def config {:port (Integer/valueOf (system-env "PORT" "3000"))
             :target (system-env "DIST" "dist/")
             :build (system-env "BUILD" "dev")
             :version (-> "version.properties"
                          slurp
                          (str/split #"=")
                          second)})

;; Assets

(defn get-assets
  "Define Optimus assets"
  []
  (concat
   (assets/load-bundle "public" "styles.css" ["/styles/main.css"])
   (assets/load-assets "public" ["/img/favicon.ico"])))

(defn get-exported-pages
  "Stasis get-pages for pre-exported material"
  [target]
  (s/slurp-directory target #".+\.(html|js|css)$"))

;; Utility

(defn http-link
  "http-link helper"
  ([url] [:a {:href url} url])
  ([url text] [:a {:href url} text]))

(def github-link
  (let [base "https://github.com/deciduously/deciduously-com"]
    (str base (if (= "prod" (:build config)) (str "/releases/tag/" (:version config)) "/tree/master"))))

;; Main skeleton

(defn layout-page
  "Page skeleton"
  [request page]
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport"
            :content "width=device-width, initial-scale=1.0"}]
    [:title "deciduously"]
    [:link {:rel "icon" :href (link/file-path request "/img/favicon.ico")}]
    (link-to-css-bundles request ["styles.css"])]
   [:body
    [:div.body page [:br]
     [:footer.footer
      (str "&#169; 2018 ")
      (http-link "/" domain) [:br]
      (http-link github-link "source")]]]))

;; Stasis

(defn partial-pages
  "Add partials to page skeleton, swapping in place"
  [pages]
  (zipmap (keys pages)
          (map #(fn [req] (layout-page req %)) (vals pages))))

;; TODO run edn through hiccup instead of just having raw html

(defn markdown-pages
  "Parse markdown files, swapping in place"
  [pages]
  (zipmap (map #(str (str/replace % #"\.md$" "") "/") (keys pages))
          (map #(fn [req] (layout-page req (md-to-html-string %))) (vals pages))))

(defn get-raw-pages
  "Pull in the raw files, Statis-style"
  []
  (s/merge-page-sources
   {:public (s/slurp-directory "resources/public/" #"\.(html|js|css)$") ;TODO prevent non-used css files from getting in the bundle
    :partials (partial-pages (s/slurp-directory "resources/partials/" #"\.html$"))
    :markdown (markdown-pages (s/slurp-directory "resources/md/" #"\.md$"))
    :apps (s/slurp-directory "resources/apps/" #"\.(html|js|css)$")}))

;; Highlight

(defn prepare-page
  "Highlight a page where applicable"
  [page req]
  (-> (if (string? page) page (page req))
      highlight-code-blocks))

(defn prepare-pages
  "Highlight all the pages"
  [pages]
  (zipmap (keys pages)
          (map #(partial prepare-page %) (vals pages))))

(defn get-pages
  "Run all the raw pages through the highlighter"
  [] (prepare-pages (get-raw-pages)))

;; Ring handlers

(def dev-handler
  (-> (s/serve-pages (get-pages))
      (optimus/wrap get-assets optimizations/none serve-live-assets)))

(def prod-handler
  (-> (s/serve-pages (get-exported-pages (:target config)))
      wrap-content-type
      wrap-not-modified
      wrap-gzip))

;; Boot task

(defn export [target-dir]
  (let [assets (optimizations/all (get-assets) {})]
    (s/empty-directory! target-dir)
    (optimus.export/save-assets assets target-dir)
    (s/export-pages (get-pages) target-dir {:optimus-assets assets})))
