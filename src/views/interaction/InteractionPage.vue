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
          <v-divider vertical></v-divider>
          <v-col cols="2">
            <span class="text-caption">
              <v-icon small> mdi-upload-outline </v-icon>
              Provider
            </span>
             <br />
            <span class="text-subtitle-2">{{ interaction.provider }}</span>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="7">
            <span class="text-caption">
              <v-icon small> mdi-arrow-decision-outline </v-icon>
              Provider's Flow
            </span>
            <br />
            <span class="text-subtitle-2">{{ interaction.flow }}</span>
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
        <p class="text-h5 text-center font-weight-bold">{{ interaction.provider }}</p>
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
  name: "InteractionPage",
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
  },
  created() {
    this.$store.dispatch("LOAD_INTERACTION_PAGE_VIEW", this.$route.params.id);
  },
};
</script>