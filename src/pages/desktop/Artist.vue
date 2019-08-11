<template>
  <div>
    <!-- header -->
    <div class="container-fluid">
      <div class="artist-single-box artist-single-box-desktop padding-b margin-b mb-5 pb-5">
        <!-- Artist Profile -->
        <div class="artist-profile" v-show="!isLoading">
          <div class="row justify-content-end">
            <div class="col-lg-3 col-md-4 p-0">
              <div class="artist-info-bottom">
                <div>
                  <span>{{ artist.album_count }}</span>
                  <p>آلبوم</p>
                </div>
                <div>
                  <span>{{ artist.music_count }}</span>
                  <p>موزیک</p>
                </div>
                <div>
                  <span>{{ artist.video_count }}</span>
                  <p>موزیک ویدیو</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 artist-image col-md-4 p-0">
              <div class="artist-info-top">
                <div>
                  <h2>{{ artist.name }}</h2>
                </div>
                <!-- <div>
                  <button>دنبال کردن</button>
                </div>-->
              </div>
              <img
                v-if="artist.image != '' && artist.image != null && artist.image != '.'"
                class="img-fluid artist-img uk-box-shadow-small"
                :src="artist.image"
                :alt="artist.name"
              />
              <img
                v-else
                class="uk-box-shadow-small img-fluid"
                src="@/assets/panel/img/user.svg"
                alt="artist.name"
              />
            </div>
          </div>
        </div>

        <div class="row mt-4 pt-2 artist-musics" v-if="best_musics.length > 0">
          <!-- Best Music -->
          <div class="col-md-6">
            <div class="section-title pr-4">
              <h2 class="text-right">برترین موزیک ها</h2>
              <router-link
                :to="{
                  name: 'musics',
                  params: {
                    artist: artist.slug,
                    filter: 'best'
                  }
                }"
              >نمایش همه</router-link>
            </div>
            <div v-if="!isLoading" class="mt-3">
              <playlist :items="best_musics" v-if="best_musics.length > 0" />
            </div>
          </div>
          <!-- Last Musics -->
          <div class="col-md-6">
            <div class="section-title pr-4">
              <h2 class="text-right">جدیدترین موزیک ها</h2>
              <router-link
                :to="{
                  name: 'musics',
                  params: {
                    artist: artist.slug
                  }
                }"
              >نمایش همه</router-link>
            </div>
            <div v-if="!isLoading" class="mt-3">
              <playlist :items="last_musics" v-if="last_musics.length > 0" />
            </div>
          </div>
        </div>
        <!-- Last Albums -->
        <div class="row margin-t" v-if="albums.length>0">
          <div class="section-title col-12 pr-4">
            <h2 class="text-right">جدیدترین آلبوم ها</h2>
            <router-link
              :to="{
                  name: 'albums',
                  params: {
                    artist: artist.slug
                  }
                }"
            >نمایش همه</router-link>
          </div>
        </div>
        <div v-if="!isLoading">
          <home-albums-carousel :items="albums" v-if="albums.length > 0" />
        </div>
        <!-- Last Videos -->
        <div class="row margin-t" v-if="videos.length > 0">
          <div class="section-title col-12 pr-4">
            <h2 class="text-right">جدیدترین موزیک ویدیو ها</h2>
            <router-link
              :to="{
                  name: 'videos',
                  params: {
                    artist: artist.slug
                  }
                }"
            >نمایش همه</router-link>
          </div>
        </div>
        <div v-if="!isLoading">
          <home-videos-carousel :items="videos" v-if="videos.length > 0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Artist from "@/services/mixins/artist";
import Layout from "@/layouts/Layout";

export default {
  mixins: [Artist],
  components: {
    Layout
  },
  name: "pages.desktop.artist"
};
</script>