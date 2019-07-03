<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="musics-list-box">
          <!-- header -->
          <b-navbar :sticky="true">
            <div class="music-header full">
              <div>
                <img
                  @click="$router.go(-1)"
                  src="@/assets/panel/img/icon/left-arrow.svg"
                  alt="back-to-prev-page"
                />
              </div>
              <div>
                <span>لیست موزیک ویدیو ها</span>
              </div>
            </div>
          </b-navbar>
          <!-- Music Items -->
          <div class="margin-t">
            <div v-if="!isLoading" class="row">
              <div v-for="(index,i) in videos" :key="index" class="col-md-6 col-sm-6 col-lg-4 mb-3">
                <video-item :video="i" />
              </div>
              <infinite-loading spinner="spiral" @infinite="infiniteHandler">
                <div slot="no-more">مورد یافت نشد</div>
                <div slot="no-results">مورد یافت نشد</div>
              </infinite-loading>
            </div>
            <div v-else></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoItem from "@/components/VideoItem.vue";
import InfiniteLoading from "vue-infinite-loading";
import { get } from "@/services/api/video_api.js";

export default {
  components: {
    VideoItem,
    InfiniteLoading
  },
  name: "views.videos",
  data() {
    return {
      page: 1,
      videos: [],
      isLoading: true
    };
  },
  methods: {
    infiniteHandler($state) {
      var filter = "";
      if (this.$route.params.filter === "best") filter = "best";
      var artist = null;
      if (this.$route.params.artist != null && this.$route.params.artist != "")
        filter = this.$route.params.artist;

      get(filter, this.page, artist)
        .then(response => {
          if (response.data.data.length) {
            this.page += 1;
            this.videos = this.videos.concat(response.data.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted($state) {
    var filter = "";
    if (this.$route.params.filter === "best") filter = "best";
    var artist = null;
    if (this.$route.params.artist != null && this.$route.params.artist != "")
      filter = this.$route.params.artist;

    get(filter, this.page, artist)
      .then(response => {
        this.page += 1;
        this.videos = this.videos.concat(response.data.data);
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
@import "../scss/musics.scss";
</style>
