<template>
  <div @click="action">
    <img class="like" :src="hasLike ? header_src_on : header_src_off" alt="like" />
  </div>
</template>

<script>
import { like } from "@/services/api/like_api.js";
export default {
  props: ["post_id", "post_type", "has_like"],
  name: "components.like",
  data() {
    return {
      header_src_off: require("@/assets/panel/img/icon/heart.svg"),
      header_src_on: require("@/assets/panel/img/icon/heart-on.svg"),
      hasLike: false
    };
  },
  methods: {
    checkHasLike() {
      this.hasLike = this.has_like;
    },
    action() {
      if (!this.currentUser) {
        this.$router.push({
          name: "login"
        });
        return;
      }
      var action = "";
      if (this.hasLike) action = "remove";
      else action = "add";
      this.hasLike = !this.hasLike;

      like(action, this.post_id, this.post_type)
        .then(response => {})
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
    this.checkHasLike();
  }
};
</script>
