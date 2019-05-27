<template>
  <div class="table-responsive text-right small-music">
    <table class="table table-borderless custom-table">
      <tbody>
        <last-music-item :item="music"/>
        <br>
        <last-music-item :item="music"/>
        <br>
        <last-music-item :item="music"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import LastMusicItem from "./SmallMusicItem";
export default {
  components: {
    LastMusicItem
  },
  name: "components.home_last_musics",
  data() {
    return {
      music: {
        id: "1",
        title: "دوستت دارم",
        artist: {
          name: "مهدی احمدوند"
        },
        image:
          "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg",
        link128: "sasd"
      }
    };
  }
};
</script>

<style>
</style>
