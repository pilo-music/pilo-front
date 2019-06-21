import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/views/Index"),
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/Home.vue")
        },
        {
          path: "browser",
          name: "browser",
          component: () => import("@/views/Browser.vue")
        },
        {
          path: "search",
          name: "search",
          component: () => import("@/views/Search.vue")
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("@/views/Profile.vue")
        },
        {
          path: "music/:slug",
          name: "music",
          component: () => import("@/views/Music.vue")
        },
        {
          path: "musics/:filter?",
          name: "musics",
          component: () => import("@/views/Musics.vue")
        },
        {
          path: "album/:slug",
          name: "album",
          component: () => import("@/views/Album.vue")
        },
        {
          path: "albums/:filter?",
          name: "albums",
          component: () => import("@/views/Albums.vue")
        },
        {
          path: "video/:slug",
          name: "video",
          component: () => import("@/views/Video.vue")
        },
        {
          path: "videos/:filter?",
          name: "videos",
          component: () => import("@/views/Videos.vue")
        },
        {
          path: "artist/:slug",
          name: "artist",
          component: import("@/views/Music.vue")
        }
      ]
    }
  ]
});
