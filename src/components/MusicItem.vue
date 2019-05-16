<template>
  <div>
    <div class="item music-box">
      <a href="#">
        <div class="position-relative">
          <img width="300" height="300" :src="music.image" :alt="music.title">
          <div class="type-box position-absolute">MP3</div>
          <a class="play-music">
            <div class="music-play position-absolute">
              <i class="icon ion-md-play text-white"></i>
            </div>
          </a>
        </div>
      </a>
      <div class="mt-2 text-center">
        <a class="music-title d-block" href="#">{{music.title}}</a>
        <a class="music-artist d-block" href="#">{{music.artist.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "components.music_item",
  props: ["music"]
};
</script>

<style>
</style>
