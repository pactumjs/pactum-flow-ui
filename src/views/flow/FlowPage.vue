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
        <p
          class="text-h5 text-center font-weight-bold"
          v-on:click="navToFlows(flow.projectId)"
        >
          <v-icon> mdi-domain </v-icon>
          {{ flow.projectId }}
        </p>
        <v-timeline>
          <v-timeline-item left icon="mdi-arrow-right">
            <RequestCard :request="request" />
          </v-timeline-item>
          <v-timeline-item left icon="mdi-arrow-left">
            <ResponseCard :response="response" />
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </div>
  </main>
</template>

<script>
import LoadingSpinner from "../../components/LoadingSpinner";
import RequestCard from "../../components/RequestCard";
import ResponseCard from "../../components/ResponseCard";

export default {
  name: "FlowPage",
  components: {
    LoadingSpinner,
    RequestCard,
    ResponseCard,
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
  methods: {
    navToFlows: function (route) {
      this.$router.push(`/projects/${route}/flows`);
    },
  },
};
</script>