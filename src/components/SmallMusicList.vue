<template>
  <div class="small-music">
    <div v-for="(i,index) in items" :key="index">
      <!-- <div :class="getClass(i)"> -->
      <div class="small-music-item">
        <div>
          <!-- <img
            @click="play(i)"
            alt="music-play"
            class="music-play"
            v-if="isPlaying == true && i.id == currentId"
            src="@/assets/panel/img/icon/circle-pause.svg"
          />-->
          <img
            @click="play(i)"
            alt="music-play"
            class="music-play"
            src="@/assets/panel/img/icon/circle-play.svg"
          />
        </div>
        <div class="pb-2">
          <span>{{ i.artist.name }}</span>
        </div>
        <div class="pb-2">
          <span class="color-primary-dark">{{ i.title }}</span>
        </div>
        <div>
          <img class="music-image" :src="i.image" :alt="i.title" />
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import { getLocalSong } from "@/services/helpers/music.js";
export default {
  props: ["items"],
  name: "components.small_music_list",
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
    },
    getClass(music) {
      if (this.isPlaying == true && music.id == this.currentId)
        return "small_music_item_playing";
      else return "small-music-item";
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
      this.currentId = this.current.id;
    }
  }
};
</script>
