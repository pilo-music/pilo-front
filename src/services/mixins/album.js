import Like from "@/components/Like.vue";
import Playlist from "@/components/SmallMusicList.vue";
import { single } from "@/services/api/album_api.js";

export default {
  components: {
    Like,
    Playlist
  },
  data() {
    return {
      isLoading: true,
      album: {
        id: "",
        artist_id: "",
        title: "",
        image: "",
        isbest: "",
        slug: "",
        musics: [
          {
            id: "",
            title: "",
            artist: {
              id: "",
              name: ""
            },
            image: "",
            link320: ""
          }
        ],
        artist: {
          id: "",
          name: ""
        }
      },
      playlist: []
    };
  },
  methods: {
    play() {
      if (this.album.musics.length > 0) {
        this.$store.commit("SET_CURRENT_PLAYLIST", this.album.musics);
        this.$store.dispatch("setCurrentMusic", this.album.musics[0]);
        this.$store.commit("SET_IS_PLAYING", true);
      }
    },
    shuffle() {
      if (this.album.musics.length > 0) {
        var newList = this.shuffleArray(this.album.musics);
        this.$store.commit("SET_CURRENT_PLAYLIST", newList);
        this.$store.dispatch("setCurrentMusic", newList[0]);
        this.$store.commit("SET_IS_PLAYING", true);
      }
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
    }
  },
  mounted() {
    single(this.$route.params.slug)
      .then(response => {
        this.isLoading = false;
        this.album = response.data.data.album;
        this.playlist = response.data.data.playlist;
        this.currentSong = this.playlist[0];
        this.audioPlayer.src = this.currentSong.url;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
