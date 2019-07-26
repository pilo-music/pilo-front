<template>
  <div class="album-slider mb-2">
    <hooper :itemsToShow="2" :rtl="true">
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
  }
};
</script>

<style lang="scss">
.album-slider {
  .hooper-slide {
    margin: 0 8px;
  }
}
</style>
