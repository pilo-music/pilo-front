<template>
  <div class="header-box uk-box-shadow-small d-none d-md-none d-sm-none d-lg-block">
    <div class="header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-7 col-sm-12 text-left">
            <ul class="list-inline">
              <!-- <li class="list-inline-item">
                <a href="https://www.instagram.com/taksoundmusic/">
                  <img
                    width="20"
                    src="@/assets/panel/img/icon/instagram.svg"
                    alt="instagram"
                  />
                </a>
              </li>
              <li class="list-inline-item">
                <a href="http://t.me/taksound">
                  <img
                    width="20"
                    src="@/assets/panel/img/icon/telegram.svg"
                    alt="telegram"
                  />
                </a>
              </li>-->
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
                <div>
                  <svg
                    class="icon color-gray icon-search"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.7 20.3l-3.7-3.7c1.2-1.5 2-3.5 2-5.6 0-5-4-9-9-9s-9 4-9 9c0 5 4 9 9 9 2.1 0 4.1-0.7 5.6-2l3.7 3.7c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4zM4 11c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-0.8 3.7-2 4.9 0 0 0 0 0 0s0 0 0 0c-1.3 1.3-3 2-4.9 2-4 0.1-7.1-3-7.1-6.9z"
                    />
                  </svg>
                </div>
                <div class="flex-2">
                  <input
                    autocomplete="off"
                    name="name"
                    class="search-box rtl"
                    type="search"
                    placeholder="جستجو موزیک ، خواننده  و..."
                  />
                </div>
                <div class="mic">
                  <img width="15" src="@/assets/panel/img/icon/recording.svg" alt="recording" />
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

<style></style>
