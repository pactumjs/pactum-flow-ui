<template>
  <div>
    <div v-if="interactions && interactions.length > 0">
      <v-list>
        <ListHeader text="Interactions" icon="mdi-swap-horizontal"/>
        <v-divider></v-divider>
        <ListItems :items="interactions" path="interactions"/>
      </v-list>
    </div>
    <div v-else>
      <NoItems message="No Interactions"></NoItems>
    </div>
  </div>
</template>

<script>
import NoItems from "../components/NoItems";
import ListHeader from '../components/ListHeader';
import ListItems from '../components/ListItems';

export default {
  name: "ProjectInteractions",
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
    interactions() {
      const aid = this.$store.getters.getProjectAnalysisIdByEnvironment('latest', this.project._id);
      const items = this.$store.getters.getInteractionsByAnalysisId(aid);
      items.forEach(item => item.name = item.flow);
      return items;
    },
  },
};
</script>