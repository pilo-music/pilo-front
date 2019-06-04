<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="single-video-box">
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
                <span>{{video.title}}</span>
              </div>
              <div>
                <img src="@/assets/panel/img/icon/ellipsis.svg" alt="back-to-prev-page">
              </div>
            </div>
          </b-navbar>
          <!-- Video Info -->
          <div class="margin-t">
            <div class="single-video-info text-right margin-r margin-l">
              <span class="color-primary font-big">{{video.title}}</span> _
              <span class="font-medium">{{video.artist.name}}</span>
            </div>
          </div>
          <!-- Video -->
          <div class="margin-t">
            <vue-plyr>
              <video
                poster="https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg"
                src="https://dl.taksound.com/video/Ehsan Khaje Amiri - Shahre Divooneh [480].mp4"
              >
                <source
                  src="https://dl.taksound.com/video/Ehsan Khaje Amiri - Shahre Divooneh [720].mp4"
                  type="video/mp4"
                  size="720"
                >
                <source
                  src="https://dl.taksound.com/video/Ehsan Khaje Amiri - Shahre Divooneh [1080].mp4"
                  size="1080"
                >
              </video>
            </vue-plyr>
          </div>
          <!-- Controls -->
          <div class="margin-t">
            <ul class="list-inline video-control">
              <li class="list-inline-item">
                <like/>
              </li>
              <li class="list-inline-item">
                <div>
                  <img
                    class="shuffle"
                    src="@/assets/panel/img/icon/shuffle_circle.svg"
                    alt="shuffle"
                  >
                </div>
              </li>
              <li class="list-inline-item">
                <div>
                  <img class="download" src="@/assets/panel/img/icon/download.svg" alt="download">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicItem from "@/components/MusicItem.vue";
import Like from "@/components/Like.vue";
export default {
  components: {
    MusicItem,
    Like
  },
  name: "views.video",
  data() {
    return {
      video: {
        id: "1",
        title: "دوستت دارم",
        artist: {
          name: "مهدی احمدوند"
        },
        image:
          "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg",
        link128: "sasd"
      }
    };
  }
};
</script>

<style lang="scss">
@import "../scss/video.scss";
</style>
