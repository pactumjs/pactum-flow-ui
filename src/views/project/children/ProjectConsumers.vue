<template>
  <div>
    <div v-if="consumers && consumers.length > 0">
      <v-list>
        <v-subheader>Consumers</v-subheader>
        <v-divider></v-divider>
        <v-list-item
          v-for="consumer in consumers"
          :key="consumer"
          router
          :to="`/projects/${consumer}`"
        >
          <v-list-item-content>
            <v-list-item-title>{{ consumer }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div v-else>
      <NoItems message="No Consumers"></NoItems>
    </div>
  </div>
</template>

<script>
import NoItems from "../components/NoItems";

export default {
  name: "ProjectConsumers",
  components: {
    NoItems,
  },
  computed: {
    project() {
      const projectId = this.$route.params.id;
      return this.$store.getters.getProjectById(projectId);
    },
    consumers() {
      const aid = this.$store.getters.getProjectAnalysisIdByEnvironment('latest', this.project._id);
      const am = this.$store.getters.getAnalysisMetricsById(aid);
      return am.consumers.all;
    },
  },
};
</script>