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
        const analysis = this.$store.getters.getAnalysisById(ids[ids.length - 1]);
        const analysisMetrics = this.$store.getters.getAnalysisMetricsById(ids[ids.length - 1]);
        const flowMetric = analysisMetrics.metrics.find(metric => metric.name === 'Flows');
        metrics.push({
          name: 'Flows',
          icon: 'mdi-arrow-decision-outline',
          total: analysis.flows.length,
          new: flowMetric.new.length,
          removed: flowMetric.removed.length
        });
        const interactionMetric = analysisMetrics.metrics.find(metric => metric.name === 'Interactions');
        metrics.push({
          name: 'Interactions',
          icon: 'mdi-swap-horizontal',
          total: analysis.interactions.length,
          new: interactionMetric.new.length,
          removed: interactionMetric.removed.length
        });
        const consumerMetric = analysisMetrics.metrics.find(metric => metric.name === 'Consumers');
        metrics.push({
          name: 'Consumers',
          icon: 'mdi-download-outline',
          total: analysis.consumers.length,
          new: consumerMetric.new.length,
          removed: consumerMetric.removed.length
        });
        const providerMetric = analysisMetrics.metrics.find(metric => metric.name === 'Providers');
        metrics.push({
          name: 'Providers',
          icon: 'mdi-upload-outline',
          total: analysis.providers.length,
          new: providerMetric.new.length,
          removed: providerMetric.removed.length
        });
      }
      return metrics;
    }
  }
};
</script>