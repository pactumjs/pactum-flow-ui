<template>
  <div>
    <v-card class="mb-2" outlined>
      <v-card-text class="font-weight-bold pt-1 pb-1">
        <v-icon small class="mr-1">mdi-arrow-decision-outline</v-icon>
        {{ flow.name }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pt-0 pb-0">
        <span :class="methodClass">
          {{ flow.request.method }}
        </span>
        <v-divider vertical class="ml-4"></v-divider>
        <span class="caption ml-2">{{ flow.request.path }}</span>
        <v-spacer></v-spacer>
        <v-divider vertical class="mr-4"></v-divider>
        <span class="overline float-right mr-4">
          {{ flow.response.statusCode }}
        </span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "FlowCard",
  props: ["flow"],
  computed: {
    methodClass: function() {
      const method = this.flow.request.method;
      return {
        'overline': true,
        'ml-2': true,
        'font-weight-bold': true,
        'blue--text': method === 'GET',
        'red--text': method === 'DELETE',
        'green--text': method === 'POST' || method === 'PATCH',
        'amber--text': method === 'PUT',
        'text--accent-4': method === 'PUT',
        'text--accent-1': method === 'PATCH'
      }
    }
  }
};
</script>