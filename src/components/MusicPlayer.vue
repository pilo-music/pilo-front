<template>
  <div>
    <div class="music-player-desktop d-none d-sm-none d-md-flex d-lg-flex" v-if="currentSong">
      <div class="options">
        <like :post_id="currentSong.id" post_type="music" :has_like="currentSong.has_like" />
      </div>
      <div class="volume">
        <img src="@/assets/panel/img/icon/sound.svg" alt="volume" />
        <div>
          <div class="progress-container">
            <div class="progress" id="progress-wrap">
              <div class="progress-handle" :style="{ left: settings.progressPercentageValue }"></div>
              <div class="transparent-seeker-layer" @click="seek"></div>
              <div class="bar" :style="{ width: settings.progressPercentageValue }"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="progress-div">
        <div class="progress-container">
          <div class="progress" id="progress-wrap">
            <div class="progress-handle" :style="{ left: settings.progressPercentageValue }"></div>
            <div class="transparent-seeker-layer" @click="seek"></div>
            <div class="bar" :style="{ width: settings.progressPercentageValue }"></div>
          </div>
        </div>
        <div class="progress-time">
          <span>{{ currentPlayedTime }}</span>
          <span>{{ duration }}</span>
        </div>
      </div>
      <div class="controls">
        <div>
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
        <div>
          <img
            @click="skip('forward')"
            src="@/assets/panel/img/icon/fast-forward-right.svg"
            alt="next"
          />
        </div>
      </div>
      <div class="music-info">
        <div>
          <p class="music-artist">{{ currentSong.artist.name }}</p>
          <p class="music-title">{{ currentSong.title }}</p>
        </div>
        <div>
          <img class="music-image" :src="currentSong.image" :alt="currentSong.title" />
        </div>
      </div>
    </div>
    <div v-if="currentSong">
      <div v-touch:swipe="swipeUp" class="container-fluid d-block d-sm-block d-md-none d-lg-none">
        <div class="w-100 small-music-player" v-if="!isOpen">
          <div class="row">
            <div class="col-5">
              <img
                @click="skip('backward')"
                width="25"
                height="25"
                src="@/assets/panel/img/icon/fast-forward-left.svg"
                alt="fast-forward-black"
              />
              <img
                @click="pause"
                v-show="isPlaying"
                width="70"
                height="70"
                src="@/assets/panel/img/icon/main-pause.svg"
                alt="pause"
                class="play"
              />
              <img
                @click="playCurrentSong"
                width="70"
                height="70"
                v-show="!isPlaying"
                src="@/assets/panel/img/icon/main-play.svg"
                alt="play"
                class="play"
              />
              <img
                @click="skip('forward')"
                width="25"
                height="25"
                src="@/assets/panel/img/icon/fast-forward-right.svg"
                alt="fast-forward-black"
              />
            </div>
            <div class="col-7">
              <div>
                <span class="title">{{ currentSong.title }}</span>
                <span class="name">{{ currentSong.artist.name }}</span>
              </div>
              <img :src="currentSong.image" alt width="60" height="60" />
            </div>
          </div>
        </div>
        <transition name="music-player">
          <div class="row music-player" v-show="isOpen">
            <div class="w-100">
              <div class="music-player-box padding-r padding-l">
                <!-- header -->
                <div class="container-fluid" v-touch:swipe="swipeBottom">
                  <b-navbar :sticky="true">
                    <div class="w-100 text-center">
                      <p class="swipe-mark">__</p>
                    </div>
                  </b-navbar>
                </div>
                <div class="padding-t">
                  <!-- music image -->
                  <div class="music-image">
                    <img class="img-fluid" :src="currentSong.image" :alt="currentSong.title" />
                  </div>
                  <!-- music info -->
                  <div class="music-info">
                    <router-link
                      :to="{name:'music',params:{slug:currentSong.slug}}"
                    >{{ currentSong.title }}</router-link>
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
                          <div
                            class="progress-handle"
                            :style="{ left: settings.progressPercentageValue }"
                          ></div>

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
                      <a :href="currentSong.url">
                        <img
                          class="float-right"
                          src="@/assets/panel/img/icon/download.svg"
                          alt="download"
                        />
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
                          settings.shuffle
                            ? settings.shuffleOn
                            : settings.shuffleOff
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
                    <like
                      :post_id="currentSong.id"
                      post_type="music"
                      :has_like="currentSong.has_like"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- play list -->
            <div class="w-100 margin-r margin-l" style="overflow:scroll;padding-bottom:30px;">
              <div class="row">
                <div class="section-title col-12 pr-4">
                  <h2 class="text-right">پلی لیست شما</h2>
                </div>
              </div>
              <playlist class="p-0" :items="playlist" v-on:play="play($event)" />
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- Audio -->
    <audio
      :loop="settings.innerLoop"
      ref="audiofile"
      preload
      class="d-none"
      controls
    ></audio>
  </div>
</template>

<script>
import { getLocalSong } from "@/services/helpers/music.js";
import Music from "@/services/mixins/music";

export default {
  mixins: [Music],
  name: "components.music_player",
  data() {
    return {
      isOpen: false,
      currentSong: {}
    };
  },
  mounted: function() {
    this.audioPlayer = this.$refs.audiofile;
    let current = getLocalSong();
    if (this.currentSong == null) {
      this.currentSong = current;
    }
    this.initPlayer();
  },

  methods: {
    swipeUp(direction) {
      if (direction == "top") this.isOpen = true;
    },
    swipeBottom(direction) {
      if (direction == "bottom") this.isOpen = false;
    }
  },
  computed: {
    playlist() {
      return this.$store.getters.currentPlaylist;
    }
  }
};
</script>

<style></style>
