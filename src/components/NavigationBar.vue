<template>
  <v-app-bar dark app dense>
    <v-toolbar-title>pactum</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn :to="'/'" text> Home </v-btn>
      <v-btn :to="'/projects'" text> Projects </v-btn>
      <v-btn :to="'/about'" text> About </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavigationBar"
};
</script>