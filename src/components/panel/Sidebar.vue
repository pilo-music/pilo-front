<template>
  <div>
    <aside
      class="d-none d-sm-none d-md-block d-lg-block aside col-md-4 col-lg-2"
    >
      <div>
        <div class="aside-menu">
          <!-- profile -->
          <div class="text-right box-profile">
            <div class="img-profile">
              <router-link :to="{ name: 'profile' }">
                <img
                  v-if="currentUser != null && currentUser.user.pic.lenght > 0"
                  :src="currentUser.user.pic"
                  alt
                />
                <img
                  v-else
                  class="rounded-circle uk-box-shadow-large"
                  width="50"
                  src="@/assets/panel/img/account.svg"
                  alt="profile"
                />
              </router-link>
            </div>
            <div class="btn-show-profile">
              <span>کاربر مهمان</span>
              <router-link :to="{ name: 'profile' }"
                >ورود / ثبت نام</router-link
              >
            </div>
          </div>
          <!-- end profile -->
          <ul class="list-group">
            <li>
              <router-link :to="{ name: 'home' }">
                <i class="icon ion-md-compass"></i> صفحه اصلی
              </router-link>
            </li>
            <li>
              <router-link to="/musics">
                <i class="icon ion-md-headset"></i> موزیک ها
              </router-link>
            </li>
            <li>
              <router-link to="/videos">
                <i class="icon ion-ios-musical-notes"></i> آلبوم ها
              </router-link>
            </li>
            <li>
              <router-link to="/artists">
                <i class="icon ion-ios-stats"></i> خوانندگان
              </router-link>
            </li>
            <li>
              <router-link to="/videos">
                <i class="icon ion-ios-film"></i> موزیک ویدیو
              </router-link>
            </li>
          </ul>
        </div>
        <hr class="ml-3" />
        <div class="mt-4 aside-menu">
          <ul class="list-group">
            <li>
              <a href="#"> <i class="icon ion-md-heart-empty"></i> لایک ها </a>
            </li>
            <li>
              <a href="#"> <i class="icon ion-md-list"></i> بعدا گوش میدهم </a>
            </li>
            <li>
              <a href="#"> <i class="icon ion-ios-start"></i> مورد علاقه ها </a>
            </li>
            <li>
              <a href="#"> <i class="icon ion-md-help-buoy"></i> پشتیبانی </a>
            </li>
          </ul>
        </div>
        <hr class="ml-3" />
        <div class="mt-4 mb-5 pb-5 aside-menu">
          <ul class="list-group">
            <li v-for="(i, index) in playlists" :key="index">
              <a href="#">
                <i class="icon ion-md-heart-empty"></i>
                {{ i.name }}
              </a>
            </li>
            <li>
              <a href="#"> <i class="icon ion-md-heart-empty"></i>شاد مجلسی </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { get } from "@/services/api/playlist_api.js";
export default {
  name: "components.panel.sidebar",
  data() {
    return {
      playlists: []
    };
  },
  methods: {
    getPlayLists() {
      get()
        .then(response => {
          this.playlists = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  mounted() {
    if (this.currentUser) {
      this.getPlayLists();
    }
  }
};
</script>

<style></style>
