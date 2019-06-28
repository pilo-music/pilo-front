<template>
  <div class="align auth">
    <div>
      <router-link :to="{name:'home'}">
        <img class="logo" src="@/assets/panel/img/logo_with_text.png" alt>
      </router-link>
    </div>
    <div class="grid">
      <form v-on:submit.prevent="doRegister" class="form login">
        <div class="form__field">
          <label for="login__username">
            <svg class="icon">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
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
            v-bind="email"
          >
        </div>
        <div class="error">
          <p>{{error.email}}</p>
        </div>

        <div class="form__field">
          <label for="login__password">
            <svg class="icon">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use>
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
            v-bind="password"
          >
        </div>
        <div class="error">
          <p></p>
        </div>

        <div class="form__field">
          <label for="login__password">
            <svg class="icon">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use>
            </svg>
            <span class="hidden">Password</span>
          </label>
          <input
            id="login_conf_password"
            type="password"
            name="conf_password"
            class="form__input"
            placeholder="تکرار رمز عبور"
            required
            v-bind="confirm"
          >
        </div>
        <div class="error">
          <p>{{error.confirm}}</p>
        </div>
        <div ref="spinner" class="spinner">
          <b-spinner label="Small Spinning"></b-spinner>
        </div>
        <div class="form__field">
          <input type="submit" value="ثبت نام">
        </div>
      </form>
      <p class="text--center">
        حساب کاربری دارید؟
        <router-link :to="{name:'login'}">ورود</router-link>
      </p>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" class="icons">
      <symbol id="arrow-right" viewBox="0 0 1792 1792">
        <path
          d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"
        ></path>
      </symbol>
      <symbol id="lock" viewBox="0 0 1792 1792">
        <path
          d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z"
        ></path>
      </symbol>
      <symbol id="user" viewBox="0 0 1792 1792">
        <path
          d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z"
        ></path>
      </symbol>
    </svg>
  </div>
</template>

<script>
import { register } from "@/services/api/login_api";
export default {
  name: "views.register",
  data() {
    return {
      email: "",
      password: "",
      confirm: "",
      error: {
        confirm: "",
        email: ""
      }
    };
  },
  methods: {
    doRegister() {
      if (validEmail(this.email)) {
        if (this.password == this.confirm) {
          this.$refs.spinner.style.visibility = "visible";
          register(this.email, this.password)
            .then(response => {
              if (response.status == 200) {
                this.$store.dispatch("login", response.data);
                this.$router.push({
                  name: "home"
                });
              }
              this.$refs.spinner.style.visibility = "hidden";
            })
            .catch(err => {
              this.$refs.spinner.style.visibility = "hidden";
              console.log(err);
            });
        } else {
          this.error.confirm = "رمزهای عبور یکسان نمیباشند";
        }
      } else {
        this.error.email = "فرمت ایمیل ناردست میباشد";
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  mounted() {
    if (this.$store.getters.currentUser) {
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/login.scss";
</style>
