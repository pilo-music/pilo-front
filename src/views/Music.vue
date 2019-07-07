<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
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
                  :src="loop.state == false ? repeat_off : repeat_on"
                  alt="share"
                />
                <div class="repeat-info" v-if="onRepeat">{{loop.value}}</div>
              </div>
              <div class="flex-grow-1">
                <div class="progress-container">
                  <div class="progress" id="progress-wrap">
                    <div class="progress-handle" :style="{left:progressPercentageValue}"></div>

                    <div class="transparent-seeker-layer" @click="seek"></div>

                    <div class="bar" :style="{width:progressPercentageValue}"></div>
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
                  <img
                    class="float-right"
                    src="@/assets/panel/img/icon/download.svg"
                    alt="download"
                  />
                </a>
              </div>
            </div>
            <!-- Controls -->
            <div class="music-controls mt-3">
              <div>
                <img
                  class="shuffle"
                  @click="shuffleToggle"
                  :src="shuffle ? shuffleOn : shuffleOff"
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
      </div>
      <div class="col-md-6">
        <!-- play list -->
        <div v-if="!isLoading">
          <playlist :items="playlist" v-on:play="play($event)" />
        </div>
      </div>
    </div>
    <!-- Audio -->
    <audio :loop="innerLoop" ref="audiofile" :src="currentSong.url" preload class="d-none" controls></audio>
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
</template>

<script>
import Playlist from "@/components/SmallMusicList.vue";
import Like from "@/components/Like.vue";
import Bookmark from "@/components/Bookmark.vue";
import { single } from "@/services/api/music_api.js";
import CustomModal from "@/components/CustomModal";
import AddToPlaylist from "@/components/AddToPlaylist";

