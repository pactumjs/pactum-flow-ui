<template>
  <div>
    <div v-if="providers && providers.length > 0">
      <v-list>
        <v-subheader>Providers</v-subheader>
        <v-divider></v-divider>
        <v-list-item
          v-for="provider in providers"
          :key="provider"
          router
          :to="`/projects/${provider}`"
        >
          <v-list-item-content>
            <v-list-item-title>{{ provider }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div v-else>
      <NoItems message="No Providers"></NoItems>
    </div>
  </div>
</template>

<script>
import NoItems from "../components/NoItems";

export default {
  name: "ProjectProviders",
  components: {
    NoItems,
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
    providers() {
      return this.analysis.providers;
    },
  },
};
</script>