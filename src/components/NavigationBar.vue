<template>
  <v-app-bar dark app dense>
    <v-toolbar-title>
      <a class="pactum overline" href="/#/">
      <span class="overline yellow--text">pactum</span>
      <span class="overline yellow black--text pa-1">js</span>
      </a>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items >
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