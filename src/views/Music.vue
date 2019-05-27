<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="single-music-box">
          <!-- header -->
          <div class="music-header">
            <img src="@/assets/panel/img/icon/left-arrow.svg" alt="back-to-prev-page">
          </div>
          <div class="mt-4">
            <!-- music image -->
            <div class="music-image">
              <img :src="music.image" :alt="music.title">
            </div>
            <!-- music info -->
            <div class="music-info">
              <p>{{ music.title}}</p>
              <span>{{music.artist.name}}</span>
            </div>

            <!-- progress bar -->
            <div class="row music-progress-bar mt-3">
              <div>
                <img src="@/assets/panel/img/icon/share-symbol.svg" alt="share">
              </div>
              <div class="flex-grow-1">
                <b-form-input type="range" min="0" max="100"></b-form-input>
                <div class="row music-time">
                  <div class="col-6">
                    <span>00:00</span>
                  </div>
                  <div class="col-6 text-right">
                    <span>4:30</span>
                  </div>
                </div>
              </div>
              <div>
                <img class="float-right" src="@/assets/panel/img/icon/ellipsis.svg" alt="more-verc">
              </div>
            </div>
            <!-- Controls -->
            <div class="music-controls mt-3">
              <div>
                <img class="repeat" src="@/assets/panel/img/icon/repeat.svg" alt="repeat">
              </div>
              <div>
                <img class="prev" src="@/assets/panel/img/icon/fast-forward-left.svg" alt="prev">
              </div>
              <div>
                <img alt="play" class="play" src="@/assets/panel/img/icon/main-play.svg">
              </div>
              <div>
                <img class="next" src="@/assets/panel/img/icon/fast-forward-right.svg" alt="next">
              </div>
              <div>
                <img class="like" src="@/assets/panel/img/icon/heart.svg" alt="like">
              </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <!-- play list -->
        <div>
          <playlist :item="music"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Playlist from "@/components/Playlist.vue";
export default {
  components: {
    Playlist
  },
  name: "views.music",
  data() {
    return {
      music: {
        id: "1",
        title: "دوستت دارم",
        artist: {
          name: "مهدی احمدوند"
        },
        image:
          "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg",
        link128: "sasd"
      }
    };
  }
};
</script>

<style lang="scss">
@import "../scss/music.scss";
</style>