export default {
  components: {
    Playlist,
    Like,
    CustomModal,
    Bookmark,
    AddToPlaylist
  },
  name: "views.music",
  data() {
    return {
      isLoading: true,

      durationSeconds: 0,
      currentSeconds: 0,
      audioPlayer: undefined,
      previousVolume: 35,
      volume: 100,
      autoPlay: false,
      progressPercentageValue: "0%",

      isLoaded: false,
      isCurrentlyPlaying: "",
      onRepeat: false,
      shuffle: false,
      shuffleOff: require("@/assets/panel/img/icon/shuffle_circle.svg"),
      shuffleOn: require("@/assets/panel/img/icon/shuffle_circle_on.svg"),
      repeat_off: require("@/assets/panel/img/icon/repeat.svg"),
      repeat_on: require("@/assets/panel/img/icon/repeat_on.svg"),

      loop: {
        state: false,
        value: 1
      },
      orginal_playlist: [],
      playlist: [],
      currentSong: {},
      showCustomModal: false,
      showCreatePlaylistModal: false,
      previousPlaylistIndex: 0
    };
  },
  created() {
    this.innerLoop = this.loop.state;
  },

  mounted() {
    this.audioPlayer = this.$el.querySelectorAll("audio")[0];
    single(this.$route.params.slug)
      .then(response => {
        this.isLoading = false;
        this.currentSong = response.data.data.music;
        this.playlist = response.data.data.playlist;
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
      console.log(song);
      if (typeof song === "object") {
        if (this.isLoaded) {
          //check if song exists in playlist
          if (this.currentSong.id === song.id && this.isPlaying) {
            this.pause();
          } else if (this.currentSong.id === song.id && !this.isPlaying) {
            console.log("playCurrentSong");
            this.playCurrentSong();
          } else if (this.currentSong.id !== song.id) {
            if (!this.containsObjectWithSameId(song, this.playlist)) {
              console.log("addToPlaylist");
              this.addToPlaylist(song);
            } else {
              this.setCurrentSong(song);
              this.playCurrentSong();
              console.log("playMethod", "song already in playlist");
            }
            this.setAudio(song.url);
            this.setCurrentSong(song);
            this.setCurrentIndex(
              this.getObjectIndexFromArray(song, this.playlist)
            );
            this.previousPlaylistIndex = this.currentIndex;
            this.audioPlayer.play();
          }
        } else {
          this.currentSong = song;
          this.setAudio(song.url);
          this.pause();
          setTimeout(() => {
            this.playCurrentSong();
          }, 1000);
        }
        this.$store.commit("SET_IS_PLAYING", true);
      } else {
        throw new Error("Type Error : Song must be an object");
      }
    },

    playCurrentSong() {
      this.audioPlayer.play();
      this.$store.commit("SET_IS_PLAYING", true);
    },

    stop() {
      this.audioPlayer.currentTime = 0;
    },

    pause() {
      this.audioPlayer.pause();
      this.$store.commit("SET_IS_PLAYING", false);
    },

    repeat() {
      if (!this.loop.state && !this.onRepeat) {
        //firstclick
        this.loop.state = true;
        this.loop.value = 1;
        this.onRepeat = true;
      } else if (this.loop.state && this.onRepeat && this.loop.value === 1) {
        //second click
        this.loop.state = true;
        this.loop.value = "all";
        this.onRepeat = true;
      } else if (
        this.loop.state &&
        this.onRepeat &&
        this.loop.value === "all"
      ) {
        this.loop.state = false;
        this.loop.value = 1;
        this.onRepeat = false;
      }
    },

    skip(direction) {
      if (direction === "forward") {
        this.setCurrentIndex(this.currentIndex + 1);
      } else if (direction === "backward") {
        this.setCurrentIndex(this.currentIndex - 1);
      }

      /** 
        if the current Index of the playlist is greater or equal to the length of the playlist songs (the index is out of range)
        reset the index to 0. It could also mean that the playlist is at its end. 
      **/

      if (this.currentIndex >= this.playlist.length) {
        this.setCurrentIndex(0);
      }

      if (this.currentIndex < 0) {
        this.setCurrentIndex(this.playlist.length - 1);
      }

      this.audioPlayer.src = this.playlist[this.currentIndex].url;
      this.setCurrentSong(this.playlist[this.currentIndex]);

      //the code below checks if a song is playing so it can go ahead and auto play
      if (this.isPlaying) {
        this.pause();
        setTimeout(() => {
          this.playCurrentSong();
        }, 1000);
      }
    },

    mute() {
      //this.muted is a computed variable available down below

      if (this.muted) {
        return (this.volume = this.previousVolume);
      } else {
        this.previousVolume = this.volume;
        this.volume = 0;
      }
    },

    updateTimer() {
      this.currentSeconds = parseInt(this.audioPlayer.currentTime);
      this.progressPercentageValue =
        ((this.currentSeconds / parseInt(this.audioPlayer.duration)) * 100 ||
          0) + "%";
    },

    seek(e) {
      if (this.isLoaded) {
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

        this.progressPercentageValue = seekPosPercentage;
      } else {
        throw new Error("Song Not Loaded");
      }
    },

    addAndPlayNext() {
      let selectedSong = {
        title: "Song Name 3",
        artist: "Artist Name",
        album: "Album Name",
        url: "./song2.mp3",
        cover_art_url: "/cover/art/url.jpg",
        isPlaying: false
      };

      //add the song to the playlist

      //get the index of the song that is currently being played in the player

      //insert the song at that position

      let indexOfCurrentSong = this.currentIndex;

      this.playlist.splice(indexOfCurrentSong + 1, 0, selectedSong);
    },

    addToPlaylist(song) {
      this.playlist.unshift(song);
    },

    dragSeek(e) {
      let el = e.target.getBoundingClientRect();
    },

    playNextSongInPlaylist() {
      if (this.onRepeat && this.loop.value === 1) {
        this.audioPlayer.play();
      } else {
        if (this.playlist.length > 1) {
          if (this.random) {
            //generate a random number
            let randomNumber = this.generateRandomNumber(
              0,
              this.playlist.length - 1,
              this.previousPlaylistIndex
            );

            //set the current index of the playlist
            this.setCurrentIndex(randomNumber);

            //set the src of the audio player
            this.audioPlayer.src = this.playlist[this.currentIndex].url;
            //set the current song
            this.setCurrentSong(this.playlist[this.currentIndex]);
            //begin to play
            this.audioPlayer.play();
          } else {
            /**if the current Index of the playlist is equal to the index of the last song played skip that song
             and add 1*/

            if (this.currentIndex === this.previousPlaylistIndex) {
              //increment the current index of the playlist by 1
              this.setCurrentIndex((this.currentIndex += 1));
            }

            /**if the current Index of the playlist is greater or equal to the length of the playlist songs (the index is out of range)
             reset the index to 0. It could also mean that the playlist is at its end. */

            if (this.currentIndex >= this.playlist.length) {
              if (this.onRepeat && this.loop.value === "all") {
                //if repeat is on then replay from the top
                this.setCurrentIndex(0);
              } else {
                return;
              }
            }

            this.audioPlayer.src = this.playlist[this.currentIndex].url;
            this.setCurrentSong(this.playlist[this.currentIndex]);
            this.audioPlayer.play();
            this.setCurrentIndex((this.currentIndex += 1));
          }
        } else {
        }
      }
    },

    shuffleToggle() {
      if (!this.shuffle) {
        //shuffle the playlist songs and rearrange
        if (this.orginal_playlist.length == 0) {
          this.orginal_playlist = this.playlist;
        }
        this.playlist = this.shuffleArray(this.playlist);

        //reset the playlist index when changed and rest the previous playlist index
        this.setCurrentIndex(
          this.getObjectIndexFromArray(this.currentSong, this.playlist)
        );
        this.previousPlaylistIndex = this.currentIndex;
        this.shuffle = true;
      } else {
        this.playlist = this.orginal_playlist;
        this.shuffle = false;
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
        this.isLoaded = true;
        this.durationSeconds = parseInt(this.audioPlayer.duration);
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
      this.previousPlaylistIndex = this.currentIndex;
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
    setCurrentIndex(index) {
      this.$store.commit("SET_CURRENT_INDEX", index);
    },
    shareLink() {
      // TODO : add toast here
      navigator.clipboard
        .writeText("https://m.taksound.com/" + this.$route.fullPath)
        .then(
          function() {
            console.log("Async: Copying to clipboard was successful!");
          },
          function(err) {
            console.error("Async: Could not copy text: ", err);
          }
        );
    },
    openCreatePlaylist() {
      this.showCustomModal = false;
      this.showCreatePlaylistModal = true;
    }
  },

  computed: {
    currentPlayedTime() {
      return this.formatTime(this.currentSeconds);
    },
    duration() {
      return this.formatTime(this.durationSeconds);
    },
    progressPercentage() {
      return parseInt((this.currentSeconds / this.durationSeconds) * 100);
    },
    muted() {
      //this returns true or false
      return this.volume / 100 === 0;
    },
    isPlaying() {
      return this.$store.getters.isPlaying;
    },
    currentIndex() {
      return this.$store.getters.currentIndex;
    }
  },
  watch: {
    currentSong: function(newValue) {
      this.$store.dispatch("setCurrentMusic", newValue);
    },
    isPlaying: function(newValue) {
      this.$store.commit("SET_IS_PLAYING", newValue);
    }
  }
};
</script>

<style lang="scss">
@import "../scss/music.scss";
</style>
