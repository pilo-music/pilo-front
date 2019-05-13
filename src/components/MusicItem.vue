<template>
  <div>
    <div class="item music-box">
      <a href="route('panel.music',['slug'=>$music->slug])">
        <div class="position-relative">
          <img
            width="300"
            height="300"
            img="https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg"
            :key="music.image"
            :alt="music.title"
          >
          <div class="type-box position-absolute">MP3</div>
          <a
            class="play-music"
            :data-location="music.link128"
            :data-name="music.title"
            :data-artist="music.artist.name"
            :data-image="music.image"
          >
            <div class="music-play position-absolute">
              <i class="icon ion-md-play text-white"></i>
            </div>
          </a>
        </div>
      </a>
      <div class="mt-2 text-center">
        <a class="music-title d-block" href="route('panel.music',['slug'=>$music->slug])">title</a>
        <a
          class="music-artist d-block"
          href="route('panel.artist',['slug'=>$music->artist->slug])"
        >name</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "components.music_item",
  props: ["music"]
};
</script>

<style>
</style>
