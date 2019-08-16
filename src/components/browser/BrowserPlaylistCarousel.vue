<template>
  <div class="album-slider mb-2">
    <hooper :settings="hooperSettings">
      <slide v-for="(i,index) in items" :key="index">
        <playlist-item :item="i" />
      </slide>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
import PlaylistItem from "@/components/PlaylistItem";
export default {
  props: ["items"],
  name: "components.browser_playlist_carousel",
  components: {
    PlaylistItem,
    Hooper,
    Slide
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 2,
        rtl: true,
        wheelControl: false,
        breakpoints: {
          800: {
            centerMode: false,
            itemsToShow: 2
          },
          1000: {
            itemsToShow: 4,
            pagination: "fraction"
          },
          1750: {
            itemsToShow: 5
          }
        }
      }
    };
  }
};
</script>

<style>
.hooper {
  height: auto;
}
.hooper-slide {
  margin-right: 8px;
  margin-left: 8px;
}
</style>
