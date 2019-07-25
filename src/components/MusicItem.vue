<template>
  <div class="item music-box">
    <div class="position-relative">
      <router-link :to="{ name: 'music', params: { slug: music.slug } }">
        <img class="img-fluid" :src="music.image" :alt="music.title" />
        <div class="type-box position-absolute">MP3</div>
      </router-link>
      <a class="play-music">
        <div @click="play(music)" class="music-play position-absolute">
          <img
            title="play"
            v-if="isPlaying == false && music.id != currentId"
            alt="play"
            src="@/assets/panel/img/icon/music-play-white.svg"
            class="text-white img-fluid"
          />
          <img
            title="puase"
            v-if="isPlaying == true && music.id == currentId"
            alt="puase"
            src="@/assets/panel/img/icon/music-pause-white.svg"
            class="text-white img-fluid"
          />
        </div>
      </a>
    </div>
    <div class="mt-2 text-center">
      <a
        class="music-title color-primary-dark d-block"
        :to="{ name: 'music', params: { slug: music.slug } }"
      >{{ music.title }}</a>
      <router-link
        class="music-artist d-block"
        :to="{ name: 'artist', params: { slug: music.artist.slug } }"
      >{{ music.artist.name }}</router-link>
    </div>
  </div>
</template>

<script>
import { getLocalSong } from "@/services/helpers/music.js";
export default {
  name: "components.music_item",
  props: ["music"],
  data() {
    return {
      currentId: null
    };
  },
  methods: {
    play(song = {}) {
      let currentSong = getLocalSong();
      this.currentId = currentSong.id;
      if (typeof song === "object") {
        if (this.settings.isLoaded) {
          //check if song exists in playlist
          if (currentSong.id === song.id && this.isPlaying) {
            this.$store.commit("SET_IS_PLAYING", false);
          } else if (currentSong.id === song.id && !this.isPlaying) {
            this.$store.commit("SET_IS_PLAYING", true);
          } else if (currentSong.id !== song.id) {
            if (!this.containsObjectWithSameId(song, this.playlist)) {
              this.$store.commit("SET_IS_PLAYING", false);
              this.addToPlaylist(song);
            }
            this.$store.dispatch("setCurrentMusic", song);
            this.settings.previousPlaylistIndex = this.settings.currentIndex;
            this.settings.currentIndex = 0;
            setTimeout(() => {
              this.$store.commit("SET_IS_PLAYING", true);
            }, 1000);
          }
        } else {
          this.$store.dispatch("setCurrentMusic", song);
          setTimeout(() => {
            this.$store.commit("SET_IS_PLAYING", true);
          }, 1000);
        }
        this.$store.commit("SET_IS_PLAYING", true);
      }
    },

    addToPlaylist(song) {
      var newPlaylist = this.playlist;
      newPlaylist.unshift(song);
      this.$store.commit("SET_CURRENT_PLAYLIST", newPlaylist);
    },
    containsObjectWithSameId(obj, list) {
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
          return true;
        }
      }
      return false;
    },
    getObjectIndexFromArray(obj, list) {
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
          return i;
        }
      }
    }
  },
  computed: {
    playlist() {
      return this.$store.getters.currentPlaylist;
    },
    isPlaying() {
      return this.$store.getters.isPlaying;
    },
    settings() {
      return this.$store.getters.currentSettings;
    },
    current() {
      return this.$store.getters.currentMusic;
    }
  },
  watch: {
    isPlaying: function(newValue) {
      if (newValue) this.currentId = this.current.id;
    }
  }
};
</script>
