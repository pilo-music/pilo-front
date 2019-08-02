<template>
  <div>
    <!-- hearo slider -->
    <!-- <home-hero-carousel />  -->
    <div class="row">
      <div class="col-lg-4 col-xl-3">
        <div class="section-title col-12 pl-0">
          <h2 class="text-right">تازه ترین موزیک ها</h2>
          <router-link :to="{ name: 'musics' }">نمایش همه</router-link>
        </div>
        <div class="daily-music daily-music-desktop w-100 mt-2">
          <div v-if="!isLoading">
            <home-last-musics class="p-0" :items="data.last_musics" />
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-xl-9">
        <div class="section-title pr-4">
          <h2 class="text-right">تازه های برگزیده</h2>
          <router-link :to="{ name: 'musics', params: { filter: 'best' } }">نمایش همه</router-link>
        </div>
        <!-- music slider -->
        <div v-if="!isLoading">
          <home-musics-carousel :items="data.best_musics" />
        </div>
        <div v-else>
          <div class="row">
            <div class="col-2">
              <shimmer-box />
            </div>
            <div class="col-2">
              <shimmer-box />
            </div>
            <div class="col-2">
              <shimmer-box />
            </div>
            <div class="col-2">
              <shimmer-box />
            </div>
            <div class="col-2">
              <shimmer-box />
            </div>
            <div class="col-2">
              <shimmer-box />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="section-title col-12 pr-4">
            <h2 class="text-right">خوانندگان برگزیده</h2>
            <router-link :to="{ name: 'artists' }">نمایش همه</router-link>
          </div>
        </div>
        <!-- artist slider -->
        <div v-if="!isLoading">
          <home-artists-carousel :items="data.artists" />
        </div>
        <div v-else>
          <div class="row">
            <div class="col-2">
              <shimmer-box />
            </div>
            <div class="col-2">
              <shimmer-box />
            </div>
            <div class="col-2">
              <shimmer-box />
            </div>
            <div class="col-2">
              <shimmer-box />
            </div>
            <div class="col-2">
              <shimmer-box />
            </div>
            <div class="col-2">
              <shimmer-box />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="mb-3 mt-4">
      <div class="container-fluid">
        <div class="row">
          <!-- Music Video slider -->
          <div class="col-md-6">
            <div class="row">
              <div class="section-title col-12">
                <h2 class="text-right">جدیدترین موزیک ویدیوها</h2>
                <router-link :to="{ name: 'videos' }">نمایش همه</router-link>
              </div>
            </div>
            <div v-if="!isLoading">
              <home-videos-carousel :items="data.videos" />
            </div>
            <div v-else>
              <div class="row">
                <div class="col-4">
                  <shimmer-box />
                </div>
                <div class="col-4">
                  <shimmer-box />
                </div>
                <div class="col-4">
                  <shimmer-box />
                </div>
              </div>
            </div>
          </div>
          <!-- Album slider -->
          <div class="col-md-6">
            <div class="section-title col-12 pl-0">
              <h2 class="text-right">جدیدترین آلبوم ها</h2>
              <router-link :to="{ name: 'albums' }">نمایش همه</router-link>
            </div>
            <div v-if="!isLoading">
              <home-albums-carousel :items="data.albums" />
            </div>
            <div v-else>
              <div class="row">
                <div class="col-6">
                  <shimmer-box />
                </div>
                <div class="col-6">
                  <shimmer-box />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeroCarousel from "@/components/home/HomeHeroCarousel";
import HomeMusicsCarousel from "@/components/home/HomeMusicsCarousel";
import HomeArtistsCarousel from "@/components/home/HomeArtistsCarousel";
import HomeVideosCarousel from "@/components/home/HomeVideosCarousel";
import HomeLastMusics from "@/components/SmallMusicList";
import HomeAlbumsCarousel from "@/components/home/HomeAlbumsCarousel";
import ShimmerBox from "@/components/ShimmerBox";
import { get } from "@/services/api/home_api";
import { getLocalSong } from "@/services/helpers/music.js";

export default {
  name: "pages.desktop.home",
  components: {
    HomeHeroCarousel,
    HomeMusicsCarousel,
    HomeArtistsCarousel,
    HomeVideosCarousel,
    HomeLastMusics,
    HomeAlbumsCarousel,
    ShimmerBox
  },
  data() {
    return {
      isLoading: true,
      data: {}
    };
  },
  methods: {
    checkCurrentSong() {
      let currentSong = getLocalSong();
      if (currentSong == null) {
        this.$store.dispatch("setCurrentMusic", this.data.best_musics[0]);
      }
    }
  },
  mounted() {
    get()
      .then(res => {
        this.isLoading = false;
        this.data = res.data.data;
        this.checkCurrentSong();
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>