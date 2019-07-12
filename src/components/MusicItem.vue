<template>
  <div class="item music-box">
    <div class="position-relative">
      <router-link :to="{name:'music',params:{slug:music.slug}}">
        <img class="img-fluid" :src="music.image" :alt="music.title" />
        <div class="type-box position-absolute">MP3</div>
      </router-link>
      <a class="play-music">
        <div @click="play(music)" class="music-play position-absolute">
          <img
            title="play"
            alt="play"
            src="@/assets/panel/img/icon/music-play-white.svg"
            class="text-white img-fluid"
          />
        </div>
      </a>
    </div>
    <div class="mt-2 text-center">
      <a
        class="music-title color-primary-dark d-block"
        :to="{name:'music',params:{slug:music.slug}}"
      >{{music.title}}</a>
      <router-link
        class="music-artist d-block"
        :to="{name:'artist',params:{slug:music.artist.slug}}"
      >{{music.artist.name}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "components.music_item",
  props: ["music"],
  methods: {
    // play(music) {
    //   this.$store.dispatch("setCurrentSong", muisc);
    // }
    play(song = {}) {
      if (typeof song === "object") {
        //     //check if song exists in playlist
        if (this.currentSong.id === song.id && this.isPlaying) {
          this.$store.commit("SET_IS_PLAYING", false);
        } else if (this.currentSong.id === song.id && !this.isPlaying) {
          this.$store.commit("SET_IS_PLAYING", true);
        } else if (this.currentSong.id !== song.id) {
          if (!this.containsObjectWithSameId(song, this.playlist)) {
            this.addToPlaylist(song);
            this.setCurrentSong(song);
          } else {
            this.setCurrentSong(song);
          }
          // this.settings.setCurrentIndex =
          //   this.getObjectIndexFromArray(song, this.playlist)
          // ;
          // this.$store.dispatch("setCurrentSetting", this.settings.currentIndex);
          this.$store.commit("SET_IS_PLAYING", true);
        }
      } else {
        throw new Error("Type Error : Song must be an object");
      }
    },
    addToPlaylist(song) {
      var newPlaylist = this.playlist;
      if (newPlaylist.length > 0) newPlaylist = newPlaylist.unshift(song);
      else newPlaylist = [song];
      this.$store.commit("SET_CURRENT_PLAYLIST", newPlaylist);
    },
    setCurrentSong(song) {
      this.$store.dispatch("setCurrentMusic", song);
      console.log(this.currentSong.title);
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
    currentSong() {
      return this.$store.getters.currentMusic;
    }
  }
};
</script>

<style>
</style>
