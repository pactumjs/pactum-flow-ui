<template>
  <div>
    <h1 class="h3">
      {{ name }}
    </h1>
    <v-divider class="mt-1 mb-1"></v-divider>
  </div>
</template>

<script>
export default {
  name: "ProjectHeader",
  props: ["name"],
};
</script>