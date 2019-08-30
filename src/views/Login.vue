<template>
  <layout name="Simple">
    <div class="align auth">
      <div>
        <router-link :to="{ name: 'home' }">
          <img class="logo" src="@/assets/panel/img/icon/pilo-logo-text.svg" alt />
        </router-link>
      </div>
      <div class="grid">
        <div
          v-if="status === 'success'"
          class="text-center font-small mb-4 alert alert-success"
        >{{message}}</div>
        <div
          v-if="status === 'error'"
          class="text-center font-small mb-4 alert alert-danger"
        >{{message}}</div>

        <form v-on:submit.prevent="doLogin" class="form login">
          <div class="form__field">
            <label for="login__username">
              <svg class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user" />
              </svg>
              <span class="hidden">Username</span>
            </label>
            <input
              id="login__username"
              type="text"
              name="username"
              class="form__input"
              placeholder="ایمیل"
              required
              v-model="email"
            />
          </div>

          <div class="form__field">
            <label for="login__password">
              <svg class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock" />
              </svg>
              <span class="hidden">Password</span>
            </label>
            <input
              id="login__password"
              type="password"
              name="password"
              class="form__input"
              placeholder="رمز عبور"
              required
              v-model="password"
            />
          </div>
          <div class="error">
            <p>{{ error.password }}</p>
          </div>

          <div ref="spinner" class="spinner">
            <b-spinner variant="dark" label="Small Spinning"></b-spinner>
          </div>

          <div class="form__field">
            <invisible-recaptcha
              id="login-btn"
              class="login-btn"
              sitekey="6LdSULAUAAAAAICsq_kAS1rjnvHG2onk_pzz-2GY"
              :callback="doLogin"
              type="submit"
            >ورود</invisible-recaptcha>
          </div>

          <div class="social" @click="goToGoogleLogin">
            <div class="google">
              <img src="@/assets/panel/img/icon/google.svg" alt="google" />
              ورود با گوگل
            </div>
          </div>

          <div class="divider"></div>
          <router-link :to="{ name: 'register' }">
            <div class="form__field">
              <input type="button" class="install" value="ثبت نام" />
            </div>
          </router-link>
        </form>

        <p class="text--center">
          رمز عبور خود را
          <router-link class="color-accent" :to="{ name: 'forgot_password' }">فراموش کرده اید ؟</router-link>
        </p>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" class="icons">
        <symbol id="arrow-right" viewBox="0 0 1792 1792">
          <path
            d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"
          />
        </symbol>
        <symbol id="lock" viewBox="0 0 1792 1792">
          <path
            d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z"
          />
        </symbol>
        <symbol id="user" viewBox="0 0 1792 1792">
          <path
            d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z"
          />
        </symbol>
      </svg>
    </div>
  </layout>
</template>

<script>
import { me } from "@/services/api/user_api";
import { login } from "@/services/api/login_api";
import Layout from "@/layouts/Layout";
import axios from "axios";
import InvisibleRecaptcha from "vue-invisible-recaptcha";

export default {
  components: {
    Layout,
    InvisibleRecaptcha
  },
  name: "views.login",
  data() {
    return {
      email: "",
      password: "",
      error: {
        password: ""
      },
      status: "",
      message: ""
    };
  },
  head: {
    title: function() {
      return {
        inner: "ورود / ثبت نام"
      };
    }
  },
  methods: {
    goToGoogleLogin() {
      window.location.href = "https://api.pilo.app/login/google";
    },
    doLogin() {
      if (this.email !== "" && this.password !== "") {
        this.error.password = "";
        this.$refs.spinner.style.visibility = "visible";
        login(this.email, this.password)
          .then(response => {
            if (response.data.status === "success") {
              if (response.data.data != null) {
                if (response.data.data.user != null) {
                  this.$store.dispatch("login", response.data.data);
                  setTimeout(() => {
                    this.$router.push({
                      name: "home"
                    });
                  }, 1000);
                  return;
                } else {
                  this.error.password = "مشکلی در انجام عملیات رخ داده است";
                }
              } else {
                this.error.password = "مشکلی در انجام عملیات رخ داده است";
              }
            } else if (response.data.status === "not_verify") {
              this.error.password =
                "ایمیل فعال سازی برای شما ارسال شد. لطفا حساب خود را تایید کنید";
            } else if (response.data.status === "deactive") {
              this.error.password =
                "حساب کاربری شما مسدود شده است ، لطفا با پشتیبانی تماس بگیرید";
            }
            this.$refs.spinner.style.visibility = "hidden";
          })
          .catch(err => {
            this.$refs.spinner.style.visibility = "hidden";
            if (err.message === "Request failed with status code 401") {
              this.error.password = "نام کاربری یا رمزعبور ناردست میباشد";
            }
          });
      } else {
        this.error.password = "لطفا ایمیل و رمزعبور خود را وارد کنید";
      }
    },
    checkToken(token) {
      me(token)
        .then(response => {
          if (response.data.data.access_token != null) {
            this.$store.dispatch("login", response.data.data);
            setTimeout(() => {
              this.$router.push({
                name: "home"
              });
            }, 1000);
          }
        })
        .catch(err => {
          console.log("profile_edit  " + err);
        });
    }
  },
  mounted() {
    if (this.$store.getters.currentUser) {
      this.checkToken(currentUser.access_token);
    }
  },
  created() {
    let status = this.$route.query.status;
    let token = this.$route.query.token;
    let message = this.$route.query.message;
    if (status && status.length > 0 && message && message.length > 0) {
      this.status = status;
      this.message = message;
      setTimeout(() => {
        (this.status = ""), (this.message = "");
      }, 5000);
    }

    if (token && token.length > 0) {
      this.checkToken(token);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/login.scss";
</style>
