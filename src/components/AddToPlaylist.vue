<template>
  <div>
    <div class="modal-header">
      <h3>افزودن به پلی لیست</h3>
      <img src="@/assets/panel/img/icon/plus.svg" alt="logo" width="20" height="20" />
    </div>
    <div class="modal-body">
      <div v-if="currentUser">
        <p>ایجاد پلی لیست</p>
        <form @submit="saveToPlaylist" class="form mt-3">
          <div class="form-group">
            <input
              placeholder="نام مورد نظر خود را وارد کنید"
              v-model="playlistName"
              type="text"
              class="form-control"
              id="name"
            />
          </div>
        </form>
        <hr />
        <div class="mt-3">
          <p>پلی لیست های شما</p>
          <select v-model="selectedPlaylist" class="form-control mt-3">
            <option v-for="i in playlists" :key="i.id" :value="i.title">
              {{
              i.title
              }}
            </option>
          </select>
        </div>
      </div>
      <div class="text-center" v-else>
        <router-link :to="{ name: 'login' }">لطفا وارد حساب کاربری خود شوید</router-link>
      </div>
    </div>
    <div class="text-center">
      <b-spinner v-show="isLoading" label="Small Spinning"></b-spinner>
    </div>
    <div class="mt-3 modal-footer text-right" v-if="currentUser">
      <button class="btn btn-success" @click="saveToPlaylist()">ذخیره</button>
      <button class="btn" @click="close">انصراف</button>
    </div>
    <b-toast
      id="add-to-playlist-toast"
      toaster="b-toaster-bottom-center"
      variant="success"
      solid
    >عملیات با موفقیت انجام شد</b-toast>
    <b-toast
      id="add-to-playlist-toast-error"
      toaster="b-toaster-bottom-center"
      variant="danger"
      solid
    >مشکلی در انجام عملیات رخ داده است</b-toast>
  </div>
</template>

<script>
import { get, add } from "@/services/api/playlist_api.js";
export default {
  props: ["post_id"],
  name: "components.add_to_playlist",
  data() {
    return {
      isLoading: false,
      playlists: [],
      playlistName: "",
      selectedPlaylist: ""
    };
  },
  methods: {
    getPlaylists() {
      get()
        .then(response => {
          this.playlists = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveToPlaylist() {
      //TODO: add Toast here
      var name = this.playlistName;
      if (this.selectedPlaylist != "") name = this.selectedPlaylist;
      add(name, this.post_id)
        .then(response => {
          if (response.data.data == "success") {
            this.$bvToast.show("add-to-playlist-toast");
          } else this.$bvToast.show("add-to-playlist-toast-error");
        })
        .catch(err => {
          this.$bvToast.show("add-to-playlist-toast-error");
        });
    },
    close: function() {
      this.$emit("close");
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  mounted() {
    if (this.currentUser) {
      setTimeout(() => {
        this.getPlaylists();
      }, 5000);
    }
  }
};
</script>
