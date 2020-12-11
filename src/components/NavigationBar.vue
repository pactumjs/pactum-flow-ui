<template>
  <v-app-bar dark app dense>
    <v-toolbar-title class="yellow--text">
      <a class="pactum overline" href="https://asaianudeep.github.io/pactum" target="_blank">pactum</a>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items >
      <v-btn class="yellow--text overline" :to="'/'" text> Home </v-btn>
      <v-btn class="yellow--text overline" :to="'/projects'" text> Projects </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<style scoped>
.pactum {
  text-decoration: none;
  color: #FFEB3B;
}
</style>

<script>
export default {
  name: "NavigationBar"
};
</script>