<template>
  <main>
    <div v-if="isInteractionLoading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <v-container v-if="interaction && request && response">
        <span class="text-h6">
          <v-icon> mdi-swap-horizontal </v-icon>
          Interaction
        </span>
        <v-divider class="my-2"></v-divider>
        <v-row>
          <v-col cols="2">
            <span class="text-caption">
              <v-icon small> mdi-download-outline </v-icon>
              Consumer
            </span>
            <br />
            <span class="text-subtitle-2">{{ interaction.projectId }}</span>
          </v-col>
          <v-col cols="2">
            <span class="text-caption">
              <v-icon small> mdi-upload-outline </v-icon>
              Provider
            </span>
            <br />
            <span class="text-subtitle-2">{{ interaction.provider }}</span>
          </v-col>
          <v-col cols="6">
            <span class="text-caption">
              <v-icon small> mdi-arrow-decision-outline </v-icon>
              Provider's Flow
            </span>
            <br />
            <span class="text-subtitle-2">{{ interaction.flow }}</span>
          </v-col>
          <v-col cols="2">
            <v-select
              :items="versions"
              outlined
              dense
              label="Provider Version"
              hide-details="false"
              @change="loadVersion"
            ></v-select>
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
        <p class="text-h5 text-center font-weight-bold pointer">
          <router-link tag="span" :to="`/projects/${interaction.provider}`">{{ interaction.provider }}</router-link>
        </p>
        <v-timeline>
          <v-timeline-item left icon="mdi-arrow-right">
            <RequestCard :request="request" />
          </v-timeline-item>
          <v-timeline-item
            right
            icon="mdi-arrow-decision-outline"
            color="green"
          >
            <FlowCard :flow="flow" />
          </v-timeline-item>
          <v-timeline-item left icon="mdi-arrow-left">
            <ResponseCard :response="response" />
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </div>
  </main>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
.pointer span:hover {
  text-decoration-line: underline;
}
</style>

<script>
import LoadingSpinner from "../../components/LoadingSpinner";
import RequestCard from "../../components/RequestCard";
import ResponseCard from "../../components/ResponseCard";
import FlowCard from "../../components/FlowCard";

export default {
  name: "InteractionPage",
  data: () => {
    return {
      providerAnalysisId: "",
    };
  },
  components: {
    LoadingSpinner,
    RequestCard,
    ResponseCard,
    FlowCard,
  },
  computed: {
    isInteractionLoading() {
      return this.$store.state.InteractionPageView.loadingInteraction;
    },
    id() {
      return this.$route.params.id;
    },
    interaction() {
      return this.$store.getters.getInteractionById(this.id);
    },
    request() {
      return this.$store.getters.getRequestById(this.id);
    },
    response() {
      return this.$store.getters.getResponseById(this.id);
    },
    versions() {
      const provider = this.interaction.provider;
      const analyses = this.$store.getters.getAnalysisByProject(provider);
      return analyses.map((analysis) => analysis.version);
    },
    flow() {
      return this.$store.getters.getFlowByName(
        this.interaction.provider,
        this.providerAnalysisId,
        this.interaction.flow
      );
    },
  },
  methods: {
    async loadVersion(version) {
      const providerAnalysis = this.$store.getters.getAnalysisByProjectVersion(
        this.interaction.provider,
        version
      );
      await this.$store.dispatch(
        "FETCH_FLOWS_BY_ANALYSIS_ID",
        providerAnalysis._id
      );
      this.providerAnalysisId = providerAnalysis._id;
      if (this.flow) {
        this.$store.dispatch("FETCH_REQUEST_BY_ID", this.flow._id);
        this.$store.dispatch("FETCH_RESPONSE_BY_ID", this.flow._id);
      }
    },
  },
  created() {
    this.$store.dispatch("LOAD_INTERACTION_PAGE_VIEW", this.$route.params.id);
  },
};
</script>