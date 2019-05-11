<template>
  <div id="app">
    <layout>
      <router-view/>
    </layout>
  </div>
</template>

<script>
import Layout from "@/layouts/Default.vue";
export default {
  components: {
    Layout
  },
  name: "app"
};
</script>
<style lang="sass">
@import './scss/general.scss'

</style>
