import axios from "axios";

function initialize(store, router) {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = store.state.currentUser;
    if (requiresAuth && !currentUser) {
      next("/login");
    } else if (to.path == "/login" && currentUser) {
      next("/");
    } else {
      next();
    }
  });

  axios.interceptors.response.use(null, error => {
    if (error.response.status == 401) {
      store.dispatch("logout");
      router.push({
        name: "login"
      });
      // store.dispatch("refresh", store.state.currentUser.access_token, router);
    }
    return Promise.reject(error);
  });
}
export default initialize;
