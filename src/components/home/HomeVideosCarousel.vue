<template>
  <div>
    <hooper :settings="hooperSettings">
      <slide v-for="i in items" :key="i.id">
        <VideoItem :video="i" />
      </slide>
    </hooper>
  </div>
</template>

<script>
import VideoItem from "@/components/VideoItem";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
export default {
  props: ["items"],
  name: "components.home_videos_carousel",
  components: {
    VideoItem,
    Hooper,
    Slide
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
            itemsToShow: 2
          }
        }
      }
    };
  }
};
</script>

<style>
