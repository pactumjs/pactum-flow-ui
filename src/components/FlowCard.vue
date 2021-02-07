<template>
  <main v-if="flow && request && response">
    <RequestCard :request="request" />
    <ResponseCard :response="response" />
  </main>
</template>

<script>
import RequestCard from "./RequestCard";
import ResponseCard from "./ResponseCard";

export default {
  name: "FlowCard",
  props: ["flow"],
  components: {
    RequestCard,
    ResponseCard,
  },
  computed: {
    request() {
      return this.$store.getters.getRequestById(this.flow._id);
    },
    response() {
      return this.$store.getters.getResponseById(this.flow._id);
    },
  },
};
</script>