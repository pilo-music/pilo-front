<template>
  <div>
    <div class="item music-box">
      <router-link :to="{ name: 'playlist', params: { id: item.id } }">
        <div class="position-relative">
          <img class="img-fluid" :src="item.image" :alt="item.title" />
          <div class="type-box position-absolute">PLAYLIST</div>
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
        <router-link
          class="music-title color-primary-dark d-block"
          :to="{ name: 'playlist', params: { id : item.id } }"
        >{{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "components.playlist_item",
  props: ["item"]
};
</script>
