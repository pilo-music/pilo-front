import Vue from "vue";

import { initBootstrapVue } from "./plugins/bootstrap-vue";
import { initVuePlyr } from "./plugins/vue-plyr";
import { initVueHead } from "./plugins/vue-head";
import { initVueProgressBar } from "./plugins/vue-progressbar";
import { initVueAnalytics } from "./plugins/vue-analytics";

import App from "./App.vue";
import router from "./services/router/router";
import store from "./services/store/index";
import initialize from "./services/helpers/general";

import "./registerServiceWorker";

Vue.config.productionTip = false;
initialize(store, router);
// init plugins
initVueProgressBar(Vue);
initBootstrapVue(Vue);
initVueHead(Vue);
initVueAnalytics(Vue, router);
initVuePlyr(Vue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
