<template>
  <layout name="Default">
    <div class="container-fluid">
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
            <span>لیست خوانندگان ها</span>
          </div>
        </div>
      </b-navbar>
      <!-- Music Items -->
      <div class="margin-t padding-t">
        <div v-if="!isLoading" class="row">
          <div v-for="i in artists" :key="i.id" class="col-md-2 col-sm-6 col-6 mb-3">
            <artist-item :artist="i" />
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
import ArtistItem from "@/components/ArtistItem.vue";
import InfiniteLoading from "vue-infinite-loading";
import { get } from "@/services/api/artist_api.js";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout,
    ArtistItem,
    InfiniteLoading
  },
  name: "views.artists",
  data() {
    return {
      page: 1,
      artists: [],
      isLoading: true
    };
  },
  head: {
    title: function() {
      return {
        inner: "خوانندگان"
      };
    }
  },
  methods: {
    infiniteHandler($state) {
      var filter = "";
      if (this.$route.params.filter === "best") filter = "best";

      get(filter, this.page)
        .then(response => {
          if (response.data.data.length) {
            this.page += 1;
            this.artists = this.artists.concat(response.data.data);
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
        this.artists = this.artists.concat(response.data.data);
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
@import "../scss/artists.scss";
</style>
