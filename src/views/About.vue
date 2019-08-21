<template>
  <layout name="Simple">
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </layout>
</template>
<script>
import Layout from "@/layouts/Layout";

export default {
  components: {
    Layout
  },
  head: {
    title: function() {
      return {
        inner: "درباره ما"
      };
    }
  }
};
</script>

<style></style>
