<template>
  <div>
    <v-container>
      <ProjectCard
        v-for="project in projects"
        :key="project._id"
        :name="project.name"
        class="mb-2"
      />
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
