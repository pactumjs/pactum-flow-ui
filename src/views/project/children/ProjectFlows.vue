<template>
  <div>
    <div v-if="filter || (flows && flows.length > 0)">
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
    <div v-if="flows && flows.length > 0">
      <v-list>
        <ListHeader text="Flows" icon="mdi-arrow-decision-outline" />
        <v-divider></v-divider>
        <ListItems :items="flows" path="flows" />
      </v-list>
    </div>
    <div v-else>
      <NoItems message="No Flows"></NoItems>
    </div>
  </div>
</template>

<script>
import NoItems from "../components/NoItems";
import ListHeader from "../components/ListHeader";
import ListItems from "../components/ListItems";

export default {
  name: "ProjectFlows",
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
    flows() {
      const aid = this.$store.getters.getProjectAnalysisIdByEnvironment(
        "latest",
        this.project._id
      );
      if (this.filter) {
        return this.$store.getters.getFlowsByAnalysisId(aid).filter((flow) => {
          return (
            flow.name.includes(this.filter) || flow.info.includes(this.filter)
          );
        });
      } else {
        return this.$store.getters.getFlowsByAnalysisId(aid);
      }
    },
  },
};
</script>