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
                placeholder="Search"
                hide-details="true"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1"> </v-col>
          <v-col cols="10">
            <ProjectCard
              v-for="project in projects"
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
      if (this.filter) {
        return this.$store.state.Projects.projects.filter((project) => {
          return (
            project._id.includes(this.filter) ||
            project.name.includes(this.filter)
          );
        });
      } else {
        return this.$store.state.Projects.projects;
      }
    },
    isProjectsLoading() {
      return this.$store.state.ProjectsPageView.loadingProjects;
    },
  },
  created() {
    this.$store.dispatch("LOAD_PROJECTS_PAGE_VIEW");
  },
};
</script>
