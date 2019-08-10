<template>
  <layout name="Panel">
    <component v-bind:is="currentComponent"></component>
  </layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import { isMobile } from "mobile-device-detect";
import Desktop from "@/pages/desktop/Video";
import Mobile from "@/pages/mobile/Video";

export default {
  components: {
    Layout,
    Desktop,
    Mobile
  },
  name: "views.video",
  head: {
    // To use "this" in the component, it is necessary to return the object through a function
    title: function() {
      return {
        inner: this.$route.params.slug
      };
    }
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
@import "../scss/video.scss";
</style>
