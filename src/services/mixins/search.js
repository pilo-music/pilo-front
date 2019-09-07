import { search } from "@/services/api/search_api.js";
import VideoItem from "@/components/VideoItem.vue";
import AlbumItem from "@/components/AlbumItem.vue";
import MusicItem from "@/components/MusicItem.vue";
import ArtistItem from "@/components/ArtistItem";
export default {
  components: {
    VideoItem,
    MusicItem,
    AlbumItem,
    ArtistItem
  },
  data() {
    return {
      text: "",
      showClose: false,
      showHistory: false,
      results: {},
      history: [],
      isLoading: false,
      showSearch: false
    };
  },
  methods: {
    action() {
      this.isLoading = true;
      search(this.text)
        .then(response => {
          this.isLoading = false;
          this.results = response.data.data;
          if (
            response.data.data.artists.length > 0 ||
            response.data.data.albums.length > 0 ||
            response.data.data.musics.length > 0 ||
            response.data.data.artists.length > 0
          ) {
            this.showSearch = true;
          } else {
            this.$bvToast.show("search-toast");
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$notify({
            group: "notify",
            title: "مشکلی در ارتباط با سرور رخ داده است",
            type: "error"
          });
        });
      this.addHistoryItem(this.text);
    },
    addHistoryItem(text) {
      // ensure they actually typed something
      if (!text || text.trim().length == 0) {
        return;
      } else {
        let item = this.history.indexOf(text);
        if (item != -1) {
          return;
        }
      }
      this.history.push(text);
      this.newHistory = "";
      this.saveHistory();
    },
    removeHistoryItem(text) {
      this.history.splice(text, 1);
      this.saveHistory();
    },
    saveHistory() {
      const parsed = JSON.stringify(this.history);
      localStorage.setItem("history", parsed);
    },
    historyItemClick(text) {
      this.text = text;
      this.action();
    }
  },
  mounted() {
    if (localStorage.getItem("history")) {
      try {
        this.history = JSON.parse(localStorage.getItem("history"));
      } catch (e) {
        localStorage.removeItem("history");
      }
    }
  },
  watch: {
    text: function() {
      if (this.text.length > 0) {
        this.showClose = true;
        this.showHistory = false;
      } else {
        this.showClose = false;
        this.showHistory = true;
        this.results = [];
      }
    }
  }
};
