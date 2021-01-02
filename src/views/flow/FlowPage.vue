<template>
  <main>
    <div v-if="isFlowLoading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <v-container v-if="flow && request && response">
        <span class="text-h5">
          <v-icon> mdi-arrow-decision-outline </v-icon>
          {{ flow.name }}
        </span>
        <v-divider class="my-2"></v-divider>
        <p class="text-h5 text-center font-weight-bold">{{ flow.projectId }}</p>
        <v-timeline>
          <v-timeline-item left icon="mdi-arrow-right">
            <FlowRequestCard :request="request" />
          </v-timeline-item>
          <v-timeline-item left icon="mdi-arrow-left">
            <FlowResponseCard :response="response" />
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </div>
  </main>
</template>

<script>
import LoadingSpinner from "../../components/LoadingSpinner";
import FlowRequestCard from "./components/FlowRequestCard";
import FlowResponseCard from "./components/FlowResponseCard";

export default {
  name: "FlowPage",
  components: {
    LoadingSpinner,
    FlowRequestCard,
    FlowResponseCard,
  },
  computed: {
    isFlowLoading() {
      return this.$store.state.FlowPageView.loadingFlow;
    },
    id() {
      return this.$route.params.id;
    },
    flow() {
      return this.$store.getters.getFlowById(this.$route.params.id);
    },
    request() {
      return this.$store.getters.getRequestById(this.$route.params.id);
    },
    response() {
      return this.$store.getters.getResponseById(this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("LOAD_FLOW_PAGE_VIEW", this.$route.params.id);
  },
};
</script>