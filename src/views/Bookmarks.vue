<template>
  <layout name="Panel">
    <div class="container-fluid">
      <!-- header -->
      <b-navbar :sticky="true">
        <div class="music-header full">
          <div>
            <img
              @click="$router.go(-1)"
              src="@/assets/panel/img/icon/left-arrow.svg"
              alt="back-to-prev-page"
            />
          </div>
          <div>
            <span>لیست بوک مارک ها</span>
          </div>
        </div>
      </b-navbar>
      <div class="margin-t">
        <div v-if="!isLoading">
          <div v-for="(i, index) in results" :key="index">
            <bookmark-item :item="i" />
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import BookmarkItem from "@/components/BookmarkItem";
import { get } from "@/services/api/bookmark_api";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout,
    BookmarkItem
  },
  name: "views.bookmarks",
  data() {
    return {
      results: [],
      isLoading: true
    };
  },
  methods: {
    getData() {
      this.isLoading = true;
      get()
        .then(response => {
          this.isLoading = false;
          this.results = response.data.data;
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lagn="scss"></style>
