<template>
  <v-app>
    <v-card width="400" class="mx-auto my-auto">
      <v-card-title class="justify-center pb-0">
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="login">
          <v-text-field v-model="username" label="Username" prepend-icon="mdi-account-circle" />
          <v-text-field v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn v-on:click="handleSubmit" color="black" class="yellow--text" >Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<style scoped>
.text-yellow input {
  color: yellow !important;
}
.primary--text {
  color: yellow !important;
}
</style>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: this.username,
      password: this.password,
      submitted: false,
      showPassword: false
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  created() {
    // const { username, password } = this;
    // reset login status
    // this.$store.dispatch("LOGIN", { username, password });
  },
  methods: {
    handleSubmit: function() {
      this.submitted = true;
      const { username, password } = this;
      console.log(username, password);
      if (username && password) {
        this.$store.dispatch("LOGIN", { username, password }).then(() => {
          this.$router.push("/projects")
        });
        return;
      }
      //# TODO: add invalid creds validation alert slider
      
    },
  },
};
</script>