<template>
  <div class="home-music-carousel">
    <hooper :settings="hooperSettings">
      <slide v-for="i in items" :key="i.id">
        <MusicItem :music="i" />
      </slide>
    </hooper>
  </div>
</template>

<script>
import MusicItem from "@/components/MusicItem";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
export default {
  props: ["items"],
  name: "components.home_musics_carousel",
  components: {
    MusicItem,
    Hooper,
    Slide
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 3,
        rtl: true,
        wheelControl: false,
        breakpoints: {
          800: {
            centerMode: false,
            itemsToShow: 4
          },
          1000: {
            itemsToShow: 6,
            pagination: "fraction"
          },
          1512: {
            itemsToShow: 7
          },
          1750: {
            itemsToShow: 8
          }
        }
      }
    };
  },
  computed: {
    ismobile() {
      if (isMobile) return true;
      else return false;
    }
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
