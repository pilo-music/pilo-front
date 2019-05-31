<template>
  <div>
    <div id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="main col-md-8 col-lg-10 col-sm-12">
            <!-- Header -->
            <Header/>
            <!-- end Header -->
            <!-- end Slider -->
            <div class="clearfix"></div>
            <!-- Content -->
            <layout>
              <router-view/>
            </layout>
            <!-- End Content -->
            <sidebar/>
          </div>
        </div>
      </div>
    </div>
    <bottom-navigation/>
  </div>
</template>

<script>
import Layout from "@/layouts/Default.vue";

import Header from "@/components/panel/Header.vue";
import Sidebar from "@/components/panel/Sidebar.vue";
import BottomNavigation from "@/components/panel/BottomNavigation.vue";

export default {
  components: {
    Header,
    Sidebar,
    BottomNavigation,
    Layout
  },
  name: "views.panel"
};
</script>

<style lang="scss">
@import "../scss/panel.scss";
</style>
