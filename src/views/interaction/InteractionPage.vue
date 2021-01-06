<template>
  <div>
    <v-container v-if="interaction && request && response">
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
</template>

<script>
import RequestCard from "../../components/RequestCard";
import ResponseCard from "../../components/ResponseCard";

export default {
  name: "InteractionPage",
  components: {
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