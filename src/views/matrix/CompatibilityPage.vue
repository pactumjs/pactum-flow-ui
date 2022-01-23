<template>
  <main>
    <v-container>
      <h5 class="text-h5">Compatibility Matrix</h5>
      <v-divider class="my-1"></v-divider>
      <v-row>
        <v-col>
          <v-select
            :items="projects"
            outlined
            dense
            label="Provider"
            color="black"
            @change="getProviderAnalysis"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="providerVersions"
            outlined
            dense
            label="ProviderVersion"
            color="black"
            @change="setProviderVersion"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="projects"
            outlined
            dense
            label="Consumer"
            color="black"
            @change="getConsumerAnalysis"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="consumerVersions"
            outlined
            dense
            label="ConsumerVersion"
            color="black"
            @change="setConsumerVersion"
          ></v-select>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="compatibilities"
        class="elevation-1"
        v-if="provider && consumer"
      >
        <template v-slot:[`item.providerVersion`]="{ item }">
          {{ item.providerVersion }}
          <span
            v-if="
              projectEnvs &&
              projectEnvs[item.provider] &&
              projectEnvs[item.provider][item.providerVersion]
            "
          >
            <v-chip
              class="mr-1"
              small
              v-for="env in projectEnvs[item.provider][item.providerVersion]"
              :key="env"
              >{{ env }}</v-chip
            >
          </span>
        </template>
        <template v-slot:[`item.consumerVersion`]="{ item }">
          {{ item.consumerVersion }}
          <span
            v-if="
              projectEnvs &&
              projectEnvs[item.consumer] &&
              projectEnvs[item.consumer][item.consumerVersion]
            "
          >
            <v-chip
              class="mr-1"
              small
              v-for="env in projectEnvs[item.consumer][item.consumerVersion]"
              :key="env"
              >{{ env }}</v-chip
            >
          </span>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <div v-if="item.status === 'PASSED'">
            <v-btn class="green--text" text icon>
              <v-icon dark> mdi-check-bold </v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-btn class="red--text" text icon @click="`${openDialog(item)}`">
              <v-icon dark> mdi-close-thick </v-icon>
            </v-btn>
          </div>
        </template>
        <template v-slot:[`item.verifiedAt`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ getRelativeDate(item.verifiedAt) }}
              </span>
            </template>
            <span>{{ new Date(item.verifiedAt) }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" width="1000" :retain-focus="false">
        <v-card>
          <v-card-title class="headline grey lighten-4">
            Compatibility Failures
          </v-card-title>
          <v-card-text>
            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon color="red">mdi-alert-circle-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content
                v-for="exception in selectedItem.exceptions"
                :key="exception._id"
              >
                <v-list-item-title>{{ exception.flow }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ exception.error }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </main>
</template>

<script>
import rd from "tiny-relative-date";

export default {
  name: "CompatibilityPage",
  data: () => {
    return {
      consumer: "",
      consumerVersion: "",
      provider: "",
      providerVersion: "",
      headers: [
        { text: "Provider", value: "provider" },
        { text: "Provider Version", value: "providerVersion" },
        { text: "Consumer", value: "consumer" },
        { text: "Consumer Version", value: "consumerVersion" },
        { text: "Status", value: "status" },
        { text: "Verified", value: "verifiedAt" },
      ],
      dialog: false,
      selectedItem: {},
    };
  },
  methods: {
    getProviderAnalysis(project) {
      this.provider = project;
      this.providerVersion = "";
      this.$store.dispatch("FETCH_ANALYSES_BY_PROJECT", project);
      this.getCompatibilityResults();
    },
    getConsumerAnalysis(project) {
      this.consumer = project;
      this.consumerVersion = "";
      this.$store.dispatch("FETCH_ANALYSES_BY_PROJECT", project);
      this.getCompatibilityResults();
    },
    setProviderVersion(version) {
      this.providerVersion = version;
      this.getCompatibilityResults();
    },
    setConsumerVersion(version) {
      this.consumerVersion = version;
      this.getCompatibilityResults();
    },
    getCompatibilityResults() {
      if (this.provider && this.consumer) {
        const query = {
          provider: this.provider,
          consumer: this.consumer,
        };
        if (this.providerVersion) query.providerVersion = this.providerVersion;
        if (this.consumerVersion) query.consumerVersion = this.consumerVersion;
        this.$store.dispatch("FETCH_COMPATIBILITIES", query);
      }
    },
    getRelativeDate(date) {
      return rd(date);
    },
    openDialog(item) {
      this.selectedItem = item;
      this.dialog = true;
    },
  },
  computed: {
    projects() {
      return this.$store.state.Projects.projects.map((project) => project._id);
    },
    consumerVersions() {
      if (this.consumer) {
        return this.$store.getters.getAnalysisByProject(this.consumer).map((analysis) => analysis.version);
      }
      return [];
    },
    providerVersions() {
      if (this.provider) {
         return this.$store.getters.getAnalysisByProject(this.provider).map((analysis) => analysis.version);
      }
      return [];
    },
    compatibilities() {
      return this.$store.getters.getCompatibilityResults({
        consumer: this.consumer,
        consumerVersion: this.consumerVersion,
        provider: this.provider,
        providerVersion: this.providerVersion
      }).sort((a, b) => new Date(b.verifiedAt) - new Date(a.verifiedAt));
    },
    projectEnvs() {
      const projectEnvs = {};
      const envs = this.$store.getters.getReleases();
      for (let i = 0; i < envs.length; i++) {
        const env = envs[i];
        if (!projectEnvs[env.projectId]) {
          projectEnvs[env.projectId] = {};
        }
        if (!projectEnvs[env.projectId][env.version]) {
          projectEnvs[env.projectId][env.version] = [];
        }
        projectEnvs[env.projectId][env.version].push(env.name);
      }
      return projectEnvs;
    },
  },
  created() {
    this.$store.dispatch("LOAD_MATRIX_PAGE_VIEW");
  },
};
</script>