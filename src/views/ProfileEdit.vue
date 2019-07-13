<template>
  <layout name="Panel" class="profile-edit">
    <div class="align">
      <div class="container-fluid margin-t">
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
                    <span>ویرایش پروفایل</span>
                  </div>
                </div>
              </b-navbar>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 text-center">
        <div class="mb-3">
          <img
            v-if="currentUser.user.pic.length > 0"
            :src="currentUser.user.pic"
            alt="user-image"
            width="100"
            height="100"
          />
          <img v-else src="@/assets/panel/img/user.svg" alt="user-image" width="100" height="100" />
        </div>
        <button class="upload-image">آپلود عکس</button>
      </div>
      <div class="grid">
        <b-alert
          :variant="errors.alertStatus"
          class="rtl text-right"
          :show="errors.showAlert"
        >{{errors.alertMessage}}</b-alert>

        <form v-on:submit.prevent="editProfile" class="form profile padding-t">
          <div class="form__field">
            <input
              type="text"
              name="name"
              class="form__input"
              placeholder="نام"
              required
              v-model="name"
            />
          </div>
          <div class="form__field">
            <input
              type="email"
              name="email"
              disabled
              class="form__input"
              placeholder="ایمیل"
              required
              v-model="email"
            />
          </div>

          <div class="form__field">
            <input
              type="password"
              name="password"
              class="form__input"
              placeholder="رمز عبور"
              required
              v-model="password"
            />
          </div>

          <div class="form__field">
            <input
              type="password"
              name="confirm"
              class="form__input"
              placeholder="تکرار رمز عبور"
              required
              v-model="confirm"
            />
          </div>
          <div class="error">
            <p>{{errors.confirm}}</p>
          </div>

          <div ref="spinner" class="spinner" v-show="isLoading">
            <b-spinner label="Small Spinning"></b-spinner>
          </div>

          <div class="form__field">
            <input type="submit" value="ذخیره" />
          </div>
          <div class="success">
            <p>{{errors.confirm}}</p>
          </div>
        </form>
      </div>
    </div>
  </layout>
</template>

<script>
import { edit } from "@/services/api/user_api";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout
  },
  data() {
    return {
      pic: null,
      name: null,
      email: null,
      password: null,
      confirm: null,
      errors: {
        confirm: "",
        name: "",
        alertStatus: "success",
        alertMessage: "",
        showAlert: false
      },
      isLoading: false
    };
  },
  methods: {
    editProfile() {
      this.isLoading = true;
      if (password != confirm) {
        this.errors.confirm = "رمزهای عبور یکسان نمیباشند";
        return;
      }
      if (name.lengh == 0) {
        this.errors.name = "لطفا نام خود را وارد کنید.";
        return;
      }

      edit(this.name, this.password)
        .then(response => {
          this.isLoading = false;
          if (response.data.data == "success") {
            this.errors.showAlert = true;
            this.status.alertMessage = "اطلاعات با موفقیت ذخیره شد";
            this.status.alertStatus = "success";
          } else {
            this.errors.showAlert = true;
            this.status.alertMessage = "مشکلی در انجام عملیات رخ داده است";
            this.status.alertStatus = "danger";
          }
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    }
  },
  mounted() {
    this.name =
      this.currentUser.user.name == null ? "" : this.currentUser.user.name;
    this.email =
      this.currentUser.user.email == null ? "" : this.currentUser.user.email;
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>

<style lang="scss">
@import "./../scss/profile-edit.scss";
</style>
