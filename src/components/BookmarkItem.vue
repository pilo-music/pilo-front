<template>
  <div>
    <div class="bookmark-item" @click="go(item)">
      <div class="bookmark-type">
        <div v-if="item.type =='music'" class="type-box position-absolute">MP3</div>
        <div v-else-if="item.type == 'album'" class="type-box position-absolute">ALBUM</div>
        <div v-else class="type-box position-absolute">MP4</div>
        <div>
          <span>{{item.created_at}}</span>
        </div>
      </div>
      <div class="bookmark-info">
        <p>{{item.title}}</p>
        <span>{{item.artist.name}}</span>
      </div>
      <div class="bookmark-image">
        <img class="img-fluid" :src="item.image" :alt="item.title" />
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  props: ["item"],
  name: "components.bookmark_item",
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