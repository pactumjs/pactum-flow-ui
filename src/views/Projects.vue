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
import ProjectCard from "../components/ProjectCard";
export default {
  name: "Projects",
  components: {
    ProjectCard,
  },
  computed: {
    projects() {
      return this.$store.state.projects.projects;
    },
  },
  created() {
    this.$store.dispatch("getProjects");
  },
};
</script>
