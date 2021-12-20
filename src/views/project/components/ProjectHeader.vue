<template>
  <main>
    <v-row no-gutters>
      <v-col cols="10">
        <span class="text-h5">
          <v-icon color="black" left>mdi-domain</v-icon>
          <span class="mr-2">{{ name }}</span>
          <span v-for="gate in gates" :key="gate.environment">
            <v-chip
              v-if="gate.status === 'OK'"
              class="mr-1"
              color="green darken-2"
              text-color="white"
            >
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              {{ gate.environment }}
            </v-chip>
            <v-chip v-else class="mr-1" color="red darken-2" text-color="white">
              <v-avatar left>
                <v-icon>mdi-close-circle</v-icon>
              </v-avatar>
              {{ gate.environment }}
            </v-chip>
          </span>
        </span>
      </v-col>
      <v-col cols="2">
        <v-select
          :items="versions"
          label="Versions"
          outlined
          dense
          color="black"
          hide-details="true"
          @change="loadVersion"
          v-model="version"
        ></v-select>
      </v-col>
    </v-row>
    <v-divider class="mt-3 mb-1"></v-divider>
  </main>
</template>

<script>
export default {
  name: "ProjectHeader",
  props: ["name", "analyses"],
  data: function () {
    return {
      version: this.$route.params.version,
    };
  },
  computed: {
    versions() {
      return this.analyses.map((analysis) => analysis.version);
    },
    gates() {
      const res = this.$store.getters.getQualityGateByProjectVersion(
        this.$route.params.id,
        this.version
      );
      if (res) {
        return res.gates;
      }
      return [];
    },
  },
  methods: {
    loadVersion(version) {
      this.$router.push({
        path: `/projects/${this.$route.params.id}/${version}`,
      });
    },
  },
};
</script>