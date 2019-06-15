<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="single-music-box">
          <!-- header -->
          <b-navbar :sticky="true">
            <div class="music-header">
              <div>
                <img
                  @click="$router.go(-1)"
                  src="@/assets/panel/img/icon/left-arrow.svg"
                  alt="back-to-prev-page"
                >
              </div>
              <div>
                <span>{{currentSong.title}}</span>
              </div>
              <div class="header-drop-down">
                <img
                  src="@/assets/panel/img/icon/ellipsis.svg"
                  alt="back-to-prev-page"
                  @click="showMenu = !showMenu"
                >

                <div v-show="showMenu" class="menu">
                  <div class="menu-item">
                    صفحه خواننده
                    <img src="@/assets/panel/img/icon/profile.svg" alt="profile">
                  </div>
                  <div class="menu-item">
                    اضافه کردن به پلی لیست
                    <img src="@/assets/panel/img/icon/plus.svg" alt="plus">
                  </div>
                  <div class="menu-item">
                    اشتراک گذاری
                    <img src="@/assets/panel/img/icon/share.svg" alt="plus">
                  </div>
                </div>
              </div>
            </div>
          </b-navbar>
          <div class="margin-t">
            <!-- music image -->
            <div class="music-image">
              <img :src="currentSong.image" :alt="currentSong.title">
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
                >
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
                <img
                  v-b-modal="'download-box'"
                  class="float-right"
                  src="@/assets/panel/img/icon/download.svg"
                  alt="more-verc"
                >
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
                >
              </div>
              <div class="prev">
                <img
                  @click="skip('backward')"
                  src="@/assets/panel/img/icon/fast-forward-left.svg"
                  alt="prev"
                >
              </div>
              <div>
                <img
                  v-if="!isPlaying"
                  @click="playCurrentSong"
                  alt="play"
                  class="play"
                  src="@/assets/panel/img/icon/main-play.svg"
                >
                <img
                  class="play"
                  @click="pause"
                  v-else
                  src="@/assets/panel/img/icon/main-pause.svg"
                  alt="pause"
                >
              </div>
              <div class="next">
                <img
                  @click="skip('forward')"
                  src="@/assets/panel/img/icon/fast-forward-right.svg"
                  alt="next"
                >
              </div>
              <div>
                <img class="like" src="@/assets/panel/img/icon/heart.svg" alt="like">
              </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <!-- play list -->
        <div v-if="!isLoading">
          <playlist :items="playlist" v-on:play="play($event)"/>
        </div>
      </div>
    </div>
    <!-- Audio -->
    <audio
      :loop="innerLoop"
      ref="audiofile"
      :src="currentSong.link320"
      preload
      class="d-none"
      controls
    ></audio>
  </div>
</template>

<script>
import Playlist from "@/components/SmallMusicList.vue";
import { single } from "@/services/api/music_api.js";
export default {
  components: {
    Playlist
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
      playlist: [
        {
          id: 1,
          title: "2دوستت دارم",
          artist: {
            name: "مهدی احمدوند"
          },
          image:
            "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg",
          link128:
            "https://dl.taksound.com/music/Donyam Shodi Raft_5cf7f801a17d6.mp3"
        },
        {
          id: 2,
          title: "4دوستت دارم",
          artist: {
            name: "مهدی احمدوند"
          },
          image:
            "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg",
          link128:
            "https://dl.taksound.com/music/Donyam Shodi Raft_5cf7f801a17d6.mp3"
        }
      ],
      currentSong: {
        id: 3,
        title: " 3دوستت دارم",
        artist: {
          name: "مهدی احمدوند"
        },
        image:
          "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg",
        link128:
          "https://dl.taksound.com/music/Donyam Shodi Raft_5cf7f801a17d6.mp3"
      },
      showMenu: false
    };
  },
  created() {
    this.innerLoop = this.loop.state;
  },

  mounted() {
    single(this.$route.params.slug)
      .then(response => {
        this.audioPlayer = this.$el.querySelectorAll("audio")[0];
        this.isLoading = false;
        this.currentSong = response.data.data.music;
        this.playlist = response.data.data.playlist;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    /**Music player methods
     * these methods are used to control the music player*/

    initPlayer() {
      this.audioPlayer.src = this.playlist[0].link320;
      this.setCurrentSong(this.playlist[0]);

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
        if (this.isLoaded) {
          //check if song exists in playlist
          if (this.currentSong.id === song.id && this.isPlaying) {
            console.log("pause");
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
            this.setAudio(song.link320);
            this.setCurrentSong(song);
            this.playlist.currentIndex = this.getObjectIndexFromArray(
              song,
              this.playlist
            );
            this.previousPlaylistIndex = this.playlist.currentIndex;
            this.audioPlayer.play();
          }
        } else {
          this.setAudio(song.link320);
          this.audioPlayer.play();
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
        this.playlist.currentIndex += 1;
      } else if (direction === "backward") {
        this.playlist.currentIndex -= 1;
      }

      /**if the current Index of the playlist is greater or equal to the length of the playlist songs (the index is out of range)
       reset the index to 0. It could also mean that the playlist is at its end. */

      if (this.playlist.currentIndex >= this.playlist.length) {
        this.playlist.currentIndex = 0;
      }

      if (this.playlist.currentIndex < 0) {
        this.playlist.currentIndex = this.playlist.length - 1;
      }

      this.audioPlayer.src = this.playlist[this.playlist.currentIndex].link320;
      this.setCurrentSong(this.playlist[this.playlist.currentIndex]);

      //the code below checks if a song is playing so it can go ahead and auto play
      if (this.isPlaying) {
        this.audioPlayer.play();
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
        console.log(this.progressPercentageValue);
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

      let indexOfCurrentSong = this.playlist.currentIndex;

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
            this.playlist.currentIndex = randomNumber;

            //set the src of the audio player
            this.audioPlayer.src = this.playlist[
              this.playlist.currentIndex
            ].url;
            //set the current song
            this.setCurrentSong(this.playlist[this.playlist.currentIndex]);
            //begin to play
            this.audioPlayer.play();
          } else {
            /**if the current Index of the playlist is equal to the index of the last song played skip that song
             and add 1*/

            if (this.playlist.currentIndex === this.previousPlaylistIndex) {
              //increment the current index of the playlist by 1
              this.playlist.currentIndex += 1;
            }

            /**if the current Index of the playlist is greater or equal to the length of the playlist songs (the index is out of range)
             reset the index to 0. It could also mean that the playlist is at its end. */

            if (this.playlist.currentIndex >= this.playlist.length) {
              if (this.onRepeat && this.loop.value === "all") {
                //if repeat is on then replay from the top
                this.playlist.currentIndex = 0;
              } else {
                return;
              }
            }

            this.audioPlayer.src = this.playlist[
              this.playlist.currentIndex
            ].url;
            this.setCurrentSong(this.playlist[this.playlist.currentIndex]);
            this.audioPlayer.play();
            this.playlist.currentIndex++;
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
        this.playlist.currentIndex = this.getObjectIndexFromArray(
          this.currentSong,
          this.playlist
        );
        this.previousPlaylistIndex = this.playlist.currentIndex;
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

    playlistHelper() {},

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
      this.previousPlaylistIndex = this.playlist.currentIndex;
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
