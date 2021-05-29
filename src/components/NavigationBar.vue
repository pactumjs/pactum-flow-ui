<template>
  <v-app-bar dark app dense>
    <a href="/#/">
      <img
        height="22"
        src="@/assets/logo-icon.svg"
        alt="logo"
        class="mr-2 mt-2"
      />
    </a>
    <v-toolbar-title>
      <a class="pactum" href="/#/">
        <span class="overline yellow--text">pactum</span>
        <span class="overline yellow black--text pa-1">js</span>
      </a>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="yellow--text overline" :to="'/matrix'" v-bind="attrs" v-on="on" text>
            Matrix
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(matrix, index) in matrices"
            :key="index"
            link
            :to="matrix.path"
          >
            <v-list-item-title>{{ matrix.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn class="yellow--text overline" :to="'/projects'" text>
        Projects
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<style scoped>
.pactum {
  text-decoration: none;
  color: #ffeb3b;
}
</style>

<script>
export default {
  name: "NavigationBar",
  data: () => ({
    matrices: [
      { title: "Compatibility", path: "/matrix/compatibility" },
      { title: "Network", path: "/matrix/network" },
    ],
  }),
};
</script>