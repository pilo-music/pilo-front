<template>
  <div>
    <img @click="action" class="like" :src="hasLike ? header_src_on : header_src_off" alt="like">
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
      this.hasLike = !this.hasLike;
      var action = "";
      if (this.hasLike) action = "dislike";
      else action = "like";
      like(action, this.post_id, this.post_type)
        .then(response => {})
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.checkHasLike();
  }
};
</script>

<style>
</style>
