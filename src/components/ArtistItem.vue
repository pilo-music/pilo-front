<template>
  <div class="artist-box">
    <a href="#">
      <div class="position-relative">
        <img width="300" height="300" class="shadow" :src="artist.image" :alt="artist.name">
      </div>
    </a>
    <div class="mt-2 text-center">
      <a class="artist-title color-primary-dark" href="#">{{artist.name}}</a>
    </div>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import ArtistItem from "@/components/ArtistItem";
export default {
  props: ["artist"],
  name: "components.artist_item"
};
</script>

<style>
</style>
