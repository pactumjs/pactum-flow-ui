<template>
  <div>
    <v-card outlined router :to="`/projects/${$route.params.id}/${$route.params.version}/${loweCaseName}`">
      <v-card-title>
        <v-icon left>{{ metric.icon }}</v-icon>
        {{ metric.name }}
      </v-card-title>
      <div class="text-center text-h3">
        {{ metric.all }}
      </div>
      <v-card-text class="text-overline">
        <span>
          <span class="font-weight-bold blue--text text--darken-4">{{ metric.new }} </span>
          <span class="blue--text text--lighten-1"> NEW</span>
        </span>
        <span class="float-right">
           <span class="font-weight-bold red--text text--darken-4">{{ metric.removed }} </span>
           <span class="red--text text--lighten-1"> DEL</span>
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MetricCard',
  props: ["metric"],
  computed: {
    loweCaseName() {
      return this.metric.name.toLowerCase();
    }
  }
}
</script>