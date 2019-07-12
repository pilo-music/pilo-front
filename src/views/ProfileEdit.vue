<template>
  <layout name="Panel">
    <div class="align auth">
      <div></div>
      <div class="grid">
        <form v-on:submit.prevent="doLogin" class="form login">
          <div class="form__field">
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
            <p>{{errors.password}}</p>
          </div>

          <div ref="spinner" class="spinner">
            <b-spinner label="Small Spinning"></b-spinner>
          </div>

          <div class="form__field">
            <input type="submit" value="ورود" />
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
  computed: {
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
        name: ""
      }
    };
  },
  methods: {
    editProfile() {
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
          if (response.data.data == "success") {
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
