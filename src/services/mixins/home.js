import { get } from "@/services/api/home_api";
import { getLocalSong } from "@/services/helpers/music.js";
import HomeHeroCarousel from "@/components/home/HomeHeroCarousel";
import HomeMusicsCarousel from "@/components/home/HomeMusicsCarousel";
import HomeArtistsCarousel from "@/components/home/HomeArtistsCarousel";
import HomeVideosCarousel from "@/components/home/HomeVideosCarousel";
import HomeLastMusics from "@/components/SmallMusicList";
import HomeAlbumsCarousel from "@/components/home/HomeAlbumsCarousel";
import ShimmerBox from "@/components/ShimmerBox";
export default {
  components: {
    HomeHeroCarousel,
    HomeMusicsCarousel,
    HomeArtistsCarousel,
    HomeVideosCarousel,
    HomeLastMusics,
    HomeAlbumsCarousel,
    ShimmerBox
  },
  data() {
    return {
      isLoading: true,
      data: {}
    };
  },
  methods: {
    checkCurrentSong() {
      let currentSong = getLocalSong();
      if (currentSong == null) {
        this.$store.dispatch("setCurrentMusic", this.data.best_musics[0]);
      }
    }
  },
  mounted() {
    get()
      .then(res => {
        this.isLoading = false;
        this.data = res.data.data;
        this.checkCurrentSong();
      })
      .catch(() => {
        this.$notify({
          group: "notify",
          title: "مشکلی در ارتباط با سرور رخ داده است",
          type: "error"
        });
      });
  }
};
