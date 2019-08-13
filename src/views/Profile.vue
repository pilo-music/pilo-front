<template>
  <layout name="Panel">
    <div class="profile-box">
      <!-- Top Box -->
      <div class="profile-top uk-box-shadow-small">
        <div class="container-fluid">
          <div class="row">
            <div class="col-6 text-left margin-t padding-r">
              <router-link :to="{ name: 'messages' }">
                <img
                  v-if="currentUser"
                  class="img-alert"
                  src="@/assets/panel/img/icon/alert.svg"
                  alt
                />
              </router-link>
            </div>
            <div class="col-6 text-right margin-t padding-l">
              <img
                v-show="currentUser"
                class="img-logout"
                @click="showLogoutModal = true"
                src="@/assets/panel/img/icon/logout.svg"
                alt
              />
            </div>
          </div>
        </div>
        <div class="user-info">
          <div v-if="currentUser">
            <img
              v-if="currentUser != null && currentUser.user.pic != null &&currentUser.user.pic.lenght > 0"
              :src="currentUser.user.pic"
              alt="user-image"
            />
            <img v-else src="@/assets/panel/img/user.svg" alt="user-image" />
          </div>
          <div v-else>
            <img src="@/assets/panel/img/user.svg" alt="user-image" />
          </div>
          <div v-if="currentUser">
            <span>{{ currentUser.user.email }}</span>
          </div>
          <div v-else>
            <router-link class="login-btn" :to="{ name: 'login' }">ورود</router-link>
          </div>
        </div>
      </div>
      <!-- Bottom Box -->
      <div class="profile-bottom uk-box-shadow-small">
        <ul class="list-group">
          <li>
            <router-link :to="{ name: 'profile_edit' }">
              ویرایش پروفایل
              <img src="@/assets/panel/img/icon/edit_black.svg" alt="edit" />
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'likes' }">
              لایک شده ها
              <img src="@/assets/panel/img/icon/heart_black.svg" alt="like" />
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'bookmarks' }">
              بوک مارک ها
              <img src="@/assets/panel/img/icon/bookmark_black.svg" alt="bookmark" />
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'contactus' }">
              ارتباط با ما
              <img src="@/assets/panel/img/icon/support_black.svg" alt="support" />
            </router-link>
          </li>
        </ul>
      </div>
      <custom-modal :show="showLogoutModal" v-on:close="showLogoutModal = false">
        <div class="modal-header">
          <h3>خروج از حساب کاربری</h3>
          <img src="@/assets/panel/img/logo.png" alt="logo" width="40" height="40" />
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
  </layout>
</template>

<script>
import { me, logout } from "@/services/api/login_api";
import CustomModal from "@/components/CustomModal";
import Layout from "@/layouts/Layout";

export default {
  name: "views.profile",
  components: {
    CustomModal,
    Layout
  },
  data() {
    return {
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
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>

<style lang="scss">
@import "../scss/profile.scss";
</style>
