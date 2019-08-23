<template>
  <div>
    <div class="music-player-desktop d-none d-sm-none d-md-flex d-lg-flex" v-if="settings">
      <div class="options">
        <like :post_id="currentSong.id" post_type="music" :has_like="currentSong.has_like" />
      </div>
      <div class="volume">
        <img src="@/assets/panel/img/icon/sound.svg" alt="volume" />
        <div>
          <div class="progress-container">
            <div class="progress">
              <div class="progress-handle" :style="{ left: settings.progressPercentageValue }"></div>
              <div class="transparent-seeker-layer" @click="seek"></div>
              <div class="bar" :style="{ width: settings.progressPercentageValue }"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="progress-div">
        <div class="progress-container">
          <div class="progress">
            <div class="progress-handle" :style="{ left: settings.progressPercentageValue }"></div>
            <div class="transparent-seeker-layer" @click="seek"></div>
            <div class="bar" :style="{ width: settings.progressPercentageValue }"></div>
          </div>
        </div>
        <div class="progress-time">
          <span>{{ currentPlayedTime }}</span>
          <span>{{ duration }}</span>
        </div>
      </div>
      <div class="controls">
        <div>
          <img
            @click="skip('backward')"
            src="@/assets/panel/img/icon/fast-forward-left.svg"
            alt="prev"
          />
        </div>
        <div>
          <img
            v-if="!isPlaying"
            @click="playCurrentSong"
            alt="play"
            class="play"
            src="@/assets/panel/img/icon/main-play.svg"
          />
          <img
            class="play"
            @click="pause"
            v-else
            src="@/assets/panel/img/icon/main-pause.svg"
            alt="pause"
          />
        </div>
        <div>
          <img
            @click="skip('forward')"
            src="@/assets/panel/img/icon/fast-forward-right.svg"
            alt="next"
          />
        </div>
      </div>
      <div class="music-info" @click="go">
        <div>
          <p class="music-artist">{{ currentSong.artist.name }}</p>
          <p class="music-title">{{ currentSong.title }}</p>
        </div>
        <div>
          <img class="music-image" :src="currentSong.image" :alt="currentSong.title" />
        </div>
      </div>
    </div>
    <div v-if="settings">
      <div class="container-fluid d-block d-sm-block d-md-none d-lg-none">
        <div class="w-100 small-music-player">
          <div class="row">
            <div class="col-5">
              <img
                @click="skip('backward')"
                width="25"
                height="25"
                src="@/assets/panel/img/icon/fast-forward-left.svg"
                alt="fast-forward-black"
              />
              <img
                @click="pause"
                v-show="isPlaying"
                width="70"
                height="70"
                src="@/assets/panel/img/icon/main-pause.svg"
                alt="pause"
                class="play"
              />
              <img
                @click="playCurrentSong"
                width="70"
                height="70"
                v-show="!isPlaying"
                src="@/assets/panel/img/icon/main-play.svg"
                alt="play"
                class="play"
              />
              <img
                @click="skip('forward')"
                width="25"
                height="25"
                src="@/assets/panel/img/icon/fast-forward-right.svg"
                alt="fast-forward-black"
              />
            </div>
            <div class="col-7" @click="go">
              <div>
                <span class="title">{{ currentSong.title }}</span>
                <span class="name">{{ currentSong.artist.name }}</span>
              </div>
              <img :src="currentSong.image" alt width="60" height="60" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Audio -->
    <audio :loop="settings.innerLoop" ref="audiofile" preload class="d-none" controls></audio>
  </div>
</template>

<script>
import Like from "@/components/Like.vue";
import { getLocalSong } from "@/services/helpers/music.js";
import Bookmark from "@/components/Bookmark.vue";
import { isMobile } from "mobile-device-detect";

