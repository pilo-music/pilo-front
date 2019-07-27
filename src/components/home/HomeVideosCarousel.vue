<template>
  <div>
    <carousel :responsive="carousel_respansive" :margin="16" :freeDrag="false" :dots="true">
      <VideoItem v-for="i in items" :key="i.id" :video="i" />
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import VideoItem from "@/components/VideoItem";
export default {
  props: ["items"],
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
