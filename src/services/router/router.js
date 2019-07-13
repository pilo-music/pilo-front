import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/404",
      component: () => import("@/views/404.vue")
    },
    { path: "*", redirect: "/404" },
    {
      path: "/login",
      component: () => import("@/views/Login.vue"),
      name: "login"
    },
    {
      path: "/register",
      component: () => import("@/views/Register.vue"),
      name: "register"
    },
    {
      path: "/forgot",
      component: () => import("@/views/ForgotPassword.vue"),
      name: "forgot_password"
    },
    // Panel
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue")
    },
    {
      path: "/browser",
      name: "browser",
      component: () => import("@/views/Browser.vue")
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/Search.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Profile.vue")
    },
    {
      path: "/music/:slug",
      name: "music",
      component: () => import("@/views/Music.vue")
    },
    {
      path: "/musics/:artist?/:filter?",
      name: "musics",
      component: () => import("@/views/Musics.vue")
    },
    {
      path: "/album/:slug",
      name: "album",
      component: () => import("@/views/Album.vue")
    },
    {
      path: "/albums/:artist?/:filter?",
      name: "albums",
      component: () => import("@/views/Albums.vue")
    },
    {
      path: "/video/:slug",
      name: "video",
      component: () => import("@/views/Video.vue")
    },
    {
      path: "/videos/:artist?/:filter?",
      name: "videos",
      component: () => import("@/views/Videos.vue")
    },
    {
      path: "/artist/:slug",
      name: "artist",
      component: () => import("@/views/Artist.vue")
    },
    {
      path: "/artists",
      name: "artists",
      component: () => import("@/views/Artists.vue")
    },
    {
      path: "/playlists/:filter?",
      name: "playlists",
      component: () => import("@/views/Playlists.vue")
    },
    {
      meta: {
        requiresAuth: true
      },
      path: "/bookmarks",
      name: "bookmarks",
      component: () => import("@/views/Bookmarks.vue")
    },
    {
      meta: {
        requiresAuth: true
      },
      path: "/likes",
      name: "likes",
      component: () => import("@/views/Likes.vue")
    },
    {
      meta: {
        requiresAuth: true
      },
      path: "/profile/edit",
      name: "profile_edit",
      component: () => import("@/views/ProfileEdit.vue")
    },

    {
      meta: {
        requiresAuth: true
      },
      path: "/contactus",
      name: "contactus",
      component: () => import("@/views/ContactUs.vue")
    },
    {
      meta: {
        requiresAuth: true
      },
      path: "/messages",
      name: "messages",
      component: () => import("@/views/Messages.vue")
    }
  ]
});
