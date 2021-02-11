<template>
  <main>
    <div v-if="isFlowLoading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <v-container v-if="flow && request && response">
        <span>
          <v-icon left> mdi-arrow-decision-outline </v-icon>
          <span class="text-subtitle-1">{{ flow.name }}</span>
        </span>
        <br />
        <span class="ml-8">
          <span class="text-caption font-weight-bold">{{ flow.projectId }}</span>
          <span class="text-caption"> ( {{ analysis.version }} )</span>
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
          <v-timeline-item left icon="mdi-arrow-right" color="green">
            <RequestCard :request="request" />
          </v-timeline-item>
          <v-timeline-item left icon="mdi-arrow-left" color="green">
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
    analysis() {
      return this.$store.getters.getAnalysisById(this.flow.analysisId);
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