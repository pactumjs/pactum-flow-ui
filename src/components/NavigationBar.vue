<template>
  <v-app-bar dark app dense>
    <v-toolbar-title>
      <a class="pactum overline" href="/#/">
        <span class="overline yellow--text">pactum</span>
        <span class="overline yellow black--text pa-1">js</span>
      </a>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-if="!isAuthenticated"
        class="yellow--text overline"
        :to="'/login'"
        text
      >
        Log In
      </v-btn>
    </v-toolbar-items>
        <v-toolbar-items>
      <v-btn
        v-if="isAuthenticated"
        class="yellow--text overline"
        :to="'/projects'"
        text
      >
        Projects
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-menu v-if="isAuthenticated" bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn light color="yellow" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list color="black">
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="menuItems"
                >Pactum User</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="menuItems">Profile</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'/logout'">
            <v-list-item-title class="menuItems">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    <v-toolbar-items >
      <v-btn class="yellow--text overline" :to="'/matrix'" text> Matrix </v-btn>
      <v-btn class="yellow--text overline" :to="'/projects'" text> Projects </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css";

.pactum {
  text-decoration: none;
  color: #ffeb3b;
}

.menuItems {
  color: yellow;
}
</style>

<script>
export default {
  name: "NavigationBar",
  data: () => ({}),
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>