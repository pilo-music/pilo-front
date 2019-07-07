<template>
  <div class="small-music">
    <div v-for="i in items" :key="i.id" :class="getClass(i.id)">
      <div class="small-music-item uk-box-shadow-small">
        <div>
          <img @click="play(i)" alt="music-play" class="music-play" :src="getStatus(i.id)" />
        </div>
        <div class="pb-2">
          <span>{{i.artist.name}}</span>
        </div>
        <div class="pb-2">
          <span class="color-primary-dark">{{i.title}}</span>
        </div>
        <div>
          <img class="music-image" :src="i.image" :alt="i.title" />
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
      playImagePath: require("@/assets/panel/img/icon/circle-play.svg"),
      pauseImagePath: require("@/assets/panel/img/icon/circle-pause.svg")
    };
  },
  methods: {
    play(music) {
      this.$emit("play", music);
      this.getStatus(music.id);
      this.getClass(music.id);
    },
    getClass(id) {
      if (this.isPlaying && id == this.currentSong.id)
        return "small_music_item_playing";
    },
    getStatus(id) {
      // console.log("current :" + id, "song :" + this.currentSong.id);

      if (this.isPlaying && id == this.currentSong.id)
        return this.pauseImagePath;
      else return this.playImagePath;
    }
  },
  computed: {
    currentSong() {
      return this.$store.getters.currentMusic == null
        ? {}
        : this.$store.getters.currentMusic;
    },
    isPlaying() {
      return this.$store.getters.isPlaying;
    }
  }
};
</script>

<style>
</style>
