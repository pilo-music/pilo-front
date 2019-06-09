<template>
  <div>
    <carousel :responsive="carousel_respansive" :margin="16" :freeDrag="false" :dots="false">
      <ArtistItem v-for="i in items" :key="i.id" :artist="i"/>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import ArtistItem from "@/components/ArtistItem";
export default {
  name: "components.home_artists_carousel",
  props: ["items"],
  components: {
    ArtistItem,
    carousel
  },
  data() {
    return {
      carousel_respansive: {
        0: { items: 3, nav: false },
        576: { items: 3, nav: false },
        768: { items: 4, nav: false },
        992: { items: 6, nav: false },
        1200: { items: 8, nav: false }
      },
      artist: {
        name: "test",
        image:
          "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg"
      }
    };
  }
};
</script>

<style>
</style>
