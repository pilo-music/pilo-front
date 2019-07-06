<template>
  <div @click="action" style="display:initial">
    <img class="bookmark" :src="hasBookmark ? header_src_on : header_src_off" alt="bookmark" />
  </div>
</template>

<script>
import { bookmark } from "@/services/api/bookmark_api.js";
export default {
  props: ["post_id", "post_type", "has_bookmark"],
  name: "components.bookmark",
  data() {
    return {
      header_src_off: require("@/assets/panel/img/icon/bookmark-off.svg"),
      header_src_on: require("@/assets/panel/img/icon/bookmark-on.svg"),
      hasBookmark: false
    };
  },
  methods: {
    checkHasBookmark() {
      this.hasBookmark = this.has_bookmark;
    },
    action() {
      if (!this.currentUser) {
        this.$router.push({
          name: "login"
        });
        return;
      }
      var action = "";
      if (this.hasBookmark) action = "remove";
      else action = "add";
      this.hasBookmark = !this.hasBookmark;

      bookmark(action, this.post_id, this.post_type)
        .then(response => {})
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.checkHasBookmark();
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>

<style>
</style>
