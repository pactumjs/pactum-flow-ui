<template>
  <div>
    <div v-if="flows && flows.length > 0">
      <v-list>
        <v-subheader>
          <v-icon small class="mr-2">mdi-arrow-decision-outline</v-icon>
          Flows
        </v-subheader>
        <v-divider></v-divider>
        <v-list-item v-for="flow in flows" :key="flow.name" router
          :to="`/flows/${flow.id}`">
          <v-list-item-action style="width: 40px">
            <v-list-item-action-text
              v-text="flow.method"
              :class="`${flow.method} font-weight-bold`"
            ></v-list-item-action-text>
            <v-list-item-action-text
              v-text="flow.code"
            ></v-list-item-action-text>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ flow.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ flow.endpoint }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div v-else>
      <NoItems message="No Flows"></NoItems>
    </div>
  </div>
</template>

<script>
import NoItems from '../components/NoItems';

export default {
  name: "ProjectFlows",
  components: {
    NoItems
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
    flows() {
      const _flows = [];
      const raws = this.$store.getters.getFlowsByAnalysisId(this.analysis._id);
      raws.forEach((raw) => {
        const items = raw.info.split("::");
        _flows.push({
          id: raw._id,
          name: raw.name,
          method: items[0],
          endpoint: items[1],
          code: items[2],
        });
      });
      return _flows;
    },
  },
};
</script>

<style scoped>
.v-list-item__action-text.GET {
  color: #2196f3;
}
.v-list-item__action-text.POST {
  color: #4caf50;
}
.v-list-item__action-text.DELETE {
  color: #f44336;
}
.v-list-item__action-text.PUT {
  color: #ffab00;
}
.v-list-item__action-text.PATCH {
  color: #f57f17;
}
</style>