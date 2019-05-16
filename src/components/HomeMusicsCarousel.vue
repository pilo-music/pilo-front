<template>
  <div>
    <carousel :responsive="carousel_respansive" :margin="16" :freeDrag="false" :dots="false">
      <MusicItem :music="music"/>
      <MusicItem :music="music"/>
      <MusicItem :music="music"/>
      <MusicItem :music="music"/>
      <MusicItem :music="music"/>
      <MusicItem :music="music"/>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import MusicItem from "@/components/MusicItem";
export default {
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
      },
      music: {
        id: "1",
        title: "test music",
        artist: {
          name: "test artist"
        },
        image:
          "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg",
        link128: "sasd"
      }
    };
  }
};
</script>

<style>
</style>
