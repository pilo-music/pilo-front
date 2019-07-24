<template>
  <layout name="Default">
    <!-- Top boxs -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 browser-boxs">
          <router-link :to="{ name: 'musics' }">
            <div class="browser-box">
              <img
                src="@/assets/panel/img/icon/left-arrow-primary.svg"
                alt="left-arrow"
              />
              <div>
                <span class="margin-r">موزیک ها</span>
                <img
                  src="@/assets/panel/img/icon/music-icon-primary.svg"
                  class="img-fluid"
                  alt="musics"
                />
              </div>
            </div>
          </router-link>
          <router-link :to="{ name: 'videos' }">
            <div class="browser-box mt-3">
              <img
                src="@/assets/panel/img/icon/left-arrow-primary.svg"
                alt="left-arrow"
              />
              <div>
                <span class="margin-r">موزیک ویدیوها</span>
                <img
                  src="@/assets/panel/img/icon/video-icon-primary.svg"
                  class="img-fluid"
                  alt="musics"
                />
              </div>
            </div>
          </router-link>
          <router-link :to="{ name: 'albums' }">
            <div class="browser-box mt-3">
              <img
                src="@/assets/panel/img/icon/left-arrow-primary.svg"
                alt="left-arrow"
              />
              <div>
                <span class="margin-r">آلبوم ها</span>
                <img
                  src="@/assets/panel/img/icon/album-icon-primary.svg"
                  class="img-fluid"
                  alt="musics"
                />
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-12 p-0">
          <!-- Suggested Playlist -->
          <div class="row margin-t">
            <div class="section-title col-12 pr-4">
              <h2 class="text-right">پلی لیست های پیشنهادی</h2>
              <router-link :to="{ name: 'playlists' }">نمایش همه</router-link>
            </div>
          </div>
          <div v-if="!isLoading" class="mt-3">
            <browser-playlist-carousel :items="browser.playlists" />
          </div>
          <!-- Your Playlist -->
          <div class="row margin-t">
            <div class="section-title col-12 pr-4">
              <h2 class="text-right">پلی لیست های شما</h2>
              <router-link
                :to="{
                  name: 'playlists',
                  params: {
                    filter: 'me'
                  }
                }"
                >نمایش همه</router-link
              >
            </div>
          </div>
          <div v-if="!isLoading" class="mt-3">
            <div v-if="currentUser">
              <browser-playlist-carousel :items="browser.user_playlists" />
            </div>
            <div v-else class="text-center">
              <router-link class="login-error" :to="{ name: 'login' }"
                >برای نمایش این بخش باید وارد حساب کاربری خود شوید</router-link
              >
            </div>
          </div>
          <!-- Your Bookmark -->
          <div class="row margin-t">
            <div class="section-title col-12 pr-4">
              <h2 class="text-right">بوک مارک ها</h2>
              <router-link :to="{ name: 'playlists' }">نمایش همه</router-link>
            </div>
          </div>
          <div v-if="!isLoading" class="mt-3">
            <div v-if="currentUser">
              <browser-bookmarks-carousel :items="browser.bookmarks" />
            </div>
            <div v-else class="text-center">
              <router-link class="login-error" :to="{ name: 'login' }"
                >برای نمایش این بخش باید وارد حساب کاربری خود شوید</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import BrowserBookmarksCarousel from "@/components/browser/BrowserBookmarksCarousel";
import BrowserPlaylistCarousel from "@/components/browser/BrowserPlaylistCarousel";
import { get } from "@/services/api/browser_api";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout,
    BrowserBookmarksCarousel,
    BrowserPlaylistCarousel
  },
  name: "views.browser",
  data() {
    return {
      isLoading: false,
      browser: {}
    };
  },
  methods: {},
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  mounted() {
    get()
      .then(response => {
        this.browser = response.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
@import "../scss/browser.scss";
</style>
