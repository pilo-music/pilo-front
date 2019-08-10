<template>
  <layout name="Default">
    <component v-bind:is="currentComponent"></component>
  </layout>
</template>

<script>
import { isMobile } from "mobile-device-detect";
import Desktop from "@/pages/desktop/Album";
import Mobile from "@/pages/mobile/Album";
import Layout from "@/layouts/Layout";
export default {
  components: {
    Layout
  },
  head: {
    title: function() {
      return {
        inner: this.$route.params.slug
      };
    }
  },
  name: "views.album",
  computed: {
    currentComponent() {
      if (isMobile) return Mobile;
      else return Desktop;
    }
  }
};
</script>

<style lang="scss">
@import "../scss/album.scss";
.single-album-box {
  .margin {
    margin-bottom: 60px;
  }
}
</style>
