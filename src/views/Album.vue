<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="single-album-box">
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
                <span v-if="!isLoading">{{album.title}}</span>
              </div>
              <div>
                <img src="@/assets/panel/img/icon/ellipsis.svg" alt="back-to-prev-page">
              </div>
            </div>
          </b-navbar>
          <!-- body -->
          <div class="row margin-t">
            <!-- Image -->
            <div class="album-top">
              <img :src="album.image" :alt="album.title">
              <div class="album-bot">
                <!-- Controls -->
                <div class="album-control d-flex">
                  <like/>
                  <div>
                    <img
                      class="shuffle"
                      src="@/assets/panel/img/icon/shuffle_circle.svg"
                      alt="shuffle"
                    >
                  </div>
                  <div>
                    <img class="play" src="@/assets/panel/img/icon/main-play.svg" alt="play">
                  </div>
                </div>
                <!-- album info -->
                <div class="row">
                  <div class="col-2 margin-l">
                    <span class="font-medium">قطعه {{album.musics.length}}</span>
                  </div>

                  <div class="col-9">
                    <div class="single-album-info text-right margin-r margin-l">
                      <span class="color-primary font-big">{{album.title}}</span> _
                      <span class="font-medium">{{album.artist.name}}</span>
                    </div>
                  </div>
                </div>
                <!-- Playlist -->
                <div class="margin">
                  <playlist :items="album.musics"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Like from "@/components/Like.vue";
import Playlist from "@/components/SmallMusicList.vue";

import { single } from "@/services/api/album_api.js";
export default {
  components: {
    Like,
    Playlist
  },
  name: "views.album",
  data() {
    return {
      isLoading: true,
      album: {},
      playlist: []
    };
  },
  mounted() {
    single(this.$route.params.slug)
      .then(response => {
        this.isLoading = false;
        this.album = response.data.data.album;
        this.playlist = response.data.data.playlist;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
@import "../scss/album.scss";
</style>
