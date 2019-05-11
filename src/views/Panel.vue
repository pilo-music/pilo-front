<template>
  <div>
    <bottom-navigation/>
    <div id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="main col-md-8 col-lg-10 col-sm-12">
            <!-- Header -->
            <header/>
            <!-- end Header -->
            <!-- end Slider -->
            <div class="clearfix"></div>
            <!-- Content -->
            <slot></slot>
            <!-- End Content -->
            <sidebar/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/panel/Header.vue";
import Sidebar from "@/components/panel/Sidebar.vue";
import BottomNavigation from "@/components/panel/BottomNavigation.vue";

export default {
  components: {
    Header,
    Sidebar,
    BottomNavigation
  },
  name: "views.panel"
};
</script>

<style>
</style>
