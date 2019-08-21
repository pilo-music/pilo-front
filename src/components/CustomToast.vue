<template>
  <div :class="toastClass" id="custom_toast">{{message}}</div>
</template>

<script>
export default {
  name: "components.custom_toast",
  props: ["show", "message"],
  data() {
    return {
      toastClass: ""
    };
  },
  methods: {
    getClass() {
      if (this.show || this.show == true) {
        this.toastClass = "show";
        setTimeout(function() {
          this.toastClass = "";
        }, 3000);
      }
    },
  }
};
</script>

<style>
</style>