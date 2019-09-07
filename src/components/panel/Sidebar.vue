<template>
  <div>
    <aside class="d-none d-sm-none d-md-block d-lg-block aside col-md-4 col-lg-3 col-xl-2">
      <div>
        <div class="aside-menu">
          <!-- profile -->
          <div class="text-right box-profile">
            <div class="img-profile">
              <router-link :to="{ name: 'profile' }">
                <img
                  v-if="currentUser != null && currentUser.user.pic != null &&currentUser.user.pic.lenght > 0"
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
            <div class="btn-show-profile" v-if="!currentUser">
              <span>کاربر مهمان</span>
              <router-link :to="{ name: 'login' }">ورود / ثبت نام</router-link>
            </div>
            <div class="btn-show-profile" v-else>
              <span
                v-if="currentUser.user.name != null && currentUser.user.name.lenght > 0"
              >{{currentUser.user.name}}</span>
              <span v-else>کاربر مهمان</span>
              <router-link :to="{ name: 'profile' }">نمایش پروفایل</router-link>
            </div>
          </div>
          <!-- end profile -->
          <ul class="list-group">
            <li>
              <router-link :to="{ name: 'home' }">
                <div>
                  <img src="@/assets/panel/img/icon/sidebar_home.svg" alt="home" width="20" />
                  <span>صفحه اصلی</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'musics'}">
                <div>
                  <img src="@/assets/panel/img/icon/sidebar_music.svg" alt="music" width="20" />
                  <span>موزیک ها</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'albums'}">
                <div>
                  <img src="@/assets/panel/img/icon/sidebar_album.svg" alt="album" width="20" />
                  <span>آلبوم ها</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'artists'}">
                <div>
                  <img src="@/assets/panel/img/icon/sidebar_artist.svg" alt="artist" width="20" />
                  <span>خوانندگان</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'videos'}">
                <div>
                  <img src="@/assets/panel/img/icon/sidebar_video.svg" alt="video" width="20" />
                  <span>موزیک ویدیو ها</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <hr class="ml-3" v-if="currentUser" />
        <div class="mt-4 aside-menu" v-if="currentUser">
          <ul class="list-group">
            <li>
              <router-link :to="{ name: 'likes' }">
                <div>
                  <img src="@/assets/panel/img/icon/sidebar_like.svg" alt="like" width="20" />
                  <span>لایک شده ها</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'bookmarks' }">
                <div>
                  <img src="@/assets/panel/img/icon/sidebar_bookmark.svg" alt="bookmark" width="20" />
                  <span>بوک مارک ها</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'contactus' }">
                <div>
                  <img src="@/assets/panel/img/icon/sidebar_support.svg" alt="support" width="20" />
                  <span>ارتباط با ما</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <hr class="ml-3" v-if="currentUser" />
        <div class="mt-4 mb-5 pb-5 aside-menu" v-if="currentUser && !isLoading">
          <span class="color-gray font-medium margin-r">پلی لیست ها</span>
          <ul class="list-group">
            <li v-for="(i, index) in playlists" :key="index">
              <router-link :to="{name:'playlist',params:{id:i.id}}">
                <div>
                  <img src="@/assets/panel/img/icon/sidebar_album.svg" alt="album" width="20" />
                  <span>{{i.title}}</span>
                </div>
              </router-link>
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
      playlists: [],
      isLoading: true
    };
  },
  methods: {
    getPlayLists() {
      get()
        .then(response => {
          this.playlists = response.data.data;
          this.isLoading = false;
        })
        .catch(err => {
          this.$notify({
            group: "notify",
            title: "مشکلی در ارتباط با سرور رخ داده است",
            type: "error"
          });
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
