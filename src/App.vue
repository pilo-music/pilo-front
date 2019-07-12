<template>
  <div>
    <component :is="layout">
      <router-view :layout.sync="layout" />
    </component>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      layout: `div`
    };
  }
};
</script>
<style lang="sass">
@import './scss/app.scss'
</style>
