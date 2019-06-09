<template>
  <div class="album-slider mb-2">
    <carousel :responsive="carousel_respansive" :margin="16" :freeDrag="false" :dots="false">
      <AlbumItem v-for="i in items" :key="i.id" :item="i"/>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import AlbumItem from "@/components/AlbumItem";
export default {
  props: ["items"],
  name: "components.home_albums_carousel",
  components: {
    AlbumItem,
    carousel
  },
  data() {
    return {
      carousel_respansive: {
        0: { items: 2, nav: false },
        576: { items: 2, nav: false },
        768: { items: 2, nav: false },
        992: { items: 3, nav: false },
        1200: { items: 3, nav: false }
      }
    };
  }
};
</script>

<style>
.owl-stage-outer {
  width: 100%;
}
</style>
