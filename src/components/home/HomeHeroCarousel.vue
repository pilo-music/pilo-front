<template>
  <div style="margin:-15px;" class="d-block d-sm-block d-md-non d-lg-none">
    <carousel
      :autoPlay="true"
      :center="true"
      :responsive="carousel_respansive"
      :freeDrag="false"
      :dots="true"
    >
      <HeroItem :item="item" />
      <HeroItem :item="item" />
      <HeroItem :item="item" />
      <HeroItem :item="item" />
      <HeroItem :item="item" />
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import HeroItem from "@/components/HeroItem";
export default {
  name: "components.home_hero_carousel",
  components: {
    HeroItem,
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
      },
      item: {
        id: "1",
        title: "test music",
        artist: {
          name: "test artist"
        },
        image:
          "https://assets.rj-a2.com/static/content_items/images/2019/05/20/957a605d7a92135.jpg",
        link128: "sasd"
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
