<template>
    <svg v-if="type=='star'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :fill="color" :stroke="strokeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
  <div class="flex relative" v-else-if="type=='half-star'">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      :fill="color"
      class="absolute top-0 left-0"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
    >
      <defs>
        <clipPath id="left-half-star">
          <rect x="0" y="0" width="12" height="24"></rect>
        </clipPath>
      </defs>
      <path
        d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z"
        clip-path="url(#left-half-star)"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      class="absolute top-0 left-0"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
    >
      <defs>
        <clipPath id="right-half-star">
          <rect x="12" y="0" width="12" height="24"></rect>
        </clipPath>
      </defs>
      <path
        d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z"
        clip-path="url(#right-half-star)"
      />
    </svg>
  </div>
  </template>
  
  <script>
  export default {
    name: "StarIcon",
    props: ["color","strokeColor","type"],
  };
  </script>
  