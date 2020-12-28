<template>
  <div>
    <div v-if="project && analysis">
      <v-container>
        <ProjectHeader :name="project.name" />
      </v-container>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" sm="3">
            <ProjectSideNavigation />
          </v-col>
          <v-col cols="12" sm="9">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <v-container class="text-center my-10">
        <v-icon x-large>mdi-magnify-remove-outline</v-icon>
        <br>
        <span class="text-h4 my-4">Project Not Found</span>
      </v-container>
    </div>
  </div>
</template>

<script>
import ProjectHeader from "./components/ProjectHeader";
import ProjectSideNavigation from "./components/ProjectSideNavigation";

export default {
  name: "Project",
  components: {
    ProjectHeader,
    ProjectSideNavigation,
  },
  computed: {
    project() {
      return this.$store.getters.getProjectById(this.$route.params.id);
    },
    analysis() {
      if (this.project) {
        const ids = this.project.analysis.main;
        return this.$store.getters.getAnalysisById(ids[ids.length - 1]);
      } else {
        return null;
      }
    },
  },
  created() {
    this.$store.dispatch("LOAD_PROJECT_VIEW_PAGE", this.$route.params.id);
  },
};
</script>