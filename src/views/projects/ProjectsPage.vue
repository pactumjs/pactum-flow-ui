<template>
  <div>
    <v-container>
      <div v-if="isProjectsLoading">
        <LoadingSpinner />
      </div>
      <div v-else-if="projects.length === 0">
        <ResourceNotFound :message="'No Projects Found'">
          <p class="font-weight-bold">
            Once you analyze some projects, they will show up here.
          </p>
          <v-btn
            x-large
            href="https://pactumjs.github.io/#/contract-testing"
            target="_blank"
            outlined
            class="blue--text mt-2"
          >
            Get Started - Contract Testing
            <v-icon right dark> mdi-play </v-icon>
          </v-btn>
        </ResourceNotFound>
      </div>
      <div v-else>
        <v-row no-gutters>
          <v-col cols="1"></v-col>
          <v-col cols="4">
            <v-form>
              <v-text-field
                prepend-icon="mdi-magnify"
                v-model="filter"
                dense
                clearable
                color="black"
                label="Search"
                hide-details="true"
                class="mx-2"
              ></v-text-field>
            </v-form>
          </v-col>
          <v-col cols="3">
            <v-select
              :items="sort_options"
              label="Sort By"
              class="mx-2"
              dense
              @change="sortBy"
            ></v-select>
          </v-col>
          <v-col cols="1">
            <v-btn @click="changeSortOrder" icon tile>
              <v-icon dark> mdi-sort </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-chip class="float-right" color="orange darken-3" label outlined>
              {{ filtered_projects.length }} Projects
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1"> </v-col>
          <v-col cols="10">
            <ProjectCard
              v-for="project in filtered_projects"
              :key="project._id"
              :project="project"
              class="mb-2"
            />
          </v-col>
        </v-row>
      </div>
      <EnvironmentSelector />
    </v-container>
  </div>
</template>

<style>
.v-speed-dial {
  position: absolute;
}
.v-btn--floating {
  position: relative;
}
</style>

<script>
import LoadingSpinner from "../../components/LoadingSpinner";
import ResourceNotFound from "../../components/ResourceNotFound";
import ProjectCard from "./components/ProjectCard";
import EnvironmentSelector from "./components/EnvironmentSelector";

export default {
  name: "ProjectsPage",
  data: () => {
    return {
      filter: "",
      sort_options: ["Name", "Analysis Date", "Created Date"],
      sort_by: "Name",
      sort_order: true,
    };
  },
  components: {
    LoadingSpinner,
    ResourceNotFound,
    ProjectCard,
    EnvironmentSelector,
  },
  computed: {
    projects() {
      const all_projects = this.$store.state.Projects.projects;
      const current_env_project_ids = this.analyses.map(_analysis => _analysis.projectId);
      const current_env_projects = all_projects.filter(_project => current_env_project_ids.includes(_project._id));
      if (this.sort_by === "Name") {
        if (this.sort_order) {
          return current_env_projects.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          return current_env_projects.sort((a, b) => b.name.localeCompare(a.name));
        }
      } else if (this.sort_by === "Analysis Date") {
        for (let i = 0; i < current_env_projects.length; i++) {
          const analysis = this.analyses.find(
            (_analysis) => _analysis.projectId === current_env_projects[i]._id
          );
          if (analysis) {
            current_env_projects[i].analysisDate = analysis.createdAt;
          }
        }
        if (this.sort_order) {
          return current_env_projects.sort((a, b) => {
            return new Date(a.analysisDate) - new Date(b.analysisDate);
          });
        } else {
          return current_env_projects.sort((a, b) => {
            return new Date(b.analysisDate) - new Date(a.analysisDate);
          });
        }
      } else if (this.sort_by === "Created Date") {
        if (this.sort_order) {
          return current_env_projects.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          });
        } else {
          return current_env_projects.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
      }
      return current_env_projects;
    },
    filtered_projects() {
      if (this.filter) {
        return this.projects.filter((project) => {
          return (
            project._id.includes(this.filter) ||
            project.name.includes(this.filter)
          );
        });
      } else {
        return this.projects;
      }
    },
    isProjectsLoading() {
      return this.$store.state.ProjectsPageView.loadingProjects;
    },
    analyses() {
      const env_name = this.$store.getters.getSelectedEnvironment();
      const env_projects = this.$store.getters.getEnvironmentById(env_name);
      const analysis_ids = env_projects.map(_env => _env.analysisId);
      return this.$store.getters.getAnalysesByIds(analysis_ids);
    },
  },
  methods: {
    sortBy(value) {
      this.sort_by = value;
    },
    changeSortOrder() {
      this.sort_order = !this.sort_order;
    },
  },
  created() {
    this.$store.dispatch("LOAD_PROJECTS_PAGE_VIEW");
  },
};
</script>
