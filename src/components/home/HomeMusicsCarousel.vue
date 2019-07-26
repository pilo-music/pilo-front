<template>
  <div class="home-music-carousel">
    <hooper :itemsToShow="2.5" :rtl="true">
      <slide v-for="i in items" :key="i.id">
        <MusicItem :music="i" />
      </slide>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
import MusicItem from "@/components/MusicItem";
import { setTimeout } from "timers";
export default {
  props: ["items"],
  name: "components.home_musics_carousel",
  components: {
    MusicItem,
    Hooper,
    Slide
  }
};
</script>

<style lang="scss">
.home-music-carousel {
  .hooper-slide {
    margin: 0 8px;
  }
}
</style>
