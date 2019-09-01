import VueAnalytics from "vue-analytics";

export function initVueAnalytics(Vue, router) {
  Vue.use(VueAnalytics, {
    id: "UA-146569212-1",
    router,
    autoTracking: {
      screenview: true
    }
  });
}
