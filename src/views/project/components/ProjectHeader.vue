<template>
  <div>
    <v-row>
      <v-col cols="6">
        <span class="text-h4">
          <v-icon color="black" left large>mdi-domain</v-icon>
          <span>{{ name }}</span>
        </span>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="3">
        <v-select
          :items="versions"
          label="Versions"
          outlined
          dense
          hide-details="true"
          @change="loadVersion"
          v-model="version"
        ></v-select>
      </v-col>
    </v-row>
    <v-divider class="mt-1 mb-1"></v-divider>
  </div>
</template>

<script>
export default {
  name: "ProjectHeader",
  props: ["name", "analyses"],
  data: function () {
    return {
      version: this.$route.params.version
    }
  },
  computed: {
    versions() {
      return this.analyses.map((analysis) => analysis.version);
    },
  },
  methods: {
    loadVersion(version) {
      this.$router.push({
        path: `/projects/${this.$route.params.id}/${version}`
      });
    }
  }
};
</script>