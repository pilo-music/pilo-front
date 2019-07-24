<template>
  <layout name="Panel">
    <div class="container-fluid">
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
              <span>لیست پیام ها</span>
            </div>
          </div>
        </b-navbar>
        <div class="margin-t">
          <div v-if="!isLoading">
            <div v-for="(i, index) in results" :key="index">
              <message-item :item="i" />
            </div>
          </div>

          <div class="add-message">
            <router-link :to="{ name: 'contactus' }">
              <img
                src="@/assets/panel/img/icon/plus-white.svg"
                alt="add-message"
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import MessageItem from "@/components/MessageItem";
import { get } from "@/services/api/message_api";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout,
    MessageItem
  },
  name: "views.messages",
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

<style lang="scss">
@import "./../scss/messages.scss";
</style>
