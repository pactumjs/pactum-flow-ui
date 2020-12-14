<template>
  <div class="mb-4">
    <v-card outlined tile>
      <v-card-text class="font-weight-bold text-body-1 pt-1 pb-1">
        <v-icon small class="mr-1">mdi-arrow-decision-outline</v-icon>
        {{ flow.name }}
      </v-card-text>
    </v-card>
    <v-row no-gutters>
      <v-col cols="12" sm="1">
        <v-card
          outlined
          tile
          dark
          :class="`${flow.request.method} text-center`"
        >
          <span class="text-caption font-weight-bold">
            {{ flow.request.method }}
          </span>
        </v-card>
      </v-col>
      <v-col cols="12" sm="10">
        <v-card outlined tile>
          <span class="pl-3 text-body-2">
            {{ flow.request.path }}
          </span>
        </v-card>
      </v-col>
      <v-col cols="12" sm="1">
        <v-card outlined tile class="text-center">
          <span>
            {{ flow.response.statusCode }}
          </span>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.v-card.GET {
  background-color: #2196f3;
}
.v-card.POST {
  background-color: #4caf50;
}
.v-card.DELETE {
  background-color: #f44336;
}
.v-card.PUT {
  background-color: #ffab00;
}
.v-card.PATCH {
  background-color: #f57f17;
}
</style>

<script>
export default {
  name: "FlowCard",
  props: ["flow"],
};
</script>