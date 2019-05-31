<template>
  <div class="small-music">
    <item :item="music"/>
    <item :item="music"/>
    <item :item="music"/>
  </div>
</template>

<script>
import Item from "./SmallMusicItem";
export default {
  components: {
    Item
  },
  name: "components.small_music_list",
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
