<template>
  <layout name="Default">
    <div class="container-fluid">
      <div class="single-album-box">
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
              <span v-if="!isLoading">{{ album.title }}</span>
            </div>
            <!-- TODO: add more detail -->
            <!-- <div>
                <img src="@/assets/panel/img/icon/ellipsis.svg" alt="back-to-prev-page">
            </div>-->
          </div>
        </b-navbar>
        <!-- body -->
        <div class="row margin-t">
          <!-- Image -->
          <div class="album-top">
            <img :src="album.image" :alt="album.title" />
            <div class="album-bot">
              <!-- Controls -->
              <div class="album-control">
                <like :post_id="album.id" :post_type="album" :has_like="album.has_like" />
                <div>
                  <img
                    class="shuffle"
                    src="@/assets/panel/img/icon/shuffle_circle.svg"
                    alt="shuffle"
                  />
                </div>
                <div @click="play">
                  <img class="play" src="@/assets/panel/img/icon/main-play.svg" alt="play" />
                </div>
              </div>
              <!-- album info -->
              <div class="container-fluid">
                <div class="row">
                  <div class="col-3 padding-l">
                    <span class="font-medium">قطعه {{ album.musics.length }}</span>
                  </div>

                  <div class="col-8 p-0">
                    <div class="single-album-info text-right">
                      <span class="color-primary font-big">
                        {{
                        album.title
                        }}
                      </span>
                      _
                      <span class="font-medium">{{ album.artist.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Playlist -->
              <div class="margin">
                <playlist :items="album.musics" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Like from "@/components/Like.vue";
import Playlist from "@/components/SmallMusicList.vue";
import Layout from "@/layouts/Layout";

import { single } from "@/services/api/album_api.js";
export default {
  components: {
    Like,
    Playlist,
    Layout
  },
  name: "views.album",
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
    }
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
.single-album-box {
  .margin {
    margin-bottom: 60px;
  }
}
</style>
