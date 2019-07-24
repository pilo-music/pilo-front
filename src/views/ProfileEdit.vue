<template>
  <layout name="Panel" class="profile-edit">
    <div class="align">
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
                <span>ویرایش پروفایل</span>
              </div>
            </div>
          </b-navbar>
        </div>
      </div>
      <div class="mb-3 text-center">
        <div class="mb-3">
          <img
            v-if="pic.length > 0"
            :src="pic"
            class="rounded-circle"
            alt="user-image"
            width="100"
            height="100"
            @click="$refs.file.click()"
          />
          <img
            class="rounded-circle"
            v-else
            @click="$refs.file.click()"
            src="@/assets/panel/img/user.svg"
            alt="user-image"
            width="100"
            height="100"
          />
          <input
            style="display: none;"
            ref="file"
            type="file"
            @change="previewImage"
            accept="image/*"
          />
        </div>
        <button class="upload-image" @click="$refs.file.click()">
          آپلود عکس
        </button>
      </div>
      <div class="grid">
        <b-alert
          :variant="errors.alertStatus"
          class="rtl text-right"
          :show="errors.showAlert"
          >{{ errors.alertMessage }}</b-alert
        >

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
              v-model="password"
            />
          </div>
          <div class="error">
            <p>{{ errors.password }}</p>
          </div>

          <div class="form__field">
            <input
              type="password"
              name="confirm"
              class="form__input"
              placeholder="تکرار رمز عبور"
              v-model="confirm"
            />
          </div>
          <div class="error">
            <p>{{ errors.confirm }}</p>
          </div>

          <div ref="spinner" class="spinner" v-show="isLoading">
            <b-spinner label="Small Spinning"></b-spinner>
          </div>

          <div class="form__field">
            <input type="submit" value="ذخیره" />
          </div>
          <div class="success">
            <p>{{ errors.confirm }}</p>
          </div>
        </form>
      </div>
    </div>
  </layout>
</template>

<script>
import { edit, me } from "@/services/api/user_api";
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout
  },
  data() {
    return {
      pic: "",
      name: "",
      email: "",
      password: "",
      confirm: "",
      errors: {
        password: "",
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
      if (this.password != this.confirm) {
        this.errors.confirm = "رمزهای عبور یکسان نمیباشند";
        return;
      }
      if (this.password.length < 5) {
        this.errors.password = "پسورد باید دارای حداقل 5 کاراکتر باشد";
        return;
      }

      if (this.name.lengh == 0) {
        this.errors.name = "لطفا نام خود را وارد کنید.";
        return;
      } else if (this.name.lengh <= 3) {
        this.errors.name = "نام باید دارای حداقل 3 کاراکتر باشد";
        return;
      }

      edit(this.name, this.password)
        .then(response => {
          this.isLoading = false;
          if (response.data.data == "success") {
            this.errors.showAlert = true;
            this.errors.alertMessage = "اطلاعات با موفقیت ذخیره شد";
            this.errors.alertStatus = "success";
            setTimeout(() => {
              this.errors.showAlert = false;
            }, 2000);
          } else {
            this.errors.showAlert = true;
            this.errors.alertMessage = "مشکلی در انجام عملیات رخ داده است";
            this.errors.alertStatus = "danger";
            setTimeout(() => {
              this.errors.showAlert = false;
            }, 2000);
          }
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
      this.isLoading = false;
    },
    getData() {
      me()
        .then(response => {
          this.name = response.data.data.name;
          this.pic = response.data.data.pic;
          this.email = response.data.data.email;
        })
        .catch(err => {
          console.log("profile_edit  " + err);
        });
    },
    previewImage: function(event) {
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.pic = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  },
  mounted() {
    this.getData();
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
