<template>
  <main id="EnvironmentSelector">
    <v-speed-dial
      v-model="fab"
      direction="left"
      :open-on-hover="true"
      transition="slide-x-reverse-transition"
      right
      bottom
      fixed
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="black" dark fab small>
          <v-icon v-if="fab" color="yellow"> mdi-close </v-icon>
          <v-icon v-else color="yellow"> mdi-magnify </v-icon>
        </v-btn>
      </template>
      <v-btn outlined fab @click="zoom('+')">
        <v-icon large> mdi-magnify-plus-outline </v-icon>
      </v-btn>
      <v-btn outlined fab @click="zoom('-')">
        <v-icon large> mdi-magnify-minus-outline </v-icon>
      </v-btn>
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
  name: "Zoom",
  data: () => {
    return {
      fab: false,
    };
  },
  methods: {
    zoom(event) {
      this.$emit('zoom', event);
    }
  },
};
</script>