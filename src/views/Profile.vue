<template>
  <div class="profile-box">
    <!-- Top Box -->
    <div class="profile-top uk-box-shadow-small">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6 text-left margin-t padding-r">
            <img class="img-alert" src="@/assets/panel/img/icon/alert.svg" alt>
          </div>
          <div class="col-6 text-right margin-t padding-l">
            <img
              class="img-logout"
              @click="showLogoutModal = true"
              src="@/assets/panel/img/icon/logout.svg"
              alt
            >
          </div>
        </div>
      </div>
      <div class="user-info">
        <div v-if="user.image.length > 0">
          <img :src="user.image" alt="user-image">
        </div>
        <div v-else>
          <img src="@/assets/panel/img/user.svg" alt="user-image">
        </div>
        <div>
          <span>{{user.email}}</span>
        </div>
      </div>
    </div>
    <!-- Bottom Box -->
    <div class="profile-bottom uk-box-shadow-small">
      <ul class="list-group">
        <li>
          ویرایش پروفایل
          <img src="@/assets/panel/img/icon/edit_black.svg" alt="edit">
        </li>
        <li>
          تاریخچه موزیک ها
          <img src="@/assets/panel/img/icon/time_black.svg" alt="time">
        </li>
        <li>
          لایک شده ها
          <img src="@/assets/panel/img/icon/heart_black.svg" alt="like">
        </li>
        <li>
          بوک مارک ها
          <img src="@/assets/panel/img/icon/bookmark_black.svg" alt="bookmark">
        </li>
        <li>
          تماس با پشتیبانی
          <img src="@/assets/panel/img/icon/support_black.svg" alt="support">
        </li>
      </ul>
    </div>
    <custom-modal :show="showLogoutModal" v-on:close="showLogoutModal = false">
      <div class="modal-header">
        <h3>خروج از حساب کاربری</h3>
        <img src="@/assets/panel/img/logo.png" alt="logo" width="40" height="40">
      </div>
      <div class="modal-body">
        <span class="form-label">آیا مایل به خروج از حساب کاربری خود هستید؟</span>
      </div>
      <div class="modal-footer text-right">
        <button class="btn btn-success" @click="logoutUser">بله</button>
        <button class="btn" @click="showLogoutModal = false">خیر</button>
      </div>
    </custom-modal>
  </div>
</template>

<script>
import { me, logout } from "@/services/api/login_api";
import CustomModal from "@/components/CustomModal";
export default {
  name: "views.profile",
  components: {
    CustomModal
  },
  data() {
    return {
      user: {
        image: "",
        email: ""
      },
      showLogoutModal: false
    };
  },
  methods: {
    logoutUser() {
      logout()
        .then(reponse => {
          if (reponse.status == 200) {
            this.$store.dispatch("logout");
            this.$router.push({
              name: "home"
            });
          }
        })
        .catch(() => {
          this.$store.dispatch("logout");
          this.$router.push({
            name: "home"
          });
        });
    },
    getUserInfo() {
      me()
        .then(response => {
          this.user.email = response.data.email;
          this.user.image = response.data.pic;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style lang="scss">
@import "../scss/profile.scss";
</style>
