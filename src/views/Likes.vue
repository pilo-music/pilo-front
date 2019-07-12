<template>
  <layout name="Default">
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
                  <span>لیست لایک ها</span>
                </div>
              </div>
            </b-navbar>
            <div class="margin-t">
              <div class="search-page">
                <div class="results">
                  <b-tabs content-class="mt-3" fill>
                    <b-tab title="موزیک ویدیو">
                      <div class="row mt-4">
                        <div
                          v-for="i in results.videos"
                          :key="i.id"
                          class="col-sm-12 col-12 col-lg-6 mb-3"
                        >
                          <video-item :video="i" />
                        </div>
                      </div>
                    </b-tab>
                    <b-tab title="آلبوم">
                      <div class="row mt-4">
                        <div
                          v-for="i in results.albums"
                          :key="i.id"
                          class="col-md-2 col-sm-6 col-6 mb-3"
                        >
                          <album-item :item="i" />
                        </div>
                      </div>
                    </b-tab>
                    <b-tab title="موزیک">
                      <div class="row mt-4">
                        <div
                          v-for="i in results.musics"
                          :key="i.id"
                          class="col-md-2 col-sm-6 col-6 mb-3"
                        >
                          <music-item :music="i" />
                        </div>
                      </div>
                    </b-tab>
                    <b-tab title="خواننده" active>
                      <div class="row mt-4">
                        <div
                          v-for="i in results.artists"
                          :key="i.id"
                          class="col-md-2 col-sm-6 col-6 mb-3"
                        >
                          <artist-item :artist="i" />
                        </div>
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import ArtistItem from "@/components/ArtistItem";
import MusicItem from "@/components/MusicItem";
import AlbumItem from "@/components/AlbumItem";
import VideoItem from "@/components/VideoItem";
import { get } from "@/services/api/like_api";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout
  },
  name: "views.likes",
  data() {
    return {
      result: {}
    };
  },
  methods: {
    getData() {
      get()
        .then(response => {
          this.result = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lagn="scss">
</style>
