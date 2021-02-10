<template>
  <div>
    <v-container>
      <h5 class="text-h5">Compatability Matrix</h5>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-select
            :items="projects"
            outlined
            dense
            label="Project"
            @change="getCompatibilityResults"
          ></v-select>
        </v-col>
        <v-col></v-col>
        <v-col></v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="compatibilities"
        class="elevation-1"
        v-if="project"
      ></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MatrixPage",
  data: () => {
    return {
      project: '',
      headers: [
        { text: 'Provider', value: 'provider' },
        { text: 'Provider Version', value: 'providerVersion' },
        { text: 'Consumer', value: 'consumer' },
        { text: 'Consumer Version', value: 'consumerVersion' },
        { text: 'Status', value: 'status' }
      ]
    }
  },
  methods: {
    getCompatibilityResults(project) {
      this.project = project;
      this.$store.dispatch("FETCH_COMPATIBILITIES_BY_PROJECT", project);
    },
  },
  computed: {
    projects() {
      return this.$store.state.Projects.projects.map((project) => project._id);
    },
    compatibilities() {
      return this.$store.getters.getCompatibilityByProject(this.project);
    }
  },
  created() {
    this.$store.dispatch("LOAD_MATRIX_PAGE_VIEW");
  },
};
</script>