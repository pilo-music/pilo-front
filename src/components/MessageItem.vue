<template>
  <div class="message-item">
    <div class="top">
      <span>{{ item.created_at }}</span>
      <p>{{ item.subject }}</p>
    </div>
    <div class="middle">
      <p>{{ item.text }}</p>
    </div>
    <div class="bottom">
      <span v-if="item.sender == 1" class="admin">ادمین</span>
      <span class="user" v-if="item.sender == 2">شما</span>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "components.message_item",
  props: ["item"]
};
</script>
