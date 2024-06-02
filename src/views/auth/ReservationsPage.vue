<template>
  <div>Reservations</div>
</template>

<script>
export default {
  name: "ReservationsPage",
  beforeMount() {
    if (!sessionStorage.getItem("token")) this.$router.push("/login");
  },
};
</script>
