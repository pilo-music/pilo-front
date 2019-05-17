<template>
  <div class="d-block d-md-block d-sm-block d-lg-none bottom-navigation">
    <nav class="nav nav--icons">
      <ul>
        <li>
          <a @click="change('HomeScreen')" :class="tabStyle('HomeScreen')">
            <svg class="icon icon-home" viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M21.6 8.2l-9-7c-0.4-0.3-0.9-0.3-1.2 0l-9 7c-0.3 0.2-0.4 0.5-0.4 0.8v11c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-11c0-0.3-0.1-0.6-0.4-0.8zM14 21h-4v-8h4v8zM20 20c0 0.6-0.4 1-1 1h-3v-9c0-0.6-0.4-1-1-1h-6c-0.6 0-1 0.4-1 1v9h-3c-0.6 0-1-0.4-1-1v-10.5l8-6.2 8 6.2v10.5z"
              ></path>
            </svg>
            <span>اکسپور</span>
          </a>
        </li>
        <li>
          <a @click="change('BrowserScreen')" :class="tabStyle('BrowserScreen')">
            <svg class="icon icon-news" viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M17 2h-10c-1.7 0-3 1.3-3 3v16c0 0.4 0.2 0.7 0.5 0.9s0.7 0.1 1-0.1l6.4-4.6 6.4 4.6c0.2 0.1 0.4 0.2 0.6 0.2s0.3 0 0.5-0.1c0.3-0.2 0.5-0.5 0.5-0.9v-16c0.1-1.7-1.2-3-2.9-3zM18 19.1l-5.4-3.9c-0.2-0.1-0.4-0.2-0.6-0.2s-0.4 0.1-0.6 0.2l-5.4 3.9v-14.1c0-0.6 0.4-1 1-1h10c0.6 0 1 0.4 1 1v14.1z"
              ></path>
            </svg>
            <span>News</span>
          </a>
        </li>
        <li>
          <a @click="change('SearchScreen')" :class="tabStyle('SearchScreen')">
            <svg class="icon icon-search" viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M21.7 20.3l-3.7-3.7c1.2-1.5 2-3.5 2-5.6 0-5-4-9-9-9s-9 4-9 9c0 5 4 9 9 9 2.1 0 4.1-0.7 5.6-2l3.7 3.7c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4zM4 11c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-0.8 3.7-2 4.9 0 0 0 0 0 0s0 0 0 0c-1.3 1.3-3 2-4.9 2-4 0.1-7.1-3-7.1-6.9z"
              ></path>
            </svg>
            <span>جستجو</span>
          </a>
        </li>
        <li>
          <a @click="change('ProfileScreen')" :class="tabStyle('ProfileScreen')">
            <svg class="icon icon-profile" viewBox="0 0 24 24" width="24" height="24">
              <g fill="currentColor">
                <path
                  d="M16 14h-8c-2.8 0-5 2.2-5 5v2c0 0.6 0.4 1 1 1s1-0.4 1-1v-2c0-1.7 1.3-3 3-3h8c1.7 0 3 1.3 3 3v2c0 0.6 0.4 1 1 1s1-0.4 1-1v-2c0-2.8-2.2-5-5-5z"
                ></path>
                <path
                  d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zM12 4c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z"
                ></path>
              </g>
            </svg>
            <span>پروفایل</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["current"],
  name: "components.panel.bottom_navigation",
  data() {
    return {
      pages: ["HomeScreen", "BrowserScreen", "ProfileScreen", "SearchScreen"],
      currentScreen: ""
    };
  },
  methods: {
    tabStyle(name) {
      if (name === this.currentScreen) return "is-active";
    },
    change(name) {
      this.currentScreen = name;
      this.$emit("change", name);
    }
  },
  created() {
    this.currentScreen = this.current;
    this.tabStyle(this.currentScreen);
  }
};
</script>

<style lang="scss">
</style>
