<template>
  <div>
    <small-music-list/>
  </div>
</template>

<script>
import SmallMusicList from "./SmallMusicList";
export default {
  name: "components.playlist",
  props: ["item"],
  components: {
    SmallMusicList
  }
};
</script>

<style>
</style>
