<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12">
        <FlowCard v-for="flow in flows" :key="flow.id" :flow="flow" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FlowCard from "../components/FlowCard";

export default {
  name: "ProjectFlows",
  components: {
    FlowCard
  },
  computed: {
    project() {
      const projectId = this.$route.params.id;
      return this.$store.getters.getProjectById(projectId);
    },
    analysis() {
      const ids = this.project.analysis.main;
      if (ids.length > 0) {
        return this.$store.getters.getAnalysisById(ids[ids.length - 1]);
      }
      return null;
    },
    flows() {
      return this.$store.getters.getFlowsByIds(this.analysis.flows);
    }
  }
}
</script>