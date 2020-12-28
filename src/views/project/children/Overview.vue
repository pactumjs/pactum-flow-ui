<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" sm="12">
        <v-row v-for="metric in metrics" :key="metric.name">
          <v-col cols="12" sm="4">
            <v-card outlined class="text-center">
              <v-card-title>
                <v-icon small left>{{ metric.icon }}</v-icon>
                {{ metric.total }}
                <span class="overline ml-4">{{ metric.name }}</span>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3">
            <v-card outlined class="text-center" color="yellow lighten-5">
              <v-card-title>
                <v-icon small left>{{ metric.icon }}</v-icon>
                {{ metric.new }}
                <span class="overline ml-4">new</span>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3">
            <v-card outlined class="text-center" color="red lighten-5">
              <v-card-title>
                <v-icon small left>{{ metric.icon }}</v-icon>
                {{ metric.removed }}
                <span class="overline ml-4">removed</span>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: "ProjectOverview",
  computed: {
    project() {
      const projectId = this.$route.params.id;
      return this.$store.getters.getProjectById(projectId);
    },
    metrics() {
      let metrics = [];
      const ids = this.project.analysis.main;
      if (ids.length > 0) {
        const flows = this.$store.getters.getFlowsByAnalysisId(ids[ids.length - 1]);
        const interactions = this.$store.getters.getInteractionsByAnalysisId(ids[ids.length - 1]);
        const am = this.$store.getters.getAnalysisMetricsById(ids[ids.length - 1]);
        metrics.push({
          name: 'Flows',
          icon: 'mdi-arrow-decision-outline',
          total: flows.length,
          new: am.flows.new.length,
          removed: am.flows.removed.length
        });
        metrics.push({
          name: 'Interactions',
          icon: 'mdi-swap-horizontal',
          total: interactions.length,
          new: am.interactions.new.length,
          removed: am.interactions.removed.length
        });
        metrics.push({
          name: 'Consumers',
          icon: 'mdi-download-outline',
          total: am.consumers.total.length,
          new: am.consumers.new.length,
          removed: am.consumers.removed.length
        });
        metrics.push({
          name: 'Providers',
          icon: 'mdi-upload-outline',
          total: am.providers.total.length,
          new: am.providers.new.length,
          removed: am.providers.removed.length
        });
      }
      return metrics;
    }
  }
};
</script>