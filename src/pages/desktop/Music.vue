<template>
  <div class="container-fluid">
    <div class="row">
      <!-- play list -->
      <div class="col-lg-7 col-xl-7">
        <div class="row">
          <div class="section-title col-12 pr-4">
            <h2 class="text-right">پلی لیست شما</h2>
          </div>
        </div>
        <playlist class="p-0 playlist" :items="playlist" v-on:play="play($event)" />
      </div>
      <div class="single-music-box single-music-box-desktop col-lg-5 col-xl-5" v-if="!isLoading">
        <div class>
          <!-- music image -->
          <div class="music-image">
            <img :src="currentSong.image" :alt="currentSong.title" />
          </div>
          <!-- music info -->
          <div class="music-info">
            <p>{{ currentSong.title }}</p>
            <span @click="goToArtist">{{ currentSong.artist.name }}</span>
          </div>
          <!-- Actions -->
          <div class="music-actions">
            <div class="position-relative">
              <img
                width="20"
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
            <div>
              <Bookmark
                :post_id="this.currentSong.id"
                post_type="music"
                :has_bookmark="this.currentSong.has_bookmark"
              />
            </div>
            <div @click="openCreatePlaylist">
              <img width="20" src="@/assets/panel/img/icon/plus.svg" alt="plus" />
            </div>
            <div>
              <img src="@/assets/panel/img/icon/share.svg" alt="plus" width="20" />
            </div>
            <div>
              <a download :href="currentSong.url">
                <img
                  width="20"
                  class="float-right"
                  src="@/assets/panel/img/icon/download.svg"
                  alt="download"
                />
              </a>
            </div>
          </div>
          <!-- progress bar -->
          <div class="row music-progress-bar mt-3">
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
        </div>
      </div>
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
  </div>
</template>

<script>
import Music from "@/services/mixins/music";
import { single } from "@/services/api/music_api.js";

export default {
  mixins: [Music],
  name: "pages.desktop.music",
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
          // console.log(this.playlist);
          //TODO:i wanna change the current music index to first; but this code dont delete prev music and add new item to list;
          // i mean it should delete prev music and add new, but it doesn't delete and just add;
          // the splice func doesn't work ...;
          // var newPlaylist = this.playlist;
          // newPlaylist.splice(this.currentSong, 1);
          // this.$store.commit("SET_CURRENT_PLAYLIST", newPlaylist);
          // this.addToPlaylist(this.currentSong);
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.initPlayer();
  },
  methods: {
    goToArtist() {
      this.$router.push({
        name: "artist",
        params: {
          slug: this.currentSong.artist.slug
        }
      });
    }
  }
};
</script>