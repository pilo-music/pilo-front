<template>
  <layout name="Panel">
    <component v-bind:is="currentComponent"></component>
  </layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import { isMobile } from "mobile-device-detect";
import Mobile from "@/pages/mobile/Music";
import Desktop from "@/pages/desktop/Music";

export default {
  components: {
    Layout
  },
  name: "views.music",
  head: {
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
@import "../scss/music.scss";
</style>
