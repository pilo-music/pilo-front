<template>
  <div>
    <panel>
      <div class="row">
        <div class="section-title col-12">
          <h2 class="uk-heading-line uk-text-right">
            <span>جدیدترین موزیک ها</span>
          </h2>
        </div>
      </div>
      <div class="clearfix"></div>
      <!-- music slider -->

      <vue-glide>
        <vue-glide-slide v-for="i in 10" :key="i"></vue-glide-slide>
      </vue-glide>

      <!-- @component('Panel.section.component.music_slider',['musics'=>$musics])@endcomponent -->
      <div class="clearfix"></div>
      <!-- end slider -->
      <div class="row">
        <div class="section-title col-12">
          <h2 class="uk-heading-line uk-text-right">
            <span>آخرین خوانندگان</span>
          </h2>
        </div>
      </div>
      <div class="clearfix"></div>
      <!-- artist slider -->
      <!-- @component('Panel.section.component.artist_slider',['artists'=>$artists])@endcomponent -->
      <!-- end artist slider -->
      <div class="clearfix"></div>
      <div class="mb-5 mt-5 section-musics mt-2">
        <div class="container-fluid">
          <div class="row">
            <!-- Music Video slider -->
            <div class="col-md-6">
              <div class="section-title col-12">
                <h2 class="uk-heading-line uk-text-right">
                  <span>جدیدترین موزیک ویدیوها</span>
                </h2>
              </div>
              <div class="video-slider mb-2">
                <!-- @component('Panel.section.component.music_video',['videos'=>$videos])@endcomponent -->
              </div>
            </div>
            <!-- end Music Video -->
            <div class="col-md-6">
              <div class="section-title col-12">
                <h2 class="uk-heading-line uk-text-right">
                  <span>موزیک های برگزیده</span>
                </h2>
              </div>
              <div class="daily-music mt-2">
                <!-- @component('Panel.section.component.last_music',['musics'=>$best])@endcomponent -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
import Panel from "@/views/Panel";
import MusicItem from "@/components/MusicItem";
export default {
  components: {
    Panel,
    MusicItem
  },
  name: "views.screens.home_screen"
};
</script>

<style lang="scss">
@import "./../../scss/panel.scss";
</style>
