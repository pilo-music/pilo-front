import Vue from "vue";
import VueAnalytics from "vue-analytics";
import router from "@/services/router/router";

Vue.use(VueAnalytics, {
  id: "UA-146569212-1",
  router,
  autoTracking: {
    screenview: true
  }
});
