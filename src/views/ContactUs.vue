<template>
  <layout name="Panel" class="profile-edit">
    <div class="align">
      <div class="container-fluid margin-t">
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
              <span>ارتباط با ما</span>
            </div>
          </div>
        </b-navbar>
      </div>

      <div class="grid">
        <b-alert :variant="alertStatus" class="rtl text-right" :show="alertShow">{{alertMessage}}</b-alert>

        <form v-on:submit.prevent="sendMessage" class="form contactus padding-t">
          <div class="form__field"></div>
          <div class="form__field">
            <input
              type="text"
              class="form__input"
              placeholder="موضوع پیام"
              required
              v-model="subject"
            />
          </div>

          <p class="text-right margin-r">دسته پیام</p>
          <div class="form__field">
            <select v-model="type" class="form-control text-right rtl">
              <option value="1">تماس با ما</option>
              <option value="2">فنی</option>
              <option value="3">انتقاد و پشنهاد</option>
            </select>
          </div>

          <div class="form__field">
            <textarea
              type="text"
              class="form__input"
              placeholder="پیام شما"
              required
              v-model="text"
            />
          </div>

          <div class="spinner" v-if="isLoading">
            <b-spinner variant="dark" label="Small Spinning"></b-spinner>
          </div>

          <div class="form__field">
            <input type="submit" value="ارسال" />
          </div>
        </form>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import { send } from "@/services/api/message_api";

export default {
  name: "views.contactus",
  components: {
    Layout
  },
  data() {
    return {
      subject: "",
      text: "",
      alertMessage: "",
      type: "1",
      alertShow: false,
      alertStatus: "success",
      isLoading: false
    };
  },
  methods: {
    sendMessage() {
      this.isLoading = true;
      send(this.subject, this.text, this.type)
        .then(response => {
          if (response.data.data == "success") {
            this.alertShow = true;
            this.alertStatus = "success";
            this.alertMessage = "پیام شما با موفقیت ارسال شد";
          } else {
            this.alertShow = true;
            this.alertStatus = "danger";
            this.alertMessage = "مشکلی در انجام عملیات رخ داده است";
          }
        })
        .catch(err => {
          console.log("ContactUs : " + err);
        });
    }
  }
};
</script>

<style lang="scss">
@import "./../scss/contactus.scss";
</style>
