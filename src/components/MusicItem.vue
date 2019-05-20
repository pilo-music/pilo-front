<template>
  <div>
    <div class="item music-box">
      <router-link :to="{name:'music',params:{slug:'sd'}}">
        <div class="position-relative">
          <img width="300" height="300" :src="music.image" :alt="music.title">
          <div class="type-box position-absolute">MP3</div>
          <a class="play-music">
            <div class="music-play position-absolute">
              <i class="icon ion-md-play text-white"></i>
            </div>
          </a>
        </div>
      </router-link>
      <div class="mt-2 text-center">
        <a class="music-title d-block" :to="{name:'music',params:{slug:'sd'}}">{{music.title}}</a>
        <router-link
          class="music-artist d-block"
          :to="{name:'artist',params:{slug:'sd'}}"
        >{{music.artist.name}}</router-link>
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
