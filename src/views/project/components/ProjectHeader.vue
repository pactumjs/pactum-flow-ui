<template>
  <div>
    <span class="text-h4">
      <v-icon color="black" left large>mdi-domain</v-icon>
      <span >{{ name }}</span>
    </span>
    <v-divider class="mt-1 mb-1"></v-divider>
  </div>
</template>

<script>
export default {
  name: "ProjectHeader",
  props: ["name"],
};
</script>