<template>
  <layout name="Panel">
    <div class="container-fluid">
      <div class="single-music-box" v-if="!isLoading">
        <!-- header -->
        <b-navbar :sticky="true">
          <div class="music-header">
            <div>
              <img
                @click="$router.go(-1)"
                src="@/assets/panel/img/icon/left-arrow.svg"
                alt="back-to-prev-page"
              />
            </div>
            <div>
              <span>{{currentSong.title}}</span>
            </div>
            <div class="header-drop-down">
              <img
                src="@/assets/panel/img/icon/ellipsis.svg"
                alt="back-to-prev-page"
                @click="showCustomModal = !showCustomModal"
              />
            </div>
          </div>
        </b-navbar>
        <div class="padding-t">
          <!-- music image -->
          <div class="music-image">
            <img :src="currentSong.image" :alt="currentSong.title" />
          </div>
          <!-- music info -->
          <div class="music-info">
            <p>{{ currentSong.title}}</p>
            <span>{{currentSong.artist.name}}</span>
          </div>

          <!-- progress bar -->
          <div class="row music-progress-bar mt-3">
            <div class="position-relative">
              <img
                @click="repeat"
                :src="settings.loop.state == false ? settings.repeat_off : settings.repeat_on"
                alt="share"
              />
              <div class="repeat-info" v-if="settings.onRepeat">{{settings.loop.value}}</div>
            </div>
            <div class="flex-grow-1">
              <div class="progress-container">
                <div class="progress" id="progress-wrap">
                  <div class="progress-handle" :style="{left:settings.progressPercentageValue}"></div>

                  <div class="transparent-seeker-layer" @click="seek"></div>

                  <div class="bar" :style="{width:settings.progressPercentageValue}"></div>
                </div>
              </div>
              <div class="row music-time">
                <div class="col-6">
                  <span>{{currentPlayedTime}}</span>
                </div>
                <div class="col-6 text-right">
                  <span>{{duration}}</span>
                </div>
              </div>
            </div>
            <div>
              <a :href="currentSong.url">
                <img class="float-right" src="@/assets/panel/img/icon/download.svg" alt="download" />
              </a>
            </div>
          </div>
          <!-- Controls -->
          <div class="music-controls mt-3">
            <div>
              <img
                class="shuffle"
                @click="shuffleToggle"
                :src="settings.shuffle ? settings.shuffleOn : settings.shuffleOff"
                alt="shuffle"
              />
            </div>
            <div class="prev">
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
            <div class="next">
              <img
                @click="skip('forward')"
                src="@/assets/panel/img/icon/fast-forward-right.svg"
                alt="next"
              />
            </div>
            <like :post_id="currentSong.id" post_type="music" :has_like="currentSong.has_like" />
          </div>
          <hr />
        </div>
      </div>
      <!-- play list -->
      <div>
        <div class="row">
          <div class="section-title col-12 pr-4">
            <h2 class="text-right">پلی لیست شما</h2>
          </div>
        </div>
        <playlist class="p-0" :items="playlist" v-on:play="play($event)" />
      </div>
      <!-- Related Music -->
      <div v-if="!isLoading">
        <div class="row">
          <div class="section-title col-12 pr-4">
            <h2 class="text-right">موزیک های مرتبط</h2>
          </div>
        </div>
        <home-musics-carousel :items="related" />
      </div>
      <!-- Audio -->
      <audio
        :loop="settings.innerLoop"
        ref="audiofile"
        :src="currentSong.url"
        preload
        class="d-none"
        controls
      ></audio>
      <!-- Custom Modal for create Playlist -->
      <custom-modal :show="showCreatePlaylistModal" v-on:close="showCreatePlaylistModal = false">
        <add-to-playlist :post_id="currentSong.id" v-on:close="showCreatePlaylistModal = false" />
      </custom-modal>

      <!-- Custom Modal -->
      <custom-modal :show="showCustomModal" v-on:close="showCustomModal = false">
        <div class="modal-body" v-if="!isLoading">
          <div class="menu-item">
            <router-link
              :to="{name:'artist',params:{
                     slug:currentSong.artist.slug
                   }}"
            >
              صفحه خواننده
              <img src="@/assets/panel/img/icon/profile.svg" alt="profile" />
            </router-link>
          </div>
          <div class="menu-item">
            بوک مارک
            <Bookmark
              :post_id="this.currentSong.id"
              post_type="music"
              :has_bookmark="this.currentSong.has_bookmark"
            />
          </div>

          <div class="menu-item" @click="openCreatePlaylist">
            اضافه کردن به پلی لیست
            <img src="@/assets/panel/img/icon/plus.svg" alt="plus" />
          </div>
          <div @click="shareLink" class="menu-item">
            اشتراک گذاری
            <img src="@/assets/panel/img/icon/share.svg" alt="plus" />
          </div>
        </div>
      </custom-modal>
    </div>
  </layout>
