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
                >
              </div>
              <div>
                <span>لیست موزیک</span>
              </div>
            </div>
          </b-navbar>
          <!-- Controls -->
          <div class="margin-t">
            <div class="row">
              <div class="col-6">
                <div class="musics-controls">
                  <span>پخش</span>
                  <img
                    class="play"
                    src="@/assets/panel/img/icon/music-player-play-primary.svg"
                    alt="play"
                  >
                </div>
              </div>
              <div class="col-6">
                <div class="musics-controls">
                  <span>شافل</span>
                  <img
                    class="shuffle"
                    src="@/assets/panel/img/icon/music_shuffle_primary.svg"
                    alt="play"
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- Music Items -->
          <div class="margin-t">
            <div v-if="!isLoading" class="row">
              <div v-for="i in musics" :key="i.id" class="col-md-2 col-sm-6 col-6 mb-3">
                <music-item :music="i"/>
              </div>
              <infinite-loading @infinite="infiniteHandler"></infinite-loading>
            </div>
            <div v-else></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicItem from "@/components/MusicItem.vue";
import InfiniteLoading from "vue-infinite-loading";
import { get } from "@/services/api/music_api.js";

export default {
  components: {
    MusicItem,
    InfiniteLoading
  },
  name: "views.music",
  data() {
    return {
      page: 1,
      musics: [],
      isLoading: true
    };
  },
  methods: {
    infiniteHandler($state) {
      get("best", this.page)
        .then(response => {
          if (response.data.data.length) {
            this.page += 1;
            this.musics = this.musics.concat(response.data.data);
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
    get("best", this.page)
      .then(response => {
        console.log(response.data.data);
        this.page += 1;
        this.musics = this.musics.concat(response.data.data);
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
