<template>
  <div class="table-responsive text-right">
    <table class="table table-borderless custom-table">
      <tbody>
        <tr>
          <td class="td-5">
            <a href="#">{{music.time}}</a>
          </td>
          <td>
            <a href="#">{{music.title}}</a>
          </td>
          <td>
            <a href="#">{{music.artist.name}}</a>
          </td>
          <td class="td-1">
            <img class="img-fluid rounded" :src="music.image" :alt="music.title">
            <a class="play-music">
              <div class="div-play">
                <i class="icon ion-md-play text-white icon-play"></i>
              </div>
            </a>
          </td>
        </tr>
        <tr>
          <td class="td-5">
            <a href="#">{{music.time}}</a>
          </td>
          <td>
            <a href="#">{{music.title}}</a>
          </td>
          <td>
            <a href="#">{{music.artist.name}}</a>
          </td>
          <td class="td-1">
            <img class="img-fluid rounded" :src="music.image" :alt="music.title">
            <a class="play-music">
              <div class="div-play">
                <i class="icon ion-md-play text-white icon-play"></i>
              </div>
            </a>
          </td>
        </tr>
        <tr>
          <td class="td-5">
            <a href="#">{{music.time}}</a>
          </td>
          <td>
            <a href="#">{{music.title}}</a>
          </td>
          <td>
            <a href="#">{{music.artist.name}}</a>
          </td>
          <td class="td-1">
            <img class="img-fluid rounded" :src="music.image" :alt="music.title">
            <a class="play-music">
              <div class="div-play">
                <i class="icon ion-md-play text-white icon-play"></i>
              </div>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "components.home_last_musics",
  data() {
    return {
      music: {
        id: "1",
        title: "test music",
        artist: { 
          name: "test artist"
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
