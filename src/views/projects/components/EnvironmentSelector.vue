<template>
  <main id="EnvironmentSelector">
    <v-speed-dial
      v-model="fab"
      direction="left"
      :open-on-hover="false"
      transition="slide-x-reverse-transition"
      right
      bottom
      fixed
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="black" dark fab small>
          <v-icon v-if="fab" color="yellow"> mdi-close </v-icon>
          <v-icon v-else color="yellow"> mdi-all-inclusive </v-icon>
        </v-btn>
      </template>
      <div v-for="environment in environments" :key="environment">
        <v-btn v-if="environment === selected" small color="yellow accent-4"> {{ environment }} </v-btn>
        <v-btn v-else small color="grey lighten-5" @click="changeEnvironment(environment)"> {{ environment }} </v-btn>
      </div>
    </v-speed-dial>
  </main>
</template>

<style scoped>
.v-speed-dial {
  position: fixed;
}
</style>

<script>
export default {
  name: "EnvironmentSelector",
  data: () => {
    return {
      fab: false,
    };
  },
  computed: {
    selected() {
      return this.$store.getters.getSelectedEnvironment();
    },
    environments() {
      const envs = this.$store.getters.getReleases();
      return Array.from(new Set(envs.map(_env => _env.name)));
    },
  },
  methods: {
    changeEnvironment(env) {
      this.$store.dispatch('CHANGE_ENVIRONMENT', env);
    }
  }
};
</script>