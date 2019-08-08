<template>
  <div class="container-fluid">
    <div class="single-album-box">
      <!-- header -->
      <b-navbar :sticky="true" style="margin-bottom: 0px;">
        <div class="music-header full">
          <div>
            <img
              @click="$router.go(-1)"
              src="@/assets/panel/img/icon/left-arrow.svg"
              alt="back-to-prev-page"
            />
          </div>
          <div>
            <span v-if="!isLoading">{{ album.title }}</span>
          </div>
          <!-- TODO: add more detail -->
          <!-- <div>
                <img src="@/assets/panel/img/icon/ellipsis.svg" alt="back-to-prev-page">
          </div>-->
        </div>
      </b-navbar>
      <!-- body -->
      <div class="row margin-t">
        <!-- Image -->
        <div class="album-top">
          <img :src="album.image" :alt="album.title" />
          <div class="album-bot">
            <!-- Controls -->
            <div class="album-control">
              <like :post_id="album.id" :post_type="album" :has_like="album.has_like" />
              <div>
                <img
                  @click="shuffle"
                  class="shuffle"
                  src="@/assets/panel/img/icon/shuffle_circle.svg"
                  alt="shuffle"
                />
              </div>
              <div @click="play">
                <img class="play" src="@/assets/panel/img/icon/main-play.svg" alt="play" />
              </div>
            </div>
            <!-- album info -->
            <div class="container-fluid">
              <div class="row">
                <div class="col-3 padding-l">
                  <span class="font-medium">قطعه {{ album.musics.length }}</span>
                </div>

                <div class="col-8 p-0">
                  <div class="single-album-info text-right">
                    <span class="color-primary font-big">
                      {{
                      album.title
                      }}
                    </span>
                    _
                    <span class="font-medium">{{ album.artist.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Playlist -->
            <div class="margin">
              <playlist :items="album.musics" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Album from "@/services/mixins/album";
export default {
  name: "pages.mobile.album",
  mixins: [Album]
};
</script>

<style>
</style>
