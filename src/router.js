import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Music from "@/views/Music.vue";
import App from "@/App";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: App,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          name: "home",
          component: Home
        },
        {
          path: "music/:slug",
          name: "music",
          component: Music
        },
        {
          path: "artist/:slug",
          name: "artist",
          component: Music
        }
      ]
    }
  ]
});
