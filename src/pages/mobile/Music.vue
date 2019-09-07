<template>
  <div class="container-fluid">
    <div class="single-music-box" v-if="!isLoading">
      <!-- header -->
      <b-navbar :sticky="true">
        <div class="music-header">
          <div>
            <img
              @click="$router.go(-1)"
              src="@/assets/panel/img/icon/left-arrow.svg"
              alt="back-to-prev-page"
            />
          </div>
          <div>
            <span>{{ currentSong.title }}</span>
          </div>
          <div class="header-drop-down">
            <img
              src="@/assets/panel/img/icon/ellipsis.svg"
              alt="back-to-prev-page"
              @click="showCustomModal = !showCustomModal"
            />
          </div>
        </div>
      </b-navbar>
      <div class="padding-t">
        <!-- music image -->
        <div class="music-image">
          <img :src="currentSong.image" :alt="currentSong.title" />
        </div>
        <!-- music info -->
        <div class="music-info">
          <p>{{ currentSong.title }}</p>
          <span>{{ currentSong.artist.name }}</span>
        </div>

        <!-- progress bar -->
        <div class="row music-progress-bar mt-3">
          <div class="position-relative">
            <img
              @click="repeat"
              :src="
                  settings.loop.state == false
                    ? settings.repeat_off
                    : settings.repeat_on
                "
              alt="share"
            />
            <div class="repeat-info" v-if="settings.onRepeat">{{ settings.loop.value }}</div>
          </div>
          <div class="flex-grow-1">
            <div class="progress-container">
              <div class="progress" id="progress-wrap">
                <div class="progress-handle" :style="{ left: settings.progressPercentageValue }"></div>

                <div class="transparent-seeker-layer" @click="seek"></div>

                <div class="bar" :style="{ width: settings.progressPercentageValue }"></div>
              </div>
            </div>
            <div class="row music-time">
              <div class="col-6">
                <span>{{ currentPlayedTime }}</span>
              </div>
              <div class="col-6 text-right">
                <span>{{ duration }}</span>
              </div>
            </div>
          </div>
          <div>
            <a download :href="currentSong.url">
              <img class="float-right" src="@/assets/panel/img/icon/download.svg" alt="download" />
            </a>
          </div>
        </div>
        <!-- Controls -->
        <div class="music-controls mt-3">
          <div>
            <img
              class="shuffle"
              @click="shuffleToggle"
              :src="
                  settings.shuffle ? settings.shuffleOn : settings.shuffleOff
                "
              alt="shuffle"
            />
          </div>
          <div class="prev">
            <img
              @click="skip('backward')"
              src="@/assets/panel/img/icon/fast-forward-left.svg"
              alt="prev"
            />
          </div>
          <div>
            <img
              v-if="!isPlaying"
              @click="playCurrentSong"
              alt="play"
              class="play"
              src="@/assets/panel/img/icon/main-play.svg"
            />
            <img
              class="play"
              @click="pause"
              v-else
              src="@/assets/panel/img/icon/main-pause.svg"
              alt="pause"
            />
          </div>
          <div class="next">
            <img
              @click="skip('forward')"
              src="@/assets/panel/img/icon/fast-forward-right.svg"
              alt="next"
            />
          </div>
          <like :post_id="currentSong.id" post_type="music" :has_like="currentSong.has_like" />
        </div>
        <hr />
      </div>
    </div>
    <!-- play list -->
    <div>
      <div class="row">
        <div class="section-title col-12 pr-4">
          <h2 class="text-right">پلی لیست شما</h2>
        </div>
      </div>
      <playlist class="p-0 playlist" :items="playlist" v-on:play="play($event)" />
    </div>
    <div class="clearfix"></div>
    <!-- Related Music -->
    <div v-if="!isLoading">
      <div class="row">
        <div class="section-title col-12 pr-4">
          <h2 class="text-right">موزیک های مرتبط</h2>
        </div>
      </div>
      <div>
        <home-musics-carousel :items="related" />
      </div>
    </div>
    <!-- Audio -->
    <audio
      :loop="settings.innerLoop"
      ref="audiofile"
      :src="currentSong.url"
      preload
      class="d-none"
      controls
    ></audio>
    <!-- Custom Modal for create Playlist -->
    <custom-modal :show="showCreatePlaylistModal" v-on:close="showCreatePlaylistModal = false">
      <add-to-playlist :post_id="currentSong.id" v-on:close="showCreatePlaylistModal = false" />
    </custom-modal>

    <!-- Custom Modal -->
    <custom-modal :show="showCustomModal" v-on:close="showCustomModal = false">
      <div class="modal-body" v-if="!isLoading">
        <div class="menu-item">
          <router-link
            :to="{
                name: 'artist',
                params: {
                  slug: currentSong.artist.slug
                }
              }"
          >
            صفحه خواننده
            <img src="@/assets/panel/img/icon/profile.svg" alt="profile" />
          </router-link>
        </div>
        <div class="menu-item">
          بوک مارک
          <Bookmark
            :post_id="this.currentSong.id"
            post_type="music"
            :has_bookmark="this.currentSong.has_bookmark"
          />
        </div>

        <div class="menu-item" @click="openCreatePlaylist">
          اضافه کردن به پلی لیست
          <img src="@/assets/panel/img/icon/plus.svg" alt="plus" />
        </div>
        <div @click="shareLink" class="menu-item">
          اشتراک گذاری
          <img src="@/assets/panel/img/icon/share.svg" alt="plus" />
        </div>
      </div>
    </custom-modal>
  </div>
</template>
<script>
import Music from "@/services/mixins/music";
import { single } from "@/services/api/music_api.js";

export default {
  mixins: [Music],
  name: "pages.desktop.music",
  created() {
    this.settings = this.currentSettings;
    this.settings.innerLoop = this.settings.loop.state;
  },

  mounted() {
    this.audioPlayer = this.$el.querySelectorAll("audio")[0];
    single(this.$route.params.slug)
      .then(response => {
        this.isLoading = false;
        this.currentSong = response.data.data.music;
        this.related = response.data.data.playlist;
        if (!this.containsObjectWithSameId(this.currentSong, this.playlist)) {
          this.addToPlaylist(this.currentSong);
        } else {
          var newPlaylist = this.playlist;
          newPlaylist.splice(this.currentSong, 1);
          this.$store.commit("SET_CURRENT_PLAYLIST", newPlaylist);
          this.addToPlaylist(this.currentSong);
        }
      })
      .catch(err => {
        this.$notify({
          group: "notify",
          title: "مشکلی در ارتباط با سرور رخ داده است",
          type: "error"
        });
      });
    this.initPlayer();
  }
};
</script>