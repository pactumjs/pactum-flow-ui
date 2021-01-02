<template>
  <div>
    <v-card>
      <v-card-title> Response </v-card-title>
      <v-card-subtitle>
        Status Code:
        <span class="font-weight-bold"> {{ response.statusCode }} </span>
      </v-card-subtitle>
      <CodeExpansionPanel text="HEADERS" :code="response.headers"/>
      <CodeExpansionPanel text="BODY" :code="response.body"/>
    </v-card>
  </div>
</template>

<script>
import CodeExpansionPanel from './CodeExpansionPanel';

export default {
  name: "FlowResponseCard",
  props: ["response"],
  components: {
    CodeExpansionPanel,
  },
  data: () => ({
    bodyShow: false,
    headersShow: false,
  }),
};
</script>