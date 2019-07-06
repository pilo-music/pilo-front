<template>
  <div class="album-slider mb-2">
    <carousel :responsive="carousel_respansive" :margin="16" :freeDrag="false" :dots="false">
      <BookmarkItem v-for="i in items" :key="i.id" :item="i" />
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import BookmarkItem from "@/components/BookmarkItem";
export default {
  props: ["items"],
  name: "components.browser_bookmark_carousel",
  components: {
    BookmarkItem,
    carousel
  },
  data() {
    return {
      carousel_respansive: {
        0: { items: 2, nav: false },
        576: { items: 2, nav: false },
        768: { items: 2, nav: false },
        992: { items: 3, nav: false },
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
