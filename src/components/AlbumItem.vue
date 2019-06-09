<template>
  <div>
    <div class="item music-box">
      <router-link :to="{name:'music',params:{slug:'sd'}}">
        <div class="position-relative">
          <img width="300" height="300" :src="item.image" :alt="item.title">
          <div class="type-box position-absolute">ALBUM</div>
          <a class="play-music">
            <div class="music-play position-absolute">
              <img
                title="play"
                alt="play"
                src="@/assets/panel/img/icon/music-play-white.svg"
                class="text-white"
              >
            </div>
          </a>
        </div>
      </router-link>
      <div class="mt-2 text-center">
        <a
          class="music-title color-primary-dark d-block"
          :to="{name:'music',params:{slug:'sd'}}"
        >{{item.title}}</a>
        <router-link
          class="music-artist d-block"
          :to="{name:'artist',params:{slug:'sd'}}"
        >{{item.artist.name}}</router-link>
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

<style>
</style>
