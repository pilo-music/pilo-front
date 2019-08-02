<template>
  <layout name="Default">
    <component v-bind:is="currentComponent"></component>
  </layout>
</template>

<script>
import { isMobile } from "mobile-device-detect";
import Desktop from "@/pages/desktop/Home";
import Mobile from "@/pages/mobile/Home";
import Layout from "@/layouts/Layout";

export default {
  name: "views.home",
  components: {
    Layout
  },
  computed: {
    currentComponent() {
      if (isMobile) return Mobile;
      else return Desktop;
    }
  }
};
</script>

<style lang="scss">
@import "../scss/home.scss";
</style>
