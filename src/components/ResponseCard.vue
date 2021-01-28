<template>
  <div>
    <v-card>
      <v-card-title> Response </v-card-title>
      <v-card-subtitle>
        Status Code:
        <span class="font-weight-bold"> {{ response.statusCode }} </span>
      </v-card-subtitle>
      <CodeExpansionPanel text="HEADERS" :code="response.headers" />
      <CodeExpansionPanel text="BODY" :code="response.body" />
      <CodeExpansionPanel text="MATCHING RULES" :code="response.matchingRules" />
    </v-card>
  </div>
</template>

<script>
import CodeExpansionPanel from "./CodeExpanasionPanel";

export default {
  name: "ResponseCard",
  props: ["response"],
  components: {
    CodeExpansionPanel,
  },
  data: () => ({
    show: false,
  }),
};
</script>