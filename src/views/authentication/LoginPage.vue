<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      transition="slide-x-reverse-transition"
      color="red"
      absolute
      right
      rounded="pill"
      top
    >
      Invalid Credentials. Please try again!.
    </v-snackbar>
    <v-card width="400" class="mx-auto my-auto">
      <v-card-title class="justify-center pb-0">
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form v-model="isValid" class="login">
          <v-text-field
            v-model="username"
            :rules="userNameRules"
            label="Username"
            prepend-icon="mdi-account-circle"
            required
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
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
        <v-btn
          v-on:click="handleSubmit"
          color="black"
          :disabled="!isValid"
          class="yellow--text"
          >Login</v-btn
        >
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
      snackbar: false,
      timeout: 2000,
      username: this.username,
      password: this.password,
      submitted: false,
      showPassword: false,
      isValid: true,
      userNameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required!"],
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    handleSubmit: function () {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.$store
          .dispatch("LOGIN", { username, password })
          .then(() => {
            this.$router.push("/projects");
          })
          .catch((err) => {
            this.snackbar = true;
            console.log(err.message);
          });
      }
    },
  },
};
</script>