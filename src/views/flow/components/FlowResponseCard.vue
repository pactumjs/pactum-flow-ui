<template>
  <div>
    <v-card>
      <v-card-title> Response </v-card-title>
      <v-card-subtitle>
        Status Code:
        <span class="font-weight-bold"> {{ response.statusCode }} </span>
      </v-card-subtitle>
      <div v-if="response.headers">
        <v-card-actions class="mt-n4">
          <v-btn color="orange darken-2" text> HEADERS </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="headersShow = !headersShow">
            <v-icon>{{
              headersShow ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
        <ExpansionPanel :show="headersShow" :payload="response.headers" />
      </div>
      <div v-if="response.body">
        <v-card-actions class="mt-n4">
          <v-btn color="orange darken-2" text> BODY </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="bodyShow = !bodyShow">
            <v-icon>{{
              bodyShow ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
        <ExpansionPanel :show="bodyShow" :payload="response.body" />
      </div>
    </v-card>
  </div>
</template>

<script>
import ExpansionPanel from "./ExpansionPanel";

export default {
  name: "FlowResponseCard",
  props: ["response"],
  components: {
    ExpansionPanel,
  },
  data: () => ({
    bodyShow: false,
    headersShow: false,
  }),
};
</script>