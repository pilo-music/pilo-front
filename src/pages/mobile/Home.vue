<template>
  <div>
    <!-- hearo slider -->
    <!-- <home-hero-carousel />  -->
    <!-- music slider -->
    <div class="row">
      <div class="section-title col-12 pr-4">
        <h2 class="text-right">تازه های برگزیده</h2>
        <router-link :to="{ name: 'musics', params: { filter: 'best' } }">نمایش همه</router-link>
      </div>
    </div>
    <div v-if="!isLoading">
      <home-musics-carousel :items="data.best_musics" />
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
    <div class="clearfix"></div>
    <!-- artist slider -->
    <div class="row">
      <div class="section-title col-12 pr-4">
        <h2 class="text-right">خوانندگان برگزیده</h2>
        <router-link :to="{ name: 'artists' }">نمایش همه</router-link>
      </div>
    </div>
    <div v-if="!isLoading">
      <home-artists-carousel :items="data.artists" />
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
    <div class="clearfix"></div>
    <!-- Music Video slider -->
    <div class="row">
      <div class="section-title col-12 pr-4">
        <h2 class="text-right">جدیدترین موزیک ویدیوها</h2>
        <router-link :to="{ name: 'videos' }">نمایش همه</router-link>
      </div>
    </div>
    <div v-if="!isLoading">
      <home-videos-carousel :items="data.videos" />
    </div>
    <div v-else>
      <div class="row">
        <div class="col-12">
          <shimmer-box />
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="mb-3">
      <div class="container-fluid">
        <div class="row">
          <!-- Album slider -->
          <div class="col-md-7 p-0">
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
          <!-- end Album Video -->
          <div class="col-md-5 p-0">
            <div class="section-title col-12 pl-0">
              <h2 class="text-right">تازه ترین موزیک ها</h2>
              <router-link :to="{ name: 'musics' }">نمایش همه</router-link>
            </div>
            <div class="daily-music w-100 mt-2">
              <div v-if="!isLoading">
                <home-last-musics :items="data.last_musics" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "@/services/mixins/home";

export default {
  name: "pages.mobile.home",
  mixins: [Home]
};
</script>