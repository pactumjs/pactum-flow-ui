<template>
  <div>
    <div v-if="providers && providers.length > 0">
      <v-list>
        <ListHeader text="Providers" icon="mdi-upload-outline"/>
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
import ListHeader from '../components/ListHeader';

export default {
  name: "ProjectProviders",
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
    providers() {
      const aid = this.analysis._id;
      const am = this.$store.getters.getAnalysisMetricsById(aid);
      return am.providers.all;
    },
  },
};
</script>