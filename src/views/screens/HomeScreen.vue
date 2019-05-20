<template>
  <div>
    <div class="row">
      <div class="section-title col-12 pr-4">
        <h2 class="text-right">جدیدترین موزیک ویدیوها</h2>
        <a href="#">نمایش همه</a>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- Music Video slider -->
    <home-videos-carousel/> 
    <div class="row">
      <div class="section-title col-12 pr-4">
        <h2 class="text-right">تازه های برگزیده</h2>
        <a href="#">نمایش همه</a>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- music slider -->
    <home-musics-carousel/>
    <div class="clearfix"></div>
    <!-- end slider -->
    <div class="row">
      <div class="section-title col-12 pr-4">
        <h2 class="text-right">آخرین خوانندگان</h2>
        <a href="#">نمایش همه</a>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- artist slider -->
    <home-artists-carousel />
    <!-- end artist slider -->
    <div class="clearfix"></div>
    <div class="mb-3 mt-3 section-musics">
      <div class="container-fluid">
        <div class="row">
          <!-- Album slider -->
          <div class="col-md-7 p-0">
            <div class="section-title col-12 pl-0">
              <h2 class="text-right">جدیدترین آلبوم ها</h2>
              <a href="#">نمایش همه</a>
            </div>
            <div class="video-slider mb-2">
              <home-albums-carousel/>
            </div>
          </div>
          <!-- end Album Video -->
          <div class="col-md-5 p-0">
            <div class="section-title col-12 pl-0">
              <h2 class="text-right">جدیدترین برگزیده</h2>
              <a href="#">نمایش همه</a>
            </div>
            <div class="daily-music w-100 mt-2">
              <home-last-musics/>
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
import HomeVideosCarousel from "@/components/HomeVideosCarousel";
import HomeLastMusics from "@/components/HomeLastMusics";
import HomeAlbumsCarousel from "@/components/HomeAlbumsCarousel";
export default {
  name: "views.screens.home_screen",
  components: {
    HomeMusicsCarousel,
    HomeArtistsCarousel,
    HomeVideosCarousel,
    HomeLastMusics,
    HomeAlbumsCarousel
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
