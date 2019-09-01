import VueProgressBar from "vue-progressbar";

export function initVueProgressBar(Vue) {
  const options = {
    color: "#bffaf3",
    failedColor: "#358595",
    thickness: "5px",
    transition: {
      speed: "0.2s",
      opacity: "0.6s",
      termination: 300
    },
    autoRevert: true,
    location: "top",
    inverse: false
  };

  Vue.use(VueProgressBar, options);
}
