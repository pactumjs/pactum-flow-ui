<template>
  <div>
    <v-container>
      <div v-if="isProjectsLoading">
        <LoadingSpinner />
      </div>
      <div v-else>
        <v-row no-gutters>
          <v-col cols="3"></v-col>
          <v-col cols="9">
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
  data: () => {
    return {
      filter: "",
    };
  },
  components: {
    LoadingSpinner,
    ProjectCard,
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
