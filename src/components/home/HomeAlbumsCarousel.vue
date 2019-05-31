<template>
  <div>
    <carousel :responsive="carousel_respansive" :margin="16" :freeDrag="false" :dots="false">
      <AlbumItem :item="item"/>
      <AlbumItem :item="item"/>
      <AlbumItem :item="item"/>
      <AlbumItem :item="item"/>
      <AlbumItem :item="item"/>
      <AlbumItem :item="item"/>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import AlbumItem from "@/components/AlbumItem";
export default {
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
      },
      item: {
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
.owl-stage-outer {
  width: 100%;
}
</style>
