<template>
  <div v-if="analysis">
    <v-card outlined>
      <v-row no-gutters>
        <v-col cols="12" sm="1">
          <v-card flat>
            <v-card-title>
              <v-icon color="indigo darken-2">mdi-domain</v-icon>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" class="pt-4">
          <span class="text-uppercase pointer indigo--text text--darken-4">
            <router-link :to="'/projects/' + project._id" tag="span">
              {{ project.name }}
            </router-link>
          </span>
          <v-row no-gutters class="mt-4 mb-2">
            <div></div>
            <v-col
              v-for="metric in metrics"
              :key="metric.name"
              cols="12"
              sm="3"
              class="mr-8 ml-n8"
            >
              <div class="text-center">
                <span class="text-h4 font-weight-bold">{{ metric.count }}</span>
                <br />
                <v-icon small class="mx-1">{{ metric.icon }}</v-icon>
                <span class="grey--text">{{ metric.name }}</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="3" class="mt-auto">
          <v-card flat>
            <v-card-subtitle>
              <span> Last Analysis </span>
              <br />
              <span class="text-caption font-weight-bold">{{ (new Date(analysis.createdAt)).toUTCString() }}</span>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
.pointer span:hover {
  text-decoration-line: underline;
}
</style>

<script>
export default {
  name: "ProjectCard",
  props: ["project"],
  computed: {
    analysis() {
      const aid = this.$store.getters.getProjectAnalysisIdByEnvironment(
        "latest",
        this.project._id
      );
      return this.$store.getters.getAnalysisById(aid);
    },
    metrics() {
      return [
        {
          name: "Flows",
          count: this.analysis.flows,
          icon: "mdi-arrow-decision-outline",
        },
        {
          name: "Consumers",
          count: this.analysis.consumers,
          icon: "mdi-download-outline",
        },
        {
          name: "Providers",
          count: this.analysis.providers,
          icon: "mdi-upload-outline",
        },
        {
          name: "Interactions",
          count: this.analysis.interactions,
          icon: "mdi-swap-horizontal",
        },
      ];
    },
  },
};
</script>
