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
            <div @click="text = ''" class="flex-1 text-right" v-show="showClose">
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
                <span @click="historyItemClick(item)" class="text">
                  {{
                  item
                  }}
                </span>
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
          <b-tab title="خواننده">
            <div class="row mt-4">
              <div v-for="i in results.artists" :key="i.id" class="col-md-2 col-sm-6 col-6 mb-3">
                <artist-item :artist="i" />
              </div>
            </div>
          </b-tab>
          <b-tab title="موزیک" active>
            <div class="row mt-4">
              <div v-for="i in results.musics" :key="i.id" class="col-md-2 col-sm-6 col-6 mb-3">
                <music-item :music="i" />
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import Search from "@/services/mixins/search";
import { isMobile } from "mobile-device-detect";

export default {
  name: "views.search",
  mixins: [Search],
  components: {
    Layout
  },
  data() {
    return {
      showHistory: true
    };
  },
  head: {
    title: function() {
      return {
        inner: "جستجو"
      };
    }
  },
  created() {
    if (!isMobile) {
      this.$router.push({
        name: "home"
      });
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
