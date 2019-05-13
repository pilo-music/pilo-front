<template>
  <div>
    <bottom-navigation :current="currentTabComponentName" v-on:change="changeTab($event)"/>
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
            <keep-alive>
              <component v-bind:is="currentTabComponent"></component>
            </keep-alive>
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
import HomeScreen from "@/views/screens/HomeScreen";
import BrowserScreen from "@/views/screens/BrowserScreen";
import ProfileScreen from "@/views/screens/ProfileScreen";
import SearchScreen from "@/views/screens/SearchScreen";

export default {
  components: {
    Header,
    Sidebar,
    BottomNavigation
  },
  name: "views.panel",
  data() {
    return {
      currentTabComponent: HomeScreen,
      currentTabComponentName: "HomeScreen"
    };
  },
  methods: {
    changeTab(name) {
      switch (name) {
        case "HomeScreen":
          this.currentTabComponent = HomeScreen;
          break;
        case "BrowserScreen":
          this.currentTabComponent = BrowserScreen;
          break;
        case "ProfileScreen":
          this.currentTabComponent = ProfileScreen;
          break;
        case "SearchScreen":
          this.currentTabComponent = SearchScreen;
          break;
        default:
          this.currentTabComponent = HomeScreen;
          break;
      }
    }
  }
};
</script>

<style>
</style>
