<template>
  <layout name="Panel">
    <div class="container-fluid">
      <div class="musics-list-box">
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
              <span>لیست پیام ها</span>
            </div>
          </div>
        </b-navbar>
        <div class="margin-t">
          <div class="add-message-desktop d-none d-sm-none d-md-none d-lg-block">
            <div>
              <router-link :to="{ name: 'contactus' }">
                <img src="@/assets/panel/img/icon/plus-white.svg" alt="add-message" />
                <span>ایجاد پیام</span>
              </router-link>
            </div>
          </div>
          <div v-if="!isLoading">
            <div v-for="(i, index) in results" :key="index">
              <message-item :item="i" />
            </div>
          </div>

          <div class="add-message d-flex d-sm-flex d-md-flex d-lg-none">
            <router-link :to="{ name: 'contactus' }">
              <img src="@/assets/panel/img/icon/plus-white.svg" alt="add-message" />
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
  head: {
    title: function() {
      return {
        inner: "پیام ها"
      };
    }
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
          this.$notify({
            group: "notify",
            title: "مشکلی در ارتباط با سرور رخ داده است",
            type: "error"
          });
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
