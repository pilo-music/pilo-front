<template>
  <div class="container-fluid">
    <div class="single-video-box">
      <!-- Video Info -->
      <div class="row">
        <!-- playlist -->
        <div v-if="playlist.length > 0" class="col-lg-6">
          <div class="row">
            <div class="section-title col-12 pr-4">
              <h2 class="text-right">دیگر ویدیو ها</h2>
            </div>
          </div>
          <playlist type="video" :items="playlist" />
        </div>
        <div class="col-6">
          <div>
            <div class="single-video-info text-right margin-r margin-l">
              <span class="color-primary font-big">{{ video.title }}</span> _
              <span class="font-medium">{{ video.artist.name }}</span>
            </div>
          </div>
          <!-- Video -->
          <div class="margin-t">
            <vue-plyr>
              <video :poster="video.image" :src="video.url">
                <source
                  v-if="video.video720 != null"
                  :src="video.video720"
                  type="video/mp4"
                  size="720"
                />
                <source
                  type="video/mp4"
                  v-if="video.video1080 != null"
                  :src="video.video1080"
                  size="1080"
                />
              </video>
            </vue-plyr>
          </div>
          <!-- Controls -->
          <div class="margin-t">
            <ul class="list-inline video-control">
              <li class="list-inline-item">
                <like :post_id="video.id" post_type="video" :has_like="video.has_like" />
              </li>

              <li class="list-inline-item">
                <a :href="video.url">
                  <div>
                    <img
                      class="download"
                      src="@/assets/panel/img/icon/download-circle.svg"
                      alt="download"
                    />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import Video from "@/services/mixins/video";

export default {
  mixins: [Video],
  name: "pages.desktop.video"
};
</script>