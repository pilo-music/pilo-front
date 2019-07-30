<template>
  <layout name="Panel">
    <div class="container-fluid">
      <div class="single-video-box">
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
              <span>{{ video.title }}</span>
            </div>
            <!-- TODO: add more detail -->
            <!-- <div>
                <img src="@/assets/panel/img/icon/ellipsis.svg" alt="back-to-prev-page" />
            </div>-->
          </div>
        </b-navbar>
        <!-- Video Info -->
        <div class="margin-t">
          <div class="single-video-info text-right margin-r margin-l">
            <span class="color-primary font-big">{{ video.title }}</span> _
            <span class="font-medium">{{ video.artist.name }}</span>
          </div>
        </div>
        <!-- Video -->
        <div class="margin-t">
          <vue-plyr>
            <video :poster="video.image" :src="video.url">
              <source
                v-if="video.video720 != null"
                :src="video.video720"
                type="video/mp4"
                size="720"
              />
              <source
                type="video/mp4"
                v-if="video.video1080 != null"
                :src="video.video1080"
                size="1080"
              />
            </video>
          </vue-plyr>
        </div>
        <!-- Controls -->
        <div class="margin-t">
          <ul class="list-inline video-control">
            <li class="list-inline-item">
              <like :post_id="video.id" post_type="video" :has_like="video.has_like" />
            </li>

            <li class="list-inline-item">
              <a :href="video.url">
                <div>
                  <img
                    class="download"
                    src="@/assets/panel/img/icon/download-circle.svg"
                    alt="download"
                  />
                </div>
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <!-- playlist -->
        <div v-if="playlist.length > 0">
          <playlist :items="playlist" />
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Like from "@/components/Like.vue";
import { single } from "@/services/api/video_api.js";
import Playlist from "@/components/SmallMusicList.vue";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout,
    Playlist,
    Like
  },
  name: "views.video",
  head: {
    // To use "this" in the component, it is necessary to return the object through a function
    title: function() {
      return {
        inner: this.$route.params.slug
      };
    }
  },
  data() {
    return {
      video: {
        id: "",
        title: "",
        artist: {
          name: ""
        },
        image: "",
        link128: ""
      },
      playlist: []
    };
  },
  mounted() {
    single(this.$route.params.slug)
      .then(response => {
        this.video = response.data.data.video;
        this.playlist = response.data.data.playlist;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
@import "../scss/video.scss";
</style>
