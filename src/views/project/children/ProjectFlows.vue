<template>
  <div>
    <div v-if="flows && flows.length > 0">
      <v-list>
        <ListHeader text="Flows" icon="mdi-arrow-decision-outline"/>
        <v-divider></v-divider>
        <ListItems :items="flows" path="flows"/>
      </v-list>
    </div>
    <div v-else>
      <NoItems message="No Flows"></NoItems>
    </div>
  </div>
</template>

<script>
import NoItems from '../components/NoItems';
import ListHeader from '../components/ListHeader';
import ListItems from '../components/ListItems';

export default {
  name: "ProjectFlows",
  components: {
    NoItems,
    ListItems,
    ListHeader,
  },
  computed: {
    project() {
      const projectId = this.$route.params.id;
      return this.$store.getters.getProjectById(projectId);
    },
    flows() {
      const aid = this.$store.getters.getProjectAnalysisIdByEnvironment('latest', this.project._id);
      return this.$store.getters.getFlowsByAnalysisId(aid);
    },
  },
};
</script>