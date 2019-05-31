<template>
  <div :class="{ small_music_item_playing: isPlaying }">
    <div class="small-music-item uk-box-shadow-small">
      <div>
        <img
          @click="isPlaying = !isPlaying"
          alt="music-play"
          class="music-play"
          :src="isPlaying ? pauseImagePath : playImagePath"
        >
      </div>
      <div class="pb-2">
        <span>{{item.artist.name}}</span>
      </div>
      <div class="pb-2">
        <span class="color-primary-dark">{{item.title}}</span>
      </div>
      <div>
        <img class="music-image" :src="item.image" :alt="item.title">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "components.small_music_item",
  props: ["item"],
  data() {
    return {
      isPlaying: false,
      playImagePath: require("@/assets/panel/img/icon/circle-play.svg"),
      pauseImagePath: require("@/assets/panel/img/icon/circle-pause.svg")
    };
  }
};
</script>

<style>
</style>
