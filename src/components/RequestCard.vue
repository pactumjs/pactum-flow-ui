<template>
  <div>
    <v-card>
      <v-card-title> Request </v-card-title>
      <v-card-subtitle class="font-weight-bold">
        <span :class="`${request.method} text-overline font-weight-bold`">
          {{ request.method }}
        </span>
        {{ request.path }}
      </v-card-subtitle>
      <CodeExpansionPanel text="PATH PARAMS" :code="request.pathParams" />
      <CodeExpansionPanel text="QUERY PARAMS" :code="request.queryParams" />
      <CodeExpansionPanel text="HEADERS" :code="request.headers" />
      <CodeExpansionPanel text="BODY" :code="request.body" />
      <CodeExpansionPanel text="MATCHING RULES" :code="rules" />
    </v-card>
  </div>
</template>

<script>
import CodeExpansionPanel from "./CodeExpanasionPanel";

export default {
  name: "RequestCard",
  props: ["request"],
  components: {
    CodeExpansionPanel,
  },
  computed: {
    rules() {
      const _rules = this.request.matchingRules;
      return _rules ? JSON.parse(_rules) : _rules;
    }
  },
  data: () => ({
    show: false,
  }),
};
</script>

<style scoped>
span.GET {
  color: #2196f3;
}
span.POST {
  color: #4caf50;
}
span.DELETE {
  color: #f44336;
}
span.PUT {
  color: #ffab00;
}
span.PATCH {
  color: #f57f17;
}
</style>