</template>

<script>
import Playlist from "@/components/SmallMusicList.vue";
import Like from "@/components/Like.vue";
import Bookmark from "@/components/Bookmark.vue";
import { single } from "@/services/api/music_api.js";
import CustomModal from "@/components/CustomModal";
import AddToPlaylist from "@/components/AddToPlaylist";
import Layout from "@/layouts/Layout";
import HomeMusicsCarousel from "@/components/home/HomeMusicsCarousel";
import { getLocalSong } from "@/services/helpers/music.js";

export default {
  components: {
    Playlist,
    Like,
    CustomModal,
    Bookmark,
    AddToPlaylist,
    Layout,
    HomeMusicsCarousel
  },
  name: "views.music",
  data() {
    return {
      isLoading: true,
      settings: {},
      orginal_playlist: [],
      currentSong: {},
      related: [],
      showCustomModal: false,
      showCreatePlaylistModal: false
    };
  },
  created() {
    this.settings = this.currentSettings;
    this.settings.innerLoop = this.settings.loop.state;
  },

  mounted() {
    this.audioPlayer = this.$el.querySelectorAll("audio")[0];
    single(this.$route.params.slug)
      .then(response => {
        this.isLoading = false;
        this.currentSong = response.data.data.music;
        this.related = response.data.data.playlist;
      })
      .catch(err => {
        console.log(err);
      });
    this.initPlayer();
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

    repeat() {
      if (!this.settings.loop.state && !this.settings.onRepeat) {
        //firstclick
        this.settings.loop.state = true;
        this.settings.loop.value = 1;
        this.settings.onRepeat = true;
      } else if (
        this.settings.loop.state &&
        this.settings.onRepeat &&
        this.settings.loop.value === 1
      ) {
        //second click
        this.settings.loop.state = true;
        this.settings.loop.value = "all";
        this.settings.onRepeat = true;
      } else if (
        this.settings.loop.state &&
        this.settings.onRepeat &&
        this.settings.loop.value === "all"
      ) {
        this.settings.loop.state = false;
        this.settings.loop.value = 1;
        this.settings.onRepeat = false;
      }
    },

    skip(direction) {
      if (direction === "forward") {
        this.settings.currentIndex++;
      } else if (direction === "backward") {
        this.settings.currentIndex--;
      }
      console.log(this.settings.currentIndex);

      if (this.settings.currentIndex >= this.playlist.length) {
        this.settings.currentIndex = 0;
      }

      if (this.settings.currentIndex < 0) {
        this.settings.currentIndex = this.playlist.length - 1;
      }
      console.log(this.settings.currentIndex);

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

    mute() {
      //this.muted is a computed variable available down below

      if (this.settings.muted) {
        return (this.settings.volume = this.settings.previousVolume);
      } else {
        this.settings.previousVolume = this.settings.volume;
        this.settings.volume = 0;
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
      this.playlist.unshift(song);
    },

    dragSeek(e) {
      let el = e.target.getBoundingClientRect();
    },

    playNextSongInPlaylist() {
      if (this.settings.onRepeat && this.settings.loop.value === 1) {
        console.log("playcurrentSong");
        this.playCurrentSong();
      } else {
        if (this.playlist.length > 0) {
          if (this.settings.random) {
            //generate a random number
            let randomNumber = this.generateRandomNumber(
              0,
              this.playlist.length - 1,
              this.settings.previousPlaylistIndex
            );

            //set the current index of the playlist
            this.settings.currentIndex = randomNumber;

            //set the current song
            this.setCurrentSong(this.playlist[this.settings.currentIndex]);
            //begin to play
            this.playCurrentSong();
          } else {
            /**if the current Index of the playlist is equal to the index of the last song played skip that song
             and add 1*/

            if (
              this.settings.currentIndex === this.settings.previousPlaylistIndex
            ) {
              //increment the current index of the playlist by 1
              this.settings.currentIndex++;
            }

            /**if the current Index of the playlist is greater or equal to the length of the playlist songs (the index is out of range)
             reset the index to 0. It could also mean that the playlist is at its end. */

            if (this.settings.currentIndex >= this.playlist.length) {
              if (
                this.settings.onRepeat &&
                this.settings.loop.value === "all"
              ) {
                //if repeat is on then replay from the top
                this.settings.currentIndex = 0;
              }
            }

            if (this.playlist[this.settings.currentIndex] != null)
              this.setCurrentSong(this.playlist[this.settings.currentIndex]);
            if (this.isPlaying) {
              console.log("sdas");
              this.pause();
              setTimeout(() => {
                this.playCurrentSong();
              }, 500);
            } else {
              this.playCurrentSong();
            }
            this.settings.currentIndex++;
          }
        }
      }
    },

    shuffleToggle() {
      if (!this.settings.shuffle) {
        //shuffle the playlist songs and rearrange
        if (this.orginal_playlist.length == 0) {
          this.orginal_playlist = this.playlist;
        }
        this.playlist = this.shuffleArray(this.playlist);

        //reset the playlist index when changed and rest the previous playlist index
        this.settings.currentIndex = this.getObjectIndexFromArray(
          this.currentSong,
          this.playlist
        );
        this.settings.previousPlaylistIndex = this.settings.currentIndex;
        this.shuffle = true;
      } else {
        this.playlist = this.orginal_playlist;
        this.settings.shuffle = false;
      }
    },

    /** Helper methods
     * these methods are usually used within other methods*/

    formatTime(secs) {
      var minutes = Math.floor(secs / 60) || 0;
      var seconds = Math.floor(secs - minutes * 60) || 0;
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

    getObjectIndexFromArray(obj, list) {
      //this function just returns the index of the item with the id
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
          return i;
        }
      }
    },

    setCurrentSong(song) {
      this.currentSong = song;
      this.settings.previousPlaylistIndex = this.settings.currentIndex;
    },

    generateRandomNumber(min, max, except) {
      let num = null;
      num = Math.floor(Math.random() * (max - min + 1)) + min;
      return num === except ? this.generateRandomNumber(min, max, except) : num;
    },

    shuffleArray(array) {
      let ctr = array.length;
      let temp;
      let index;

      // While there are elements in the array
      while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
      }
      return array;
    },
    shareLink() {
      // TODO : add toast here
      navigator.clipboard
        .writeText("https://dl.pilo.app/" + this.$route.fullPath)
        .then(function() {}, function(err) {});
    },
    openCreatePlaylist() {
      this.showCustomModal = false;
      this.showCreatePlaylistModal = true;
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
    muted() {
      //this returns true or false
      return this.settings.volume / 100 === 0;
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
      this.$store.dispatch("setCurrentMusic", newValue);
    },
    isPlaying: function(newValue) {
      this.$store.commit("SET_IS_PLAYING", newValue);
    },
    settings: function(newValue) {
      this.$store.dispatch("setCurrentSetting", newValue);
    }
  }
};
</script>

<style lang="scss">
@import "../scss/music.scss";
</style>
