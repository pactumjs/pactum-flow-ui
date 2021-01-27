<template>
  <div>
    <div v-if="filter || (interactions && interactions.length > 0)">
      <v-form>
        <v-text-field
          prepend-icon="mdi-magnify"
          v-model="filter"
          dense
          clearable
          color="black"
          placeholder="Search"
        ></v-text-field>
      </v-form>
    </div>
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
  data: () => {
    return {
      filter: "",
    };
  },
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
      if (this.filter) {
        return items.filter((item) => {
          return (
            item.name.includes(this.filter) || item.info.includes(this.filter)
          );
        });
      } else {
        return items;
      }
    },
  },
};
</script>