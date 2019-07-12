<template>
  <layout name="Default">
    <div class="search-page">
      <!-- search box -->
      <div class="row uk-box-shadow-small">
        <div class="search-box">
          <div class="flex-1 text-left">
            <img src="@/assets/panel/img/icon/recording.svg" alt="recording" />
          </div>
          <div class="position-relative" style="top:-7px;" v-show="isLoading">
            <b-spinner small></b-spinner>
          </div>
          <div class="flex-10">
            <form v-on:submit.prevent="action">
              <input v-model="text" type="search" placeholder="موزیک ، خواننده ، آلبوم و ...." />
            </form>
          </div>
          <transition name="fade">
            <div @click="text=''" class="flex-1 text-right" v-show="showClose">
              <img src="@/assets/panel/img/icon/close.svg" alt="close" />
            </div>
          </transition>
        </div>
      </div>
      <!-- Histoy -->
      <div class="clearfix"></div>
      <transition name="fade">
        <div class="history" v-show="showHistory">
          <ul class="list-group">
            <li v-for="(item, n) in history" :key="n">
              <div>
                <img
                  @click="removeHistoryItem(n)"
                  class="delete"
                  src="@/assets/panel/img/icon/close.svg"
                  alt="delete"
                />
                <span @click="historyItemClick(item)" class="text">{{item}}</span>
                <img class="time" src="@/assets/panel/img/icon/time_black.svg" alt="time" />
              </div>
              <hr />
            </li>
          </ul>
        </div>
      </transition>
      <!-- results -->
      <div class="results">
        <b-tabs content-class="mt-3" fill>
          <b-tab title="موزیک ویدیو">
            <div class="row mt-4">
              <div v-for="i in results.videos" :key="i.id" class="col-sm-12 col-12 col-lg-6 mb-3">
                <video-item :video="i" />
              </div>
            </div>
          </b-tab>
          <b-tab title="آلبوم">
            <div class="row mt-4">
              <div v-for="i in results.albums" :key="i.id" class="col-md-2 col-sm-6 col-6 mb-3">
                <album-item :item="i" />
              </div>
            </div>
          </b-tab>
          <b-tab title="موزیک">
            <div class="row mt-4">
              <div v-for="i in results.musics" :key="i.id" class="col-md-2 col-sm-6 col-6 mb-3">
                <music-item :music="i" />
              </div>
            </div>
          </b-tab>
          <b-tab title="خواننده" active>
            <div class="row mt-4">
              <div v-for="i in results.artists" :key="i.id" class="col-md-2 col-sm-6 col-6 mb-3">
                <artist-item :artist="i" />
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </layout>
</template>

<script>
import { search } from "@/services/api/search_api.js";
import VideoItem from "@/components/VideoItem.vue";
import AlbumItem from "@/components/AlbumItem.vue";
import MusicItem from "@/components/MusicItem.vue";
import ArtistItem from "@/components/ArtistItem";
import Layout from "@/layouts/Layout";

export default {
  name: "views.search",
  components: {
    VideoItem,
    MusicItem,
    AlbumItem,
    ArtistItem,
    Layout
  },
  data() {
    return {
      text: "",
      showClose: false,
      showHistory: true,
      results: [],
      history: [],
      isLoading: false
    };
  },
  methods: {
    action() {
      this.isLoading = true;
      search(this.text)
        .then(response => {
          this.isLoading = false;
          this.results = response.data.data;
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
      this.addHistoryItem(this.text);
    },
    addHistoryItem(text) {
      // ensure they actually typed something
      if (!text || text.trim().length == 0) {
        return;
      } else {
        let item = this.history.indexOf(text);
        if (item != -1) {
          return;
        }
      }
      this.history.push(text);
      this.newHistory = "";
      this.saveHistory();
    },
    removeHistoryItem(text) {
      this.history.splice(text, 1);
      this.saveHistory();
    },
    saveHistory() {
      const parsed = JSON.stringify(this.history);
      localStorage.setItem("history", parsed);
    },
    historyItemClick(text) {
      this.text = text;
      this.action();
    }
  },
  mounted() {
    if (localStorage.getItem("history")) {
      try {
        this.history = JSON.parse(localStorage.getItem("history"));
      } catch (e) {
        localStorage.removeItem("history");
      }
    }
  },
  watch: {
    text: function() {
      if (this.text.length > 0) {
        this.showClose = true;
        this.showHistory = false;
      } else {
        this.showClose = false;
        this.showHistory = true;
        this.results = [];
      }
    }
  }
};
</script>

<style lang="scss">
@import "../scss/search.scss";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
