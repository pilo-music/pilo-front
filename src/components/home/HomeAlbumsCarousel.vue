<template>
  <div class="album-slider mb-2">
    <hooper :settings="hooperSettings">
      <slide v-for="i in items" :key="i.id">
        <AlbumItem :item="i" />
      </slide>
    </hooper>
  </div>
</template>

<script>
import AlbumItem from "@/components/AlbumItem";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
export default {
  props: ["items"],
  name: "components.home_albums_carousel",
  components: {
    AlbumItem,
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
            itemsToShow: 3
          },
          1000: {
            itemsToShow: 3,
            pagination: "fraction"
          }
        }
      }
    };
  }
};
</script>

<style lang="scss">
.album-slider {
  .hooper {
    height: 100%;
  }
  .hooper-slide {
    margin: 0 8px;
  }
}
</style>
