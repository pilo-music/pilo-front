<template>
  <div class="artist-box">
    <router-link :to="{ name: 'artist', params: { slug: artist.slug } }">
      <div class="position-relative">
        <b-img-lazy
          blank-color="#f6f7f8"
          v-if="artist.image != '' && artist.image != null && artist.image != '.'"
          class="shadow img-fluid"
          :src="artist.image"
          :alt="artist.name"
        />
        <img v-else class="shadow img-fluid" src="@/assets/panel/img/user.svg" alt="artist.name" />
      </div>
    </router-link>
    <div class="mt-2 text-center">
      <a class="artist-title color-primary-dark" href="#">{{ artist.name }}</a>
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
