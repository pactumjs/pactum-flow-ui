<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg" min-height="30vh" class="grey lighten-3">
          </v-sheet>
        </v-col>
        <v-col cols="10">
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
      const _projects = [];
      const globalProjects = this.$store.state.projects.projects;
      for (let i = 0; i < globalProjects.length; i++) {
        const globalProject = globalProjects[i];
        const project = {};
        project._id = globalProject._id;
        project.name = globalProject.name;
        const ids = globalProject.analysis.main;
        project.versions = ids.length;
        let analysis;
        if (ids.length > 0) {
          analysis = this.$store.getters.getAnalysisById(ids[ids.length - 1]);
        }
        if (analysis) {
          project.flows = analysis.flows.length;
          project.consumers = analysis.consumers.length;
          project.providers = analysis.providers.length;
        } else {
          project.flows = "-";
          project.consumers = "-";
          project.providers = "-";
        }
        _projects.push(project);
      }
      return _projects;
    },
  },
  created() {
    this.$store.dispatch("LOAD_PROJECTS_DASHBOARD_PAGE");
  },
};
</script>
