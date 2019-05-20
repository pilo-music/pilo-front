import Vue from "vue";
import Router from "vue-router";
import Panel from "@/views/Panel.vue";
import Music from "@/views/Music.vue";
// import App from "@/App";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/panel",
      component: Panel,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          name: "panel",
          component: Panel
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
