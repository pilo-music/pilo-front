import Like from "@/components/Like.vue";
import { single } from "@/services/api/video_api.js";
import Playlist from "@/components/SmallMusicList.vue";
export default {
  components: {
    Playlist,
    Like
  },
  data() {
    return {
      video: {
        id: "",
        title: "",
        artist: {
          name: ""
        },
        image: "",
        link128: ""
      },
      playlist: []
    };
  },
  mounted() {
    single(this.$route.params.slug)
      .then(response => {
        this.video = response.data.data.video;
        this.playlist = response.data.data.playlist;
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
