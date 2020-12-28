<template>
  <div>
    <div v-if="interactions && interactions.length > 0">
      <v-list>
        <v-subheader>Interactions</v-subheader>
        <v-divider></v-divider>
        <v-list-item v-for="interaction in interactions" :key="interaction">
          <v-list-item-content>
            <v-list-item-title>{{ interaction.flow }}</v-list-item-title>
            <v-list-item-subtitle>{{
              interaction.provider
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div v-else>
      <NoItems message="No Interactions"></NoItems>
    </div>
  </div>
</template>

<script>
import NoItems from "../components/NoItems";

export default {
  name: "ProjectInteractions",
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
    interactions() {
      return this.$store.getters.getInteractionsByIds(
        this.analysis.interactions
      );
    },
  },
};
</script>