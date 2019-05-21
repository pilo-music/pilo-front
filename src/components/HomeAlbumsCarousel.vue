<template>
  <div>
    <carousel  :responsive="carousel_respansive" :margin="16" :freeDrag="false" :dots="false">
      <AlbumItem :album="album"/>
      <AlbumItem :album="album"/>
      <AlbumItem :album="album"/>
      <AlbumItem :album="album"/>
      <AlbumItem :album="album"/>
      <AlbumItem :album="album"/>
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
      album: {
        id: "1",
        title: "test music",
        artist: {
          name: "test artist"
        },
        image:
          "https://assets.rj-a2.com/static/content_items/images/2019/05/20/957a605d7a92135.jpg",
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
