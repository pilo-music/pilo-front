<template>
  <div class="row justify-content-end">
    <div class="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-5">
      <div class="bookmark-item">
        <div class="bookmark-type">
          <div v-if="item.type == 'music'" class="type-box position-absolute">MP3</div>
          <div v-else-if="item.type == 'album'" class="type-box position-absolute">ALBUM</div>
          <div v-else class="type-box position-absolute">MP4</div>
          <div>
            <span>{{ item.created_at }}</span>
          </div>
        </div>
        <div class="margin-l">
          <bookmark :post_id="item.id" :post_type="item.type" :has_bookmark="true" />
        </div>
        <div class="bookmark-info" @click="go(item)">
          <p>{{ item.title }}</p>
          <span>{{ item.artist.name }}</span>
        </div>
        <div class="bookmark-image" @click="go(item)">
          <img class="img-fluid" :src="item.image" :alt="item.title" />
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import Bookmark from "@/components/Bookmark";
export default {
  props: ["item"],
  name: "components.bookmark_item",
  components: {
    Bookmark
  },
  methods: {
    go(item) {
      if (item.type == "music") {
        this.$router.push({
          name: "music",
          params: {
            slug: item.slug
          }
        });
      } else if (item.type == "album") {
        this.$router.push({
          name: "album",
          params: {
            slug: item.slug
          }
        });
      } else {
        this.$router.push({
          name: "video",
          params: {
            slug: item.slug
          }
        });
      }
    }
  }
};
</script>
