<template>
  <div>
    <v-card outlined>
      <router-link :to="'/projects/' + project._id" tag="span">
        <v-card-title class="pointer pb-0 indigo--text text--darken-4">
          <v-icon color="indigo darken-2" class="mr-2">mdi-domain</v-icon>
          <span class="text-uppercase"> {{ project.name }} </span>
        </v-card-title>
      </router-link>
      <v-card-text class="pb-0 pt-1">
        <v-container>
          <v-row no-gutters>
            <v-col v-for="metric in metrics" :key="metric.name" cols="12" sm="2" class="mb-1 mr-1 text-center">
              <v-avatar
                  color="blue-grey"
                  size="32"
                  class="mb-1 mr-1 darken-4"
                >
                  <span class="white--text">{{ metric.count }}</span>
                </v-avatar>
                {{ metric.name }}
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
.pointer span:hover {
  text-decoration-line: underline;
}
</style>

<script>
export default {
  name: "ProjectCard",
  props: ["project"],
  computed: {
    metrics() {
      return [
        {
          name: "Flows",
          count: this.project.flows,
        },
        {
          name: "Consumers",
          count: this.project.consumers,
        },
        {
          name: "Providers",
          count: this.project.providers,
        },
      ];
    },
  },
};
</script>
