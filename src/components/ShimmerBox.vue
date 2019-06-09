<template>
  <div class="shimmer-box">
    <div class="card-inner content-placeholder"></div>
    <div class="card-inner-2 content-placeholder"></div>
  </div>
</template>

<script>
export default {
  props: ["width", "height"],
  name: "components.shimmer_box"
};
</script>

<style lang="scss">
.card-inner {
  border-radius: 5px;
  height: 100px !important;
}

.card-inner-2 {
  border-radius: 5px;
  margin-top: 10px;
  width: 100% !important;
  height: 10px !important;
}

.content-placeholder {
  animation: linear 1s placeHolderShimmer infinite;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;

  width: 100%;
  height: 100%;
  -webkit-clip-path: url(#svgPath);
  clip-path: url(#svgPath);

  // 	Safari render fix
  transform: translateZ(0);
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

/* iPhone 6+ */
@media only screen and (max-width: 414px) {
  .card {
    width: 80%;
  }
}
</style>
