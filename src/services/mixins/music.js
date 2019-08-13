import Playlist from "@/components/SmallMusicList.vue";
import Like from "@/components/Like.vue";
import Bookmark from "@/components/Bookmark.vue";
import CustomModal from "@/components/CustomModal";
import AddToPlaylist from "@/components/AddToPlaylist";
import HomeMusicsCarousel from "@/components/home/HomeMusicsCarousel";
import { getLocalSong, getLocalSettings } from "@/services/helpers/music.js";

export default {
  components: {
    Playlist,
    Like,
    CustomModal,
    Bookmark,
    AddToPlaylist,
    HomeMusicsCarousel
  },
  data() {
    return {
      isLoading: true,
      settings: {},
      original_playlist: [],
      currentSong: {},
      related: [],
      showCustomModal: false,
      showCreatePlaylistModal: false,
    };
  },
  name: "services.mixins.music",
  mounted: function() {
    this.settings = getLocalSettings();
    this.settings.innerLoop = this.settings.loop.state;
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
      e.target.getBoundingClientRect();
    },

    playNextSongInPlaylist() {
      //TODO: this fuc doesn't work; plz fix it and remove all console.logs;
      if (this.settings.onRepeat && this.settings.loop.value === 1) {
        console.log("playing current cus on repeat");
        this.playCurrentSong();
      } else {
        if (this.playlist.length > 0) {
          if (this.settings.random) {
            console.log("playing random");
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
              console.log("increment index");
            }

            /**if the current Index of the playlist is greater or equal to the length of the playlist songs (the index is out of range)
             reset the index to 0. It could also mean that the playlist is at its end. */

            if (this.settings.currentIndex >= this.playlist.length) {
              if (
                this.settings.onRepeat &&
                this.settings.loop.value === "all"
              ) {
                console.log("check all repeat");
                //if repeat is on then replay from the top
                this.settings.currentIndex = 0;
              }
            }

            console.log("do noting");
            if (this.playlist[this.settings.currentIndex] != null)
              this.setCurrentSong(this.playlist[this.settings.currentIndex]);
            if (this.isPlaying) {
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
        if (this.original_playlist.length == 0) {
          this.original_playlist = this.playlist;
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
        this.playlist = this.original_playlist;
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
        .then(function() {}, function() {});
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
      if (newValue == true) {
        let current = getLocalSong();
        if (current.url != this.currentSong.url) this.playCurrentSong();
        else this.audioPlayer.play();
      } else {
        this.pause();
      }
    },
    settings: function(newValue) {
      this.$store.dispatch("setCurrentSetting", newValue);
    }
  }
};
