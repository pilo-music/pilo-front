<template>
  <div class="header-box uk-box-shadow-small d-none d-md-block d-sm-none d-lg-block">
    <div class="header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-7 d-sm-none d-none d-md-none d-lg-block text-left">
            <ul class="list-inline">
              <!-- <li class="list-inline-item">
                <a href="https://www.instagram.com/taksoundmusic/">
                  <img
                    width="20"
                    src="@/assets/panel/img/icon/instagram.svg"
                    alt="instagram"
                  />
                </a>
              </li>
              <li class="list-inline-item">
                <a href="http://t.me/taksound">
                  <img
                    width="20"
                    src="@/assets/panel/img/icon/telegram.svg"
                    alt="telegram"
                  />
                </a>
              </li>-->
              <li class="list-inline-item">
                <a href="#">خوانندگان</a>
              </li>
              <li class="list-inline-item">
                <a href="#">آلبوم</a>
              </li>
              <li class="list-inline-item">
                <a href="#">موزیک ویدیو</a>
              </li>
              <li class="list-inline-item">
                <a href="#">موزیک</a>
              </li>
            </ul>
          </div>
          <!--search box-->
          <div class="col-md-12 col-sm-12 col-lg-5">
            <form
              class="navbar-form navbar-left input-s-lg m-t m-l-n-xs hidden-xs"
              role="search"
              v-on:submit.prevent="action"
            >
              <div class="div-search row w-100">
                <div v-if="!isLoading">
                  <svg
                    v-if="!showSearch"
                    class="icon color-gray icon-search"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.7 20.3l-3.7-3.7c1.2-1.5 2-3.5 2-5.6 0-5-4-9-9-9s-9 4-9 9c0 5 4 9 9 9 2.1 0 4.1-0.7 5.6-2l3.7 3.7c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4zM4 11c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-0.8 3.7-2 4.9 0 0 0 0 0 0s0 0 0 0c-1.3 1.3-3 2-4.9 2-4 0.1-7.1-3-7.1-6.9z"
                    />
                  </svg>
                  <div @click="showSearch=false" v-else class="mic">
                    <img src="@/assets/panel/img/icon/close.svg" width="15" alt="close" />
                  </div>
                </div>
                <div v-if="isLoading">
                  <b-spinner></b-spinner>
                </div>
                <div class="flex-2">
                  <input
                    @focus="showHistory = true"
                    @blur="showHistory = false"
                    autocomplete="off"
                    name="name"
                    class="search-box rtl"
                    v-model="text"
                    type="search"
                    placeholder="موزیک ، خواننده ، آلبوم و ...."
                  />
                </div>
                <div class="mic">
                  <img width="15" src="@/assets/panel/img/icon/recording.svg" alt="recording" />
                </div>
              </div>
            </form>

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
          </div>
        </div>
      </div>
    </div>
    <transition name="search-fade">
      <div v-if="showSearch" class="search-div">
        <div class="container-fluid">
          <div class="row">
            <div class="results col-12">
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
    </transition>
  </div>
</template>

<script>
import Search from "@/services/mixins/search";

export default {
  name: "components.panel.header",
  mixins: [Search],

  methods: {
    showAction(action) {
      this.showHistory = action;
    }
  }
};
</script>

<style>
.spinner-border {
  width: 25px !important;
  height: 25px !important;
}
</style>
