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
    interactions() {
      const aid = this.$store.getters.getProjectAnalysisIdByEnvironment('latest', this.project._id);
      return this.$store.getters.getInteractionsByAnalysisId(aid);
    },
  },
};
</script>