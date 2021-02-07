<template>
  <div>
    <v-container>
      <h5 class="text-h5">Compatability Matrix</h5>
      <v-divider class="my-1"></v-divider>
      <v-row>
        <v-col>
          <v-select
            :items="projects"
            outlined
            dense
            label="Project"
            @change="getProjectAnalysis"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="versions"
            outlined
            dense
            label="Version"
            @change="getCompatibilityResults"
          ></v-select>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="compatibilities"
        class="elevation-1"
        v-if="project && version"
      >
        <template v-slot:[`item.status`]="{ item }">
          <div v-if="item.status === 'PASSED'">
            <v-btn disabled text icon>
              <v-icon dark> mdi-check-bold </v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-dialog v-model="dialog" width="1000">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="red--text" text icon v-bind="attrs" v-on="on">
                  <v-icon dark> mdi-close-thick </v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-4">
                  Compatability Failures
                </v-card-title>

                <v-card-text>
                  <v-list-item two-line>
                    <v-list-item-icon>
                      <v-icon color="red">mdi-alert-circle-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content
                      v-for="error in item.exceptions"
                      :key="error._id"
                    >
                      <v-list-item-title>{{ error.flow }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        error.error
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="dialog = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MatrixPage",
  data: () => {
    return {
      project: "",
      version: "",
      headers: [
        { text: "Provider", value: "provider" },
        { text: "Provider Version", value: "providerVersion" },
        { text: "Consumer", value: "consumer" },
        { text: "Consumer Version", value: "consumerVersion" },
        { text: "Status", value: "status" },
      ],
      dialog: false,
    };
  },
  methods: {
    getProjectAnalysis(project) {
      this.project = project;
      this.version = "";
      this.$store.dispatch("FETCH_ANALYSES_BY_PROJECT", project);
    },
    getCompatibilityResults(version) {
      this.version = version;
      this.$store.dispatch("FETCH_COMPATIBILITIES_BY_PROJECT_VERSION", {
        project: this.project,
        version,
      });
    },
  },
  computed: {
    projects() {
      return this.$store.state.Projects.projects.map((project) => project._id);
    },
    versions() {
      if (this.project) {
        const analyses = this.$store.getters.getAnalysisByProject(this.project);
        return analyses.map((analysis) => analysis.version);
      }
      return [];
    },
    compatibilities() {
      return this.$store.getters.getCompatibilityByProjectVersion(
        this.project,
        this.version
      );
    },
  },
  created() {
    this.$store.dispatch("LOAD_MATRIX_PAGE_VIEW");
  },
};
</script>