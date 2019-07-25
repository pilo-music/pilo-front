<template>
  <div class="home-music-carousel">
    <carousel
      :responsive="carousel_respansive"
      :margin="16"
      :freeDrag="false"
      :dots="false"
    >
      <MusicItem v-for="i in items" :key="i.id" :music="i" />
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import MusicItem from "@/components/MusicItem";
import { setTimeout } from "timers";
export default {
  props: ["items"],
  name: "components.home_musics_carousel",
  components: {
    MusicItem,
    carousel
  },
  data() {
    return {
      carousel_respansive: {
        0: { items: 2, nav: false },
        576: { items: 2, nav: false },
        768: { items: 4, nav: false },
        992: { items: 6, nav: false },
        1200: { items: 8, nav: false }
      }
    };
  }
};
</script>

<style>
.owl-item{
  min-width: 130px;
}
</style>
