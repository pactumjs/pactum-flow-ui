<template>
  <v-app>
    <v-card width="800" class="mx-auto my-auto">
      <v-card-title class="justify-center pb-0">
        <h2>Logout</h2>
      </v-card-title>
      <br />
      <v-card-text class="text-center">
        Thank you for using PactumJS !
        <br />
        <v-btn color="yellow" :to="'/login'" text>
          Click here to Login again!
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-center">
        <v-btn color="black" class="yellow--text overline" :to="'/'" text>
          Home
        </v-btn>
        <v-btn
          color="black"
          class="yellow--text overline"
          href="https://github.com/pactumjs/pactum"
          text
        >
          GitHub
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "LogoutPage",
  data() {
    return {};
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  }
};
</script>