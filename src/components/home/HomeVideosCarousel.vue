<template>
  <div :class="currentClass">
    <hooper :settings="hooperSettings">
      <slide v-for="i in items" :key="i.id">
        <VideoItem :video="i" />
      </slide>

      <hooper-navigation slot="hooper-addons"></hooper-navigation>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
  </div>
</template>

<script>
import { isMobile } from "mobile-device-detect";
import VideoItem from "@/components/VideoItem";
import {
  Hooper,
  Slide,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from "hooper";
import "hooper/dist/hooper.css";
export default {
  props: ["items"],
  name: "components.home_videos_carousel",
  components: {
    VideoItem,
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        rtl: true,
        wheelControl: false,
        breakpoints: {
          800: {
            centerMode: false,
            itemsToShow: 2
          },
          1000: {
            itemsToShow: 2,
            pagination: "fraction"
          },
          1750: {
            itemsToShow: 3
          }
        }
      }
    };
  },
  computed: {
    currentClass() {
      if (isMobile) return "video-carousel-mobile";
      else return "video-carousel";
    }
  }
};
</script>