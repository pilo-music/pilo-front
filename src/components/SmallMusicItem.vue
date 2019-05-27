<template>
  <tr class="uk-box-shadow-small">
    <td class="t-4">
      <img alt="music-play" class="music-play" src="@/assets/panel/img/icon/circle-play.svg">
    </td>
    <td class="pt-4">{{item.artist.name}}</td>
    <td class="pt-4 color-primary-dark">{{item.title}}</td>
    <td class="t-1">
      <img class="music-image" :src="item.image" :alt="item.title">
    </td>
  </tr>
</template>

<script>
export default {
  name: "components.small_music_item",
  props: ["item"]
};
</script>

<style>
</style>
