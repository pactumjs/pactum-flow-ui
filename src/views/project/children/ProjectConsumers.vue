<template>
  <div>
    <div v-if="consumers && consumers.length > 0">
      <v-list>
        <ListHeader text="Consumers" icon="mdi-download-outline"/>
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
import ListHeader from '../components/ListHeader';

export default {
  name: "ProjectConsumers",
  components: {
    NoItems,
    ListHeader,
  },
  computed: {
    analysis() {
      return this.$store.getters.getAnalysisByProjectVersion(
        this.$route.params.id,
        this.$route.params.version
      );
    },
    consumers() {
      const aid = this.analysis._id;
      const am = this.$store.getters.getAnalysisMetricsById(aid);
      return am.consumers.all;
    },
  },
};
</script>