<template>
  <div>
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view :layout.sync="layout" />
      </transition>
    </component>
  </div>
</template>

<script>
export default {
  name: "app",
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
