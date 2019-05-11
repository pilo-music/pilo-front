import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Browser from "@/views/Browser.vue";
import Search from "@/views/Search.vue";
import Profile from "@/views/Profile.vue";
import Panel from "@/views/Panel.vue";

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
          path: "home",
          name: "home",
          component: Home
        },
        {
          path: "browser",
          name: "browser",
          component: Browser
        },
        {
          path: "search",
          name: "search",
          component: Search
        },
        {
          path: "profile",
          name: "profile",
          component: Profile
        }
      ]
    }
  ]
});
