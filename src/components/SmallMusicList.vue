<template>
  <div class="small-music">
    <div v-for="i in items" :key="i.id" :class="{ small_music_item_playing: isPlaying }">
      <div class="small-music-item uk-box-shadow-small">
        <div>
          <img
            @click="play(i)"
            alt="music-play"
            class="music-play"
            :src="isPlaying ? pauseImagePath : playImagePath"
          >
        </div>
        <div class="pb-2">
          <span>{{i.artist.name}}</span>
        </div>
        <div class="pb-2">
          <span class="color-primary-dark">{{i.title}}</span>
        </div>
        <div>
          <img class="music-image" :src="i.image" :alt="i.title">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  name: "components.small_music_list",
  data() {
    return {
      isPlaying: false,
      playImagePath: require("@/assets/panel/img/icon/circle-play.svg"),
      pauseImagePath: require("@/assets/panel/img/icon/circle-pause.svg")
    };
  },
  methods: {
    play(music) {
      this.isPlaying = !this.isPlaying;
      this.$emit("play", music);
    }
  }
};
</script>

<style>
</style>
