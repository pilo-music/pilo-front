<template>
  <div id="main" class="pb-5 mb-4">
    <div class="container-fluid">
      <div class="row">
        <div class="main col-md-8 col-lg-9 col-xl-10 col-sm-12">
          <Header />
          <div class="clearfix"></div>
          <sidebar />
          <main>
            <slot></slot>
          </main>
        </div>
      </div>
    </div>
    <bottom-navigation />
  </div>
</template>

<script>
import MusicPlayer from "@/components/MusicPlayer";
import Header from "@/components/panel/Header.vue";
import Sidebar from "@/components/panel/Sidebar.vue";
import BottomNavigation from "@/components/panel/BottomNavigation.vue";

export default {
  components: {
    MusicPlayer,
    Header,
    Sidebar,
    BottomNavigation
  },
  name: "layouts.default"
};
</script>

<style></style>
