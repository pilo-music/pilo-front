<template>
  <div>
    <div class="item music-box">
      <router-link
        :to="{
          name: 'album',
          params: {
            slug: item.slug
          }
        }"
      >
        <div class="position-relative">
          <img class="img-fluid" :src="item.image" :alt="item.title" />
          <div class="type-box position-absolute">ALBUM</div>
          <a class="play-music">
            <div class="music-play position-absolute">
              <img
                title="play"
                alt="play"
                src="@/assets/panel/img/icon/music-play-white.svg"
                class="text-white"
              />
            </div>
          </a>
        </div>
      </router-link>
      <div class="mt-2 text-center">
        <span class="music-title color-primary-dark d-block">{{
          item.title
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "components.album_item",
  props: ["item"]
};
</script>
