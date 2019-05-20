<template>
  <div>
    <carousel  :responsive="carousel_respansive" :margin="16" :freeDrag="false" :dots="true">
      <VideoItem :video="video"/>
      <VideoItem :video="video"/>
      <VideoItem :video="video"/>
      <VideoItem :video="video"/>
      <VideoItem :video="video"/>
      <VideoItem :video="video"/>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import VideoItem from "@/components/VideoItem";
export default {
  name: "components.home_videos_carousel",
  components: {
    VideoItem,
    carousel
  },
  data() {
    return {
      carousel_respansive: {
        0: { items: 1, nav: false },
        576: { items: 1, nav: false },
        768: { items: 2, nav: false },
        992: { items: 2, nav: false },
        1200: { items: 3, nav: false }
      },
      video: {
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
