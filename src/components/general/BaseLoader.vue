<template>
  <div
    class="w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center fixed z-50"
  >
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "BaseLoader",
};
</script>

<style scoped>
.loader {
  width: 50px !important;
  padding: 8px !important;
  aspect-ratio: 1 !important;
  border-radius: 50% !important;
  background: black !important;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box !important;
  -webkit-mask: var(--_m) !important;
  mask: var(--_m) !important;
  -webkit-mask-composite: source-out !important;
  mask-composite: subtract !important;
  animation: l3 1s infinite linear !important;
}

@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
