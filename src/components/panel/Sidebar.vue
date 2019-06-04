<template>
  <div>
    <aside
      class="d-none d-sm-none d-md-block d-lg-block aside col-md-4 col-lg-2 uk-box-shadow-medium"
    >
      <div>
        <div class="aside-menu">
          <div class="sidebar-logo m-0">
            <router-link :to="{name:'home'}">
              <img
                class="logo"
                src="@/assets/panel/img/logo_with_text.png"
                alt="taksound"
                width="80"
              >
            </router-link>
          </div>

          <!-- profile -->
          <div class="text-center box-profile">
            <router-link :to="{name:'profile'}">
              <img
                class="rounded-circle uk-box-shadow-large"
                width="50"
                uk-img
                src="@/assets/panel/img/account.svg"
                alt="profile"
              >
            </router-link>
            <router-link
              :to="{name:'profile'}"
              class="btn btn-show-profile d-block mt-3"
            >کاربر مهمان</router-link>
          </div>
          <hr>
          <!-- end profile -->
          <ul class="list-group">
            <li class="aside-menu-active">
              <router-link :to="{name:'home'}">
                <i class="icon ion-md-compass"></i> صفحه اصلی
              </router-link>
            </li>
            <li>
              <router-link to="/musics">
                <i class="icon ion-md-headset"></i> موزیک ها
              </router-link>
            </li>
            <li>
              <router-link to="/videos">
                <i class="icon ion-ios-musical-notes"></i> آلبوم ها
              </router-link>
            </li>
            <li>
              <router-link to="/artists">
                <i class="icon ion-ios-stats"></i> خوانندگان
              </router-link>
            </li>
            <li>
              <router-link to="/videos">
                <i class="icon ion-ios-film"></i> موزیک ویدیو
              </router-link>
            </li>
          </ul>
        </div>
        <hr class="ml-3">
        <div class="mt-4 aside-menu">
          <ul class="list-group">
            <li>
              <a href="#">
                <i class="icon ion-md-heart-empty"></i> لایک ها
              </a>
            </li>
            <li>
              <a href="#">
                <i class="icon ion-md-list"></i> بعدا گوش میدهم
              </a>
            </li>
            <li>
              <a href="#">
                <i class="icon ion-ios-start"></i> مورد علاقه ها
              </a>
            </li>
            <li>
              <a href="#">
                <i class="icon ion-md-help-buoy"></i> پشتیبانی
              </a>
            </li>
          </ul>
        </div>
        <hr class="ml-3">
        <div class="mt-4 mb-5 pb-5 aside-menu">
          <ul class="list-group">
            <li>
              <a href="#">
                <i class="icon ion-md-heart-empty"></i>شاد مجلسی
              </a>
            </li>
            <li>
              <a href="#">
                <i class="icon ion-md-heart-empty"></i>شاد مجلسی
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "components.panel.sidebar"
};
</script>

<style>
</style>
