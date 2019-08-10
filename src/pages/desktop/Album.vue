<template>
  <div class="container-fluid">
    <div class="row">
      <!-- play list -->
      <div class="col-6">
        <div class="row">
          <div class="section-title col-12 pr-4">
            <h2 class="text-right">پلی لیست شما</h2>
          </div>
        </div>
        <playlist class="p-0 playlist" :items="album.musics" v-on:play="play($event)" />
      </div>
      <div class="single-music-box-desktop col-6" v-if="!isLoading">
        <div class="album">
          <!-- album info -->
          <div class="album-info">
            <ul class="text-right">
              <li class="font-big">
                نام آلبوم :
                <span class="color-primary">{{ album.title }}</span>
              </li>
              <li class="font-medium">نام خواننده : {{ album.artist.name }}</li>
              <li class="font-medium">تعداد ترک : {{ album.musics.length }}</li>
            </ul>
            <hr />
            <!-- Actions -->
            <div class="album-actions">
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
          </div>
        </div>
        <!-- album image -->
        <div class="album-image">
          <img class="img-fluid" :src="album.image" :alt="album.title" />
        </div>
      </div>
    </div>
    <!-- TODO:add related albums here -->
    <!-- Custom Modal -->
    <custom-modal :show="showCustomModal" v-on:close="showCustomModal = false">
      <div class="modal-body" v-if="!isLoading">
        <div class="menu-item">
          <router-link
            :to="{
                name: 'artist',
                params: {
                  slug: album.artist.slug
                }
              }"
          >
            صفحه خواننده
            <img src="@/assets/panel/img/icon/profile.svg" alt="profile" />
          </router-link>
        </div>
        <div class="menu-item">
          بوک مارک
          <Bookmark
            :post_id="this.album.id"
            post_type="music"
            :has_bookmark="this.album.has_bookmark"
          />
        </div>
        <div @click="shareLink" class="menu-item">
          اشتراک گذاری
          <img src="@/assets/panel/img/icon/share.svg" alt="plus" />
        </div>
      </div>
    </custom-modal>
  </div>
</template>

<script>
import Music from "@/services/mixins/album";

export default {
  mixins: [Music],
  name: "pages.desktop.album",
  data() {
    return {
      showCustomModal: false
    };
  }
};
</script>