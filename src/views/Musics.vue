<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="musics-list-box">
          <!-- header -->
          <b-navbar :sticky="true">
            <div class="music-header full">
              <div>
                <img
                  @click="$router.go(-1)"
                  src="@/assets/panel/img/icon/left-arrow.svg"
                  alt="back-to-prev-page"
                >
              </div>
              <div>
                <span>لیست موزیک</span>
              </div>
            </div>
          </b-navbar>   
          <!-- Controls -->
          <div class="margin-t">
            <div class="row">
              <div class="col-6">
                <div class="musics-controls">
                  <span>پخش</span>
                  <img
                    class="play"
                    src="@/assets/panel/img/icon/music-player-play-primary.svg"
                    alt="play"
                  >
                </div>
              </div>
              <div class="col-6">
                <div class="musics-controls">
                  <span>شافل</span>
                  <img
                    class="shuffle"
                    src="@/assets/panel/img/icon/music_shuffle_primary.svg"
                    alt="play"
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- Music Items -->
          <div class="margin-t">
            <div class="row">
              <!-- <div v-for="i in 10" :key="i" class="col-md-2 col-sm-6 col-6 mb-3">
                <music-item :music="music"/>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicItem from "@/components/MusicItem.vue";
export default {
  components: {
    MusicItem
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
@import "../scss/musics.scss";
</style>
