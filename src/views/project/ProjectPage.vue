<template>
  <div>
    <div v-if="isProjectLoading">
      <LoadingSpinner />
    </div>
    <div v-else-if="project && analysis">
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
import LoadingSpinner from "../../components/LoadingSpinner";
import ProjectHeader from "./components/ProjectHeader";
import ProjectSideNavigation from "./components/ProjectSideNavigation";

export default {
  name: "Project",
  components: {
    LoadingSpinner,
    ProjectHeader,
    ProjectSideNavigation,
  },
  computed: {
    isProjectLoading() {
      return this.$store.state.ProjectPageView.loadingProject;
    },
    project() {
      return this.$store.getters.getProjectById(this.$route.params.id);
    },
    analysis() {
      if (this.project) {
        const aid = this.$store.getters.getProjectAnalysisIdByEnvironment('latest', this.project._id);
        return this.$store.getters.getAnalysisById(aid);
      } else {
        return null;
      }
    },
  },
  created() {
    this.$store.dispatch("LOAD_PROJECT_PAGE_VIEW", this.$route.params.id);
  },
};
</script>