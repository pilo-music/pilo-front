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
      <div class="play-icon">
        <div>
          <img title="play" alt="play" src="@/assets/panel/img/icon/circle-play.svg" />
        </div>
      </div>
    </div>
    <div class="video-info text-right padding-r">
      <span class="font-big color-primary">{{ video.title }}</span>
      <span class="separator">-</span>
      <span class="font-medium color-dark">{{ video.artist.name }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["video"],
  name: "components.video_item"
};
</script>
