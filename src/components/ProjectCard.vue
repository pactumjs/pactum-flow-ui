<template>
  <div>
    <v-card elevation="1">
      <v-card-title>{{ name }}</v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>Project Description</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: ["name"],
};
</script>
