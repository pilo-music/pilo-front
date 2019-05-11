<template>
  <div class="header-box uk-box-shadow-small">
    <div class="header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-7 col-sm-12 text-left d-none d-md-none d-sm-none d-lg-block">
            <ul class="list-inline">
              <li class="list-inline-item">
                <a href="https://www.instagram.com/taksoundmusic/">
                  <img width="20" src="@/assets/panel/img/icon/instagram.svg" alt="instagram">
                </a>
              </li>
              <li class="list-inline-item">
                <a href="http://t.me/taksound">
                  <img width="20" src="@/assets/panel/img/icon/telegram.svg" alt="telegram">
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">خوانندگان</a>
              </li>
              <li class="list-inline-item">
                <a href="#">آلبوم</a>
              </li>
              <li class="list-inline-item">
                <a href="#">موزیک ویدیو</a>
              </li>
              <li class="list-inline-item">
                <a href="#">موزیک</a>
              </li>
            </ul>
          </div>
          <!--search box-->
          <div class="col-md-12 col-sm-12 col-lg-5">
            <form
              class="navbar-form navbar-left input-s-lg m-t m-l-n-xs hidden-xs"
              role="search"
              action="#"
              method="get"
            >
              <div class="div-search row w-100">
                <div class="col-1">
                  <span uk-icon="search" class="color-primary"></span>
                </div>
                <div class="col-10">
                  <input
                    autocomplete="off"
                    name="name"
                    class="search-box font-small rtl"
                    type="search"
                    placeholder="جستجو موزیک ، خواننده  و..."
                  >
                </div>
                <div class="col-1">
                  <span uk-icon="microphone" class="color-primary"></span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "components.panel.header"
};
</script>

<style>
</style>
