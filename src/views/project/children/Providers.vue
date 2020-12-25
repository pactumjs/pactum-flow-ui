<template>
  <div>
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
</template>

<script>
export default {
  name: "ProjectProviders",
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