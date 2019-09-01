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
            itemsToShow: 2
          },
          1000: {
            itemsToShow: 4,
            pagination: "fraction"
          },
          1750: {
            itemsToShow: 4
          }
        }
      }
    };
  }
};
</script>