<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card dark outlined>
            <v-card-title>Filters</v-card-title>
            <v-card-text>
              Coming Soon . . .
            </v-card-text>
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
    </v-container>
  </div>
</template>

<script>
import ProjectCard from "./components/ProjectCard";
export default {
  name: "Projects",
  components: {
    ProjectCard,
  },
  computed: {
    projects() {
      return this.$store.state.ProjectsView.projectMetrics;
    },
  },
  created() {
    this.$store.dispatch("LOAD_PROJECTS_VIEW_PAGE");
  },
};
</script>
