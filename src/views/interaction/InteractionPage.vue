<template>
  <main>
    <div v-if="isInteractionLoading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <v-container v-if="interaction && request && response">
        <v-row>
          <v-col>
            <span>
              <v-icon left> mdi-swap-horizontal </v-icon>
              <span class="text-subtitle-1">{{ interaction.flow }}</span>
            </span>
            <br />
            <span class="ml-8">
              <span class="text-caption font-weight-bold">{{
                interaction.projectId
              }}</span>
              <span class="text-caption"> ( {{ analysis.version }} ) </span>
              <v-icon left> mdi-arrow-left-right </v-icon>
              <span class="text-caption font-weight-bold">{{
                interaction.provider
              }}</span>
              <span v-if="providerVersion">
                <span class="text-caption"> ( {{ providerVersion }} ) </span>
                <span v-if="error">
                  <v-icon right color="red"> mdi-close-thick </v-icon>
                  <br />
                  <span class="ml-8 red--text text-caption">{{ error }}</span>
                </span>
                <span v-else>
                  <v-icon right color="green"> mdi-check-bold </v-icon>
                </span>
              </span>
            </span>
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
          <router-link tag="span" :to="`/projects/${interaction.provider}`">
            {{ interaction.provider }}
          </router-link>
        </p>
        <v-row>
          <v-col>
            <v-timeline dense reverse class="mr-n8">
              <v-timeline-item icon="mdi-swap-horizontal" fill-dot>
              </v-timeline-item>
              <v-timeline-item icon="mdi-arrow-right">
                <RequestCard :request="request" />
              </v-timeline-item>
              <v-timeline-item icon="mdi-arrow-left">
                <ResponseCard :response="response" />
              </v-timeline-item>
            </v-timeline>
          </v-col>
          <v-col>
            <v-timeline
              dense
              v-if="flow && flowRequest && flowResponse"
              class="ml-n8"
            >
              <v-timeline-item
                icon="mdi-arrow-decision-outline"
                color="green"
                fill-dot
              >
              </v-timeline-item>
              <v-timeline-item icon="mdi-arrow-left" color="green">
                <RequestCard :request="flowRequest" />
              </v-timeline-item>
              <v-timeline-item icon="mdi-arrow-right" color="green">
                <ResponseCard :response="flowResponse" />
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
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

export default {
  name: "InteractionPage",
  data: () => {
    return {
      providerAnalysisId: "",
      providerVersion: "",
    };
  },
  components: {
    LoadingSpinner,
    RequestCard,
    ResponseCard,
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
    analysis() {
      return this.$store.getters.getAnalysisById(this.interaction.analysisId);
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
    flowRequest() {
      return this.$store.getters.getRequestById(this.flow._id);
    },
    flowResponse() {
      return this.$store.getters.getResponseById(this.flow._id);
    },
    error() {
      const cmp = this.$store.getters.getCompatibilityByConsumerProviderVersions(
        this.interaction.projectId,
        this.analysis.version,
        this.interaction.provider,
        this.providerVersion
      );
      if (cmp) {
        if (cmp.status === "PASSED") {
          return "";
        } else {
          const exception = cmp.exceptions.find(
            (exc) => exc.flow === this.interaction.flow
          );
          if (exception) {
            return exception.error;
          }
          return "";
        }
      } else {
        return "Compatibility Results Not Found";
      }
    },
  },
  methods: {
    async loadVersion(version) {
      this.providerVersion = version;
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