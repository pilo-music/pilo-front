<template>
  <layout name="Simple">
    <div class="moving-zone">
      <div class="popup">
        <div class="popup-content">
          <div class="popup-text">
            <b>404</b> error. <br />Page <b>NOT</b> Found !
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from "@/layouts/Layout";
export default {
  name: "views.errors.404",
  components: {
    Layout
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Dosis:500);
html,
body {
  height: 100%;
}
body {
  margin: 0;
  background: radial-gradient(#666, #222);
  overflow: hidden;
}

.moving-zone {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 120px;
  margin: -60px 0 0 -150px;
  perspective: 800px;
}
.popup {
  position: absolute;
  width: 300px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 20px 0 20px 0;
  cursor: pointer;
  transform-style: preserve-3d;
  background: -webkit-linear-gradient(top left, white 50%, #008a67 50%);
  background: -moz-linear-gradient(top left, white 50%, #008a67 50%);
  background: -ms-linear-gradient(top left, white 50%, #008a67 50%);
  background: -o-linear-gradient(top left, white 50%, #008a67 50%);
  background: linear-gradient(top left, white 50%, #008a67 50%);
}
.popup:before {
  content: "";
  position: absolute;
  left: 5%;
  top: 5%;
  width: 90%;
  height: 90%;
  border-radius: inherit;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 40px 20px rgba(0, 0, 0, 0.1);
  transform: translateZ(-100px);
}
.popup-content {
  background: #444;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px 0 10px 0;
}
.popup-text {
  color: white;
  font-family: "Dosis", sans-serif;
  font-size: 20px;
  line-height: 30px;
  font-weight: 100;
  text-align: center;
  transform: translateZ(15px);
}
.popup-text b {
  color: coral;
  font-weight: 300;
}
</style>
