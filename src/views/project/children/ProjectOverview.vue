<template>
  <div>
    <v-row no-gutters>
      <v-col class="px-2" cols="12" sm="3" v-for="metric in metrics" :key="metric.name">
        <MetricCard :metric="metric" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MetricCard from '../components/MetricCard';

export default {
  name: "ProjectOverview",
  components: {
    MetricCard
  },
  computed: {
    project() {
      const projectId = this.$route.params.id;
      return this.$store.getters.getProjectById(projectId);
    },
    metrics() {
      let metrics = [];
      const aid = this.$store.getters.getProjectAnalysisIdByEnvironment('latest', this.project._id);
      const am = this.$store.getters.getAnalysisMetricsById(aid);
      if (aid && am) {
        metrics.push({
          name: 'Flows',
          icon: 'mdi-arrow-decision-outline',
          all: am.flows.all.length,
          new: am.flows.new.length,
          removed: am.flows.removed.length
        });
        metrics.push({
          name: 'Interactions',
          icon: 'mdi-swap-horizontal',
          all: am.interactions.all.length,
          new: am.interactions.new.length,
          removed: am.interactions.removed.length
        });
        metrics.push({
          name: 'Consumers',
          icon: 'mdi-download-outline',
          all: am.consumers.all.length,
          new: am.consumers.new.length,
          removed: am.consumers.removed.length
        });
        metrics.push({
          name: 'Providers',
          icon: 'mdi-upload-outline',
          all: am.providers.all.length,
          new: am.providers.new.length,
          removed: am.providers.removed.length
        });
      }
      return metrics;
    }
  }
};
</script>