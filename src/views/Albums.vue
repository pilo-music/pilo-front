<template>
  <layout name="Default">
    <div class="container-fluid pb-4 mb-4">
      <!-- header -->
      <b-navbar :sticky="true" class="d-block d-sm-block d-md-block d-lg-none">
        <div class="music-header full">
          <div>
            <img
              @click="$router.go(-1)"
              src="@/assets/panel/img/icon/left-arrow.svg"
              alt="back-to-prev-page"
            />
          </div>
          <div>
            <span>لیست آلبوم ها</span>
          </div>
        </div>
      </b-navbar>
      <!-- Music Items -->
      <div class="margin-t">
        <div v-if="!isLoading" class="row">
          <div v-for="(i, index) in albums" :key="index" class="col-md-2 col-sm-6 col-6 mb-3">
            <album-item :item="i" />
          </div>
          <infinite-loading spinner="spiral" @infinite="infiniteHandler">
            <div slot="no-more">مورد یافت نشد</div>
            <div slot="no-results">مورد یافت نشد</div>
          </infinite-loading>
        </div>
        <div v-else></div>
      </div>
    </div>
  </layout>
</template>

<script>
import AlbumItem from "@/components/AlbumItem.vue";
import InfiniteLoading from "vue-infinite-loading";
import { get } from "@/services/api/album_api.js";
import Layout from "@/layouts/Layout";

export default {
  components: {
    AlbumItem,
    InfiniteLoading,
    Layout
  },
  name: "views.albums",
  data() {
    return {
      page: 1,
      albums: [],
      isLoading: true
    };
  },
  head: {
    title: function() {
      return {
        inner: "البوم ها"
      };
    }
  },
  methods: {
    infiniteHandler($state) {
      var filter = "latest";
      if (this.$route.params.filter === "best") filter = "best";
      var artist = null;
      if (this.$route.params.artist != null && this.$route.params.artist != "")
        artist = this.$route.params.artist;

      get(filter, this.page, artist)
        .then(response => {
          if (response.data.data.length) {
            this.page++;
            this.albums = this.albums.concat(response.data.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(err => {
          this.$notify({
            group: "notify",
            title: "مشکلی در ارتباط با سرور رخ داده است",
            type: "error"
          });
        });
    }
  },
  mounted($state) {
    var filter = "latest";
    if (this.$route.params.filter === "best") filter = "best";
    var artist = null;
    if (this.$route.params.artist != null && this.$route.params.artist != "")
      artist = this.$route.params.artist;

    get(filter, this.page, artist)
      .then(response => {
        this.page++;
        this.albums = this.albums.concat(response.data.data);
        this.isLoading = false;
      })
      .catch(err => {
        this.$notify({
          group: "notify",
          type: "error",
          title: "مشکلی در ارتباط با سرور رخ داده است"
        });
      });
  }
};
</script>

<style lang="scss">
@import "../scss/musics.scss";
</style>
