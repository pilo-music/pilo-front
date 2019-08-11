<template>
  <layout name="Default">
    <component v-bind:is="currentComponent"></component>
  </layout>
</template>

<script>
import { isMobile } from "mobile-device-detect";
import Desktop from "@/pages/desktop/Artist";
import Mobile from "@/pages/mobile/Artist";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout,
    Desktop,
    Mobile
  },
  name: "views.artist",
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
@import "../scss/artist.scss";
</style>
