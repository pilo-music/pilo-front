<template>
  <div class="table-responsive text-right small-music">
    <table class="table table-borderless custom-table">
      <tbody>
        <music-item :item="item"/>
        <br>
        <music-item :item="item"/>
        <br>
        <music-item :item="item"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import MusicItem from "./SmallMusicItem";
export default {
  name: "components.playlist",
  props: ["item"],
  components: {
    MusicItem
  }
};
</script>

<style>
</style>
