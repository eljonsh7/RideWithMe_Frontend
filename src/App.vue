<template class="h-full">
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@font-face {
  font-family: "SFPro";
  src: url("assets/fonts/regularSfPro.OTF") format("opentype");
}

* {
  font-family: "SFPro", "Franklin Gothic Book", serif;
  letter-spacing: 0.025em;
}
</style>
