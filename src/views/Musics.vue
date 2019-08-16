<template>
  <layout name="Default">
    <div class="container-fluid">
      <div class="musics-list-box">
        <!-- header -->
        <b-navbar :sticky="true" class="d-block d-sm-block d-md-block d-lg-none">
          <div class="music-header full">
            <div>
              <img
                @click="$router.go(-1)"
                src="@/assets/panel/img/icon/left-arrow.svg"
                alt="back-to-prev-page"
              />
            </div>
            <div>
              <span>لیست موزیک</span>
            </div>
          </div>
        </b-navbar>
        <!-- Controls -->
        <div class="margin-t">
          <div class="row">
            <div class="col-6 col-sm-6 col-md-6 col-lg-2">
              <div class="musics-controls" @click="allPlay">
                <span>پخش</span>
                <img
                  class="play"
                  src="@/assets/panel/img/icon/music-player-play-primary.svg"
                  alt="play"
                />
              </div>
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-2">
              <div class="musics-controls" @click="shufflePlay">
                <span>شافل</span>
                <img
                  class="shuffle"
                  src="@/assets/panel/img/icon/music_shuffle_primary.svg"
                  alt="play"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Music Items -->
        <div class="margin-t">
          <div v-if="!isLoading" class="row">
            <div v-for="(i, index) in musics" :key="index" class="col-md-2 col-sm-6 col-6 mb-3">
              <music-item :music="i" />
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
  </layout>
</template>

<script>
import MusicItem from "@/components/MusicItem.vue";
import InfiniteLoading from "vue-infinite-loading";
import { get } from "@/services/api/music_api.js";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout,
    MusicItem,
    InfiniteLoading
  },
  name: "views.musics",
  data() {
    return {
      page: 1,
      musics: [],
      isLoading: true
    };
  },
  methods: {
    infiniteHandler($state) {
      var filter = "latest";
      if (this.$route.params.filter === "best") filter = "best";
      var artist = null;
      if (this.$route.params.artist != null && this.$route.params.artist != "")
        artist = this.$route.params.artist;

      get(filter, this.page, artist)
        .then(response => {
          if (response.data.data.length) {
            this.page++;
            this.musics = this.musics.concat(response.data.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    allPlay() {
      if (this.musics.length > 0) {
        this.$store.commit("SET_CURRENT_PLAYLIST", this.musics);
        this.$store.dispatch("setCurrentMusic", this.musics[0]);
        this.$store.commit("SET_IS_PLAYING", true);
      }
    },
    shufflePlay() {
      if (this.musics.length > 0) {
        var newList = this.shuffleArray(this.musics);
        this.$store.commit("SET_CURRENT_PLAYLIST", newList);
        this.$store.dispatch("setCurrentMusic", newList[0]);
        this.$store.commit("SET_IS_PLAYING", true);
      }
    },
    shuffleArray(array) {
      let ctr = array.length;
      let temp;
      let index;

      // While there are elements in the array
      while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
      }
      return array;
    }
  },
  mounted($state) {
    var filter = "latest";
    if (this.$route.params.filter === "best") filter = "best";

    var artist = null;
    if (this.$route.params.artist != null && this.$route.params.artist != "")
      artist = this.$route.params.artist;

    get(filter, this.page, artist)
      .then(response => {
        this.page++;
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
