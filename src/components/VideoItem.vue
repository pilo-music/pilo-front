<template>
  <router-link :to="{ name: 'video', params: { slug: video.slug } }">
    <div class="item position-relative video-box rounded uk-box-shadow-large">
      <b-img-lazy
        blank-color="#f6f7f8"
        class="rounded img-fluid"
        :src="video.image"
        :alt="video.title"
      />
      <div class="type-box position-absolute">MP4</div>
      <div class="video-info text-white text-right padding-r">
        <span class="font-medium">{{ video.title }}</span> _
        <span class="font-medium">{{ video.artist.name }}</span>
      </div>
      <div class="play-icon">
        <div>
          <img title="play" alt="play" src="@/assets/panel/img/icon/circle-play.svg" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["video"],
  name: "components.video_item"
};
</script>
