<template>
  <div>
    <v-container>
      <ProjectCard v-for="project in projects" :key="project._id" :name="project.name" class="mb-2" />
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
  data: function () {
    return {
      projects: [
        {
          _id: 'id1',
          name: '[IQA] component registry'
        },
        {
          _id: 'id2',
          name: '[SRE] head count'
        }
      ]
    }
  }
};
</script>
