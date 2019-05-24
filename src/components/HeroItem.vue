<template>
  <div class="item hero-item">
    <a href="#">
      <img class="rounded" :src="item.image" :alt="item.title">
    </a>
  </div>
</template>

<script>
export default {
  props: ["item"],
  name: "components.hero_item"
};
</script>
