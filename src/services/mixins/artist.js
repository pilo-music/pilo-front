import { single } from "@/services/api/artist_api.js";
import Playlist from "@/components/SmallMusicList";
import HomeMusicsCarousel from "@/components/home/HomeMusicsCarousel";
import HomeAlbumsCarousel from "@/components/home/HomeAlbumsCarousel";
import HomeVideosCarousel from "@/components/home/HomeVideosCarousel";

export default {
  components: {
    Playlist,
    HomeMusicsCarousel,
    HomeAlbumsCarousel,
    HomeVideosCarousel
  },
  data() {
    return {
      artist: {
        name: "",
        image: "",
        id: 0,
        is_follow: false,
        music_count: 0,
        album_count: 0,
        video_count: 0
      },
      best_musics: [],
      last_musics: [],
      albums: [],
      videos: [],
      isLoading: false
    };
  },
  methods: {
    getInfo() {
      let slug = this.$route.params.slug;
      this.isLoading = true;
      single(slug)
        .then(response => {
          this.artist = response.data.data.artist;
          this.best_musics = response.data.data.best_musics;
          this.last_musics = response.data.data.last_musics;
          this.albums = response.data.data.albums;
          this.videos = response.data.data.videos;
          this.isLoading = false;
        })
        .catch(() => {
          this.$notify({
            group: "notify",
            title: "مشکلی در ارتباط با سرور رخ داده است",
            type: "error"
          });
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.getInfo();
  }
};
