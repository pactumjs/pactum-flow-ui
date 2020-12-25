<template>
  <div>
    <v-list>
      <v-subheader>Interactions</v-subheader>
      <v-divider></v-divider>
      <v-list-item
        v-for="interaction in interactions"
        :key="interaction"
      >
        <v-list-item-content>
          <v-list-item-title>{{ interaction.flow }}</v-list-item-title>
          <v-list-item-subtitle>{{ interaction.provider }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'ProjectInteractions',
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
    interactions() {
      return this.$store.getters.getInteractionsByIds(this.analysis.interactions);
    }
  }
}
</script>