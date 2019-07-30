<template>
  <div>
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <div>
          <router-view :layout.sync="layout" />
          <vue-progress-bar></vue-progress-bar>
        </div>
      </transition>
    </component>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish();
  },
  created() {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      //  start the progress bar
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish();
    });
  },
  data() {
    return {
      layout: `div`
    };
  }
};
</script>
<style lang="scss">
@import "./assets/css/fontiran.css";
@import "./scss/app.scss";

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.7ms;
  transition-property: 100%, 0.1;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
