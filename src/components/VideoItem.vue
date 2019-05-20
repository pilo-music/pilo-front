<template>
  <div class="item position-relative video-box rounded uk-box-shadow-large">
    <a href="#">
      <img class="rounded" width="300" height="300" :src="video.image" :alt="video.title">
    </a>
    <div class="type-box position-absolute">MP4</div>
    <div class="video-info text-white text-right">
      <p>{{video.title}}</p>
    </div>
    <div class="play-icon">
      <img title="play" alt="play" src="#" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["video"],
  name: "components.video_item"
};
</script>

<style>
</style>
