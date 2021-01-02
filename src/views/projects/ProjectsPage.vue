<template>
  <div>
    <v-container>
      <div v-if="isProjectsLoading">
        <LoadingSpinner />
      </div>
      <div v-else>
        <v-row>
          <v-col cols="3">
            <v-card dark outlined>
              <v-card-title>Filters</v-card-title>
              <v-card-text> Coming Soon . . . </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="9">
            <ProjectCard
              v-for="project in projects"
              :key="project._id"
              :project="project"
              class="mb-2"
            />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import LoadingSpinner from "../../components/LoadingSpinner";
import ProjectCard from "./components/ProjectCard";

export default {
  name: "ProjectsPage",
  components: {
    LoadingSpinner,
    ProjectCard,
  },
  computed: {
    projects() {
      return this.$store.state.Projects.projects;
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
