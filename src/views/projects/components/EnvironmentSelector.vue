<template>
  <main id="EnvironmentSelector">
    <v-speed-dial
      v-model="fab"
      :top="false"
      :bottom="true"
      :right="true"
      :left="false"
      direction="left"
      :open-on-hover="false"
      transition="slide-x-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="yellow darken-2" dark fab small>
          <v-icon v-if="fab" color="black"> mdi-close </v-icon>
          <v-icon v-else color="black"> mdi-all-inclusive </v-icon>
        </v-btn>
      </template>
      <div v-for="environment in environments" :key="environment._id">
        <v-btn v-if="environment._id === selected" small color="yellow accent-4"> {{ environment._id }} </v-btn>
        <v-btn v-else small color="grey lighten-5" @click="changeEnvironment(environment._id)"> {{ environment._id }} </v-btn>
      </div>
    </v-speed-dial>
  </main>
</template>

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
      return this.$store.getters.getEnvironments();
    },
  },
  methods: {
    changeEnvironment(env) {
      this.$store.dispatch('CHANGE_ENVIRONMENT', env);
    }
  }
};
</script>