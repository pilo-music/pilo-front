<template>
  <layout name="Panel">
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
                  />
                </div>
                <div>
                  <span>لیست لایک ها</span>
                </div>
              </div>
            </b-navbar>
            <div class="margin-t">
              <div v-if="!isLoading">
                <div v-for="(i,index) in results" :key="index">
                  <like-item :item="i" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import LikeItem from "@/components/LikeItem";
import { get } from "@/services/api/like_api";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout,
    LikeItem
  },
  name: "views.likes",
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

<style lagn="scss">
</style>
