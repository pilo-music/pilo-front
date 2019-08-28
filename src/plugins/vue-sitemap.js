import VueRouterSitemap from "vue-router-sitemap";
import path from "path";
import router from "@/services/router/router";

export const sitemapMiddleware = () => {
  return (req, res) => {
    res.set("Content-Type", "application/xml");

    const staticSitemap = path.resolve("dist/static", "sitemap.xml");
    const filterConfig = {
      isValid: false,
      rules: [/\/example-page/, /\*/]
    };

    new VueRouterSitemap(router)
      .filterPaths(filterConfig)
      .build("https://pilo.app")
      .save(staticSitemap);

    return res.sendFile(staticSitemap);
  };
};
