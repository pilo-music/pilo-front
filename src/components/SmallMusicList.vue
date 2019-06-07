<template>
  <div class="small-music">
    <div v-for="i in musics" :key="i.id" :class="{ small_music_item_playing: isPlaying }">
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
  name: "components.small_music_list",
  data() {
    return {
      isPlaying: false,
      playImagePath: require("@/assets/panel/img/icon/circle-play.svg"),
      pauseImagePath: require("@/assets/panel/img/icon/circle-pause.svg"),
      musics: [
        {
          id: 1,
          title: "دوستت دارم",
          artist: {
            name: "مهدی احمدوند"
          },
          image:
            "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg",
          link128: "https://dl.taksound.com/music/Donyam Shodi Raft_5cf7f801a17d6.mp3"
        },
        {
          id: 2,
          title: "دوستت دارم",
          artist: {
            name: "مهدی احمدوند"
          },
          image:
            "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg",
          link128: "https://dl.taksound.com/music/Donyam Shodi Raft_5cf7f801a17d6.mp3"
        },
        {
          id: 3,
          title: "دوستت دارم",
          artist: {
            name: "مهدی احمدوند"
          },
          image:
            "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg",
          link128: "https://dl.taksound.com/music/Donyam Shodi Raft_5cf7f801a17d6.mp3"
        }
      ]
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
