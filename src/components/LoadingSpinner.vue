<template>
  <div class="text-center">
    <v-progress-circular
      :size="100"
      :width="10"
      color="amber"
      indeterminate
      class="my-10"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>