export default {
  components: {
    Like,
    Bookmark
  },
  name: "components.music_player",
  data() {
    return {
      settings: {},
      currentSong: {},
      isLoading: false,
      orginal_playlist: []
    };
  },
  created() {
    let current = getLocalSong();
    this.settings = this.currentSettings;
    this.settings.innerLoop = this.settings.loop.state;
    this.currentSong = current;
  },
  mounted() {
    if (this.currentSong) {
      this.audioPlayer = this.$el.querySelectorAll("audio")[0];
      this.initPlayer();
    }
  },

  methods: {
    /**Music player methods
     * these methods are used to control the music player*/
    initPlayer() {
      this.audioPlayer.src = this.currentSong.url;
      this.audioPlayer.addEventListener("timeupdate", this.updateTimer);
      this.audioPlayer.addEventListener("loadeddata", this.load);
      this.audioPlayer.addEventListener("pause", () => {
        this.$store.commit("SET_IS_PLAYING", false);
      });
      this.audioPlayer.addEventListener("play", () => {
        this.$store.commit("SET_IS_PLAYING", true);
      });

      this.audioPlayer.addEventListener("ended", this.playNextSongInPlaylist);
    },

    play(song = {}) {
      if (typeof song === "object") {
        if (this.settings.isLoaded) {
          //check if song exists in playlist
          if (this.currentSong.id === song.id && this.isPlaying) {
            this.pause();
          } else if (this.currentSong.id === song.id && !this.isPlaying) {
            this.playCurrentSong();
          } else if (this.currentSong.id !== song.id) {
            if (!this.containsObjectWithSameId(song, this.playlist)) {
              this.addToPlaylist(song);
            } else {
              this.setCurrentSong(song);
              this.playCurrentSong();
            }

            this.setCurrentSong(song);
            this.settings.currentIndex = this.getObjectIndexFromArray(
              song,
              this.playlist
            );
            this.settings.previousPlaylistIndex = this.settings.currentIndex;
            this.playCurrentSong();
          }
        } else {
          this.setCurrentSong(song);
          this.pause();
          setTimeout(() => {
            this.playCurrentSong();
          }, 1000);
        }
        this.$store.commit("SET_IS_PLAYING", true);
      }
    },

    playCurrentSong() {
      let current = getLocalSong();
      if (current != null && this.currentSong.url !== current.url) {
        this.currentSong = current;
        this.audioPlayer.src = this.currentSong.url;
        setTimeout(() => {
          this.audioPlayer.play();
          this.$store.commit("SET_IS_PLAYING", true);
        }, 1000);
      } else {
        if (!this.isPlaying) {
          this.audioPlayer.play();
          this.$store.commit("SET_IS_PLAYING", true);
        } else {
          this.pause();
          this.$store.commit("SET_IS_PLAYING", false);
        }
      }
    },

    stop() {
      this.audioPlayer.currentTime = 0;
    },

    pause() {
      this.audioPlayer.pause();
      this.$store.commit("SET_IS_PLAYING", false);
    },

    skip(direction) {
      if (direction === "forward") {
        this.settings.currentIndex++;
      } else if (direction === "backward") {
        this.settings.currentIndex--;
      }

      if (this.settings.currentIndex >= this.playlist.length) {
        this.settings.currentIndex = 0;
      }

      if (this.settings.currentIndex < 0) {
        this.settings.currentIndex = this.playlist.length - 1;
      }

      if (this.playlist[this.settings.currentIndex] != null)
        this.setCurrentSong(this.playlist[this.settings.currentIndex]);

      //the code below checks if a song is playing so it can go ahead and auto play
      if (this.isPlaying) {
        this.pause();
        setTimeout(() => {
          this.playCurrentSong();
        }, 500);
      } else {
        this.playCurrentSong();
      }
    },

    updateTimer() {
      this.settings.currentSeconds = parseInt(this.audioPlayer.currentTime);
      this.settings.progressPercentageValue =
        ((this.settings.currentSeconds / parseInt(this.audioPlayer.duration)) *
          100 || 0) + "%";
    },

    seek(e) {
      if (this.settings.isLoaded) {
        let el = e.target.getBoundingClientRect();
        let seekPos = (e.clientX - el.left) / el.width;
        let seekPosPercentage = seekPos * 100 + "%";

        /**
         *  calculating the portion of the song based on where the user clicked
         *
         */

        let songPlayTimeAfterSeek = parseInt(
          this.audioPlayer.duration * seekPos
        );

        this.audioPlayer.currentTime = songPlayTimeAfterSeek;

        this.settings.progressPercentageValue = seekPosPercentage;
      } else {
        throw new Error("Song Not Loaded");
      }
    },

    addToPlaylist(song) {
      let newPlaylist = this.playlist;
      newPlaylist = newPlaylist.unshift(song);
      this.$store.commit("SET_CURRENT_PLAYLIST", newPlaylist);
    },

    dragSeek(e) {
      let el = e.target.getBoundingClientRect();
    },

    playNextSongInPlaylist() {
      if (this.settings.onRepeat && this.settings.loop.value === 1) {
        this.playCurrentSong();
      } else {
        this.settings.currentIndex++;

        if (this.settings.currentIndex >= this.playlist.length) {
          this.settings.currentIndex = 0;
        }
        if (this.settings.currentIndex < 0) {
          this.settings.currentIndex = this.playlist.length - 1;
        }

        if (this.playlist[this.settings.currentIndex] != null)
          this.setCurrentSong(this.playlist[this.settings.currentIndex]);

        console.log(this.currentSong);
        setTimeout(() => {
          this.playCurrentSong();
        }, 1000);
      }
    },
    /** Helper methods
     * these methods are usually used within other methods*/

    formatTime(secs) {
      let minutes = Math.floor(secs / 60) || 0;
      let seconds = Math.floor(secs - minutes * 60) || 0;
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },

    setAudio(song) {
      this.audioPlayer.src = song;
    },

    load() {
      if (this.audioPlayer.readyState >= 2) {
        this.settings.isLoaded = true;
        this.settings.durationSeconds = parseInt(this.audioPlayer.duration);
      } else {
        throw new Error("Failed to load sound file.");
      }
    },

    containsObjectWithSameId(obj, list) {
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
          return true;
        }
      }
    },
    setCurrentSong(song) {
      this.currentSong = song;
      this.settings.previousPlaylistIndex = this.settings.currentIndex;
    },
    go() {
      this.$router.push({
        name: "music",
        params: {
          slug: this.currentSong.slug
        }
      });
    }
  },
  computed: {
    currentPlayedTime() {
      return this.formatTime(this.settings.currentSeconds);
    },
    duration() {
      return this.formatTime(this.settings.durationSeconds);
    },
    progressPercentage() {
      return parseInt(
        (this.settings.currentSeconds / this.settings.durationSeconds) * 100
      );
    },
    isPlaying() {
      return this.$store.getters.isPlaying;
    },
    currentSettings() {
      return this.$store.getters.currentSettings;
    },
    playlist() {
      return this.$store.getters.currentPlaylist;
    }
  },
  watch: {
    currentSong: function(newValue) {
      if (newValue != null) this.$store.dispatch("setCurrentMusic", newValue);
    },
    settings: function(newValue) {
      this.$store.dispatch("setCurrentSetting", newValue);
    },
    isPlaying: function(newValue) {
      if (newValue == true) {
        let current = getLocalSong();
        if (current.url != this.currentSong.url) this.playCurrentSong();
        else this.audioPlayer.play();
      } else {
        this.pause();
      }
    }
  }
};
</script>

<style></style>
