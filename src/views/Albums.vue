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
                <span>لیست آلبوم ها</span>
              </div>
            </div>
          </b-navbar>
          <!-- Music Items -->
          <div class="margin-t">
            <div v-if="!isLoading" class="row">
              <div v-for="i in albums" :key="i.id" class="col-md-2 col-sm-6 col-6 mb-3">
                <album-item :item="i"/>
              </div>
              <infinite-loading @infinite="infiniteHandler"></infinite-loading>
            </div>
            <div v-else></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlbumItem from "@/components/AlbumItem.vue";
import InfiniteLoading from "vue-infinite-loading";
import { get } from "@/services/api/album_api.js";

export default {
  components: {
    AlbumItem,
    InfiniteLoading
  },
  name: "views.albums",
  data() {
    return {
      page: 1,
      albums: [],
      isLoading: true
    };
  },
  methods: {
    infiniteHandler($state) {
      var filter = "";
      if (this.$route.params.filter === "best") filter = "best";

      get(filter, this.page)
        .then(response => {
          if (response.data.data.length) {
            this.page += 1;
            this.albums = this.albums.concat(response.data.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted($state) {
    var filter = "";
    if (this.$route.params.filter === "best") filter = "best";

    get(filter, this.page)
      .then(response => {
        this.page += 1;
        this.albums = this.albums.concat(response.data.data);
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
@import "../scss/musics.scss";
</style>
