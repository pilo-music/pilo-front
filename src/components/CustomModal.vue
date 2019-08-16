<template>
  <transition name="modal">
    <div :class="modalClass" @click="close" v-show="show">
      <div :class="containerClass" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { isMobile } from "mobile-device-detect";
export default {
  name: "components.custom_modal",
  props: ["show"],
  methods: {
    close: function() {
      this.$emit("close");
    }
  },
  mounted: function() {
    document.addEventListener("keydown", e => {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    });
  },
  computed: {
    modalClass() {
      if (isMobile) return "modal-mask";
      else return "modal-mask modal-mask-desktop";
    },
    containerClass() {
      if (isMobile) return "modal-container";
      else return "modal-container modal-container-desktop";
    }
  }
};
</script>
