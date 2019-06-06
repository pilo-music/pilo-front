<template>
  <div class="profile-box">
    <!-- Top Box -->
    <div class="profile-top uk-box-shadow-small">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6 text-left margin-t padding-r">
            <img src="@/assets/panel/img/icon/alert.svg" alt>
          </div>
          <div class="col-6 text-right margin-t padding-l">
            <img src="@/assets/panel/img/icon/logout.svg" alt>
          </div>
        </div>
      </div>
      <div class="user-info">
        <div v-if="user.image.length > 0">
          <img :src="user.image" alt="user-image">
        </div>
        <div v-else>
          <img src="@/assets/panel/img/user.svg" alt="user-image">
        </div>
        <div>
          <span>{{user.email}}</span>
        </div>
      </div>
    </div>
    <!-- Bottom Box -->
    <div class="profile-bottom uk-box-shadow-small">
      <ul class="list-group">
        <li>
          ویرایش پروفایل
          <img src="@/assets/panel/img/icon/edit_black.svg" alt="edit">
        </li>
        <li>
          تاریخچه موزیک ها
          <img src="@/assets/panel/img/icon/time_black.svg" alt="time">
        </li>
        <li>
          لایک شده ها
          <img src="@/assets/panel/img/icon/heart_black.svg" alt="like">
        </li>
        <li>
          بوک مارک ها
          <img src="@/assets/panel/img/icon/bookmark_black.svg" alt="bookmark">
        </li>
        <li>
          تماس با پشتیبانی
          <img src="@/assets/panel/img/icon/support_black.svg" alt="support">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "views.profile",
  data() {
    return {
      user: {
        image: "",
        email: "mobin@gmail.com"
      }
    };
  }
};
</script>

<style lang="scss">
@import "../scss/profile.scss";
</style>
