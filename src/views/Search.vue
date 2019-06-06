<template>
  <div class="search-page">
    <!-- search box -->
    <div class="row uk-box-shadow-small">
      <div class="search-box">
        <div class="flex-1 text-left">
          <img src="@/assets/panel/img/icon/recording.svg" alt="recording">
        </div>
        <div class="flex-10">
          <input
            @keydown="writing"
            v-model="text"
            type="search"
            placeholder="موزیک ، خواننده ، آلبوم و ...."
          >
        </div>
        <div class="flex-1 text-right" v-show="showClose">
          <img src="@/assets/panel/img/icon/close.svg" alt="close">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "views.search",
  data() {
    return {
      text: "",
      showClose: false
    };
  },
  methods: {
    writing() {
      if (this.text.length > 0) this.showClose = true;
      else this.showClose = false;
    }
  }
};
</script>

<style lang="scss">
@import "../scss/search.scss";
</style>
