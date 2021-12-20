<template>
  <div>
    <div v-if="isProjectLoading">
      <LoadingSpinner />
    </div>
    <div v-else-if="!project">
      <ResourceNotFound :message="'Project Not Found'" />
    </div>
    <div v-else-if="!analysis">
      <ResourceNotFound :message="'Version Not Found'" />
    </div>
    <div v-else-if="!analysis.processed">
      <ResourceNotFound :message="'Version Not Processed'" />
    </div>
    <div v-else>
      <v-container>
        <ProjectHeader :name="project.name" :analyses="analyses" />
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
  </div>
</template>

<script>
import LoadingSpinner from "../../components/LoadingSpinner";
import ResourceNotFound from "../../components/ResourceNotFound";
import ProjectHeader from "./components/ProjectHeader";
import ProjectSideNavigation from "./components/ProjectSideNavigation";

export default {
  name: "Project",
  components: {
    LoadingSpinner,
    ResourceNotFound,
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
        return this.$store.getters.getAnalysisByProjectVersion(
          this.$route.params.id,
          this.$route.params.version
        );
      } else {
        return null;
      }
    },
    analyses() {
      return this.$store.getters.getAnalysisByProject(this.$route.params.id).sort((analysis_one, analysis_two) => {
        return new Date(analysis_two.createdAt) - new Date(analysis_one.createdAt)
      });
    },
  },
  created() {
    const options = {
      pid: this.$route.params.id,
      version: this.$route.params.version,
    };
    this.$store.dispatch("LOAD_PROJECT_PAGE_VIEW", options);
  },
  watch: {
    $route() {
      const options = {
        pid: this.$route.params.id,
        version: this.$route.params.version,
      };
      this.$store.dispatch("LOAD_PROJECT_PAGE_VIEW", options);
    },
  },
};
</script>