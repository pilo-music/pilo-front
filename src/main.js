import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";

import "./plugins/bootstrap-vue";
import "./plugins/vue-plyr";
import "./plugins/vue-head";
import "./plugins/vue-progressbar";
import "./plugins/vue-analytics";

import App from "./App.vue";
import router from "./services/router/router";
import store from "./services/store/index";
import initialize from "./services/helpers/general";

import "./registerServiceWorker";

Vue.config.productionTip = true;
initialize(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
