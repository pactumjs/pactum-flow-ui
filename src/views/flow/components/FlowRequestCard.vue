<template>
  <div>
    <v-card>
      <v-card-title> Request </v-card-title>

      <v-card-subtitle class="font-weight-bold">
        <span :class="`${request.method} text-overline font-weight-bold`"> {{ request.method }} </span> {{ request.path }}
      </v-card-subtitle>

      <div v-if="request.body">
        <v-card-actions class="mt-n4">
          <v-btn color="orange darken-2" text> BODY </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <ExpansionPanel :show="show" :payload="request.body"/>
      </div>
    </v-card>
  </div>
</template>

<script>
import ExpansionPanel from './ExpansionPanel';

export default {
  name: "FlowRequestCard",
  props: ["request"],
  components: {
    ExpansionPanel
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