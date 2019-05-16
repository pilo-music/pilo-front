<template>
  <div>
    <div class="row">
      <div class="section-title col-12">
        <h2 class="text-right">بهترین موزیک ها</h2>
        <span>نمایش همه</span>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- music slider -->
    <home-musics-carousel/>
    <div class="clearfix"></div>
    <!-- end slider -->
    <div class="row">
      <div class="section-title col-12">
        <h2 class="text-right">آخرین خوانندگان</h2>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- artist slider -->
    <home-artists-carousel/>
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
  </div>
</template>

<script>
import HomeMusicsCarousel from "@/components/HomeMusicsCarousel";
import HomeArtistsCarousel from "@/components/HomeArtistsCarousel";
export default {
  name: "views.screens.home_screen",
  components: {
    HomeMusicsCarousel,
    HomeArtistsCarousel
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
