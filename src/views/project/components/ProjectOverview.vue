<template>
  <div>
    <v-row>
      <v-col cols="12" sm="3" v-for="metric in metrics" :key="metric.name">
        <v-card outlined>
          <v-card-title>
            <v-icon small left>{{ metric.icon }}</v-icon>
            {{ metric.count }}
          </v-card-title>
          <v-card-subtitle class="text-uppercase overline">
            {{ metric.name }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ProjectOverview",
  props: ["project"],
  computed: {
    metrics: function () {
      const _metrics = [];
      const ids = this.project.analysis.main;
      let analysis;
      if (ids.length > 0) {
        analysis = this.$store.getters.getAnalysisById(ids[ids.length - 1]);
      }
      if (analysis) {
        _metrics.push({ name: "flows", count: analysis.flows.length, icon: 'mdi-arrow-decision-outline' });
        _metrics.push({ name: "consumers", count: analysis.consumers.length, icon: 'mdi-download-outline' });
        _metrics.push({ name: "providers", count: analysis.providers.length, icon: 'mdi-upload-outline' });
      } else {
        _metrics.push({ name: "flows", count: "-", icon: 'mdi-arrow-decision-outline' });
        _metrics.push({ name: "consumers", count: "-", icon: 'mdi-download-outline' });
        _metrics.push({ name: "providers", count: "-", icon: 'mdi-upload-outline' });
      }
      _metrics.push({ name: "versions", count: ids.length, icon: 'mdi-layers-triple-outline' });
      return _metrics;
    },
  },
};
</script>