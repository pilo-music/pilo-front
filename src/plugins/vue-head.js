import VueHead from "vue-head";

export function initVueHead(Vue) {
  Vue.use(VueHead, {
    separator: "-",
    complement: "pilo"
  });
}
