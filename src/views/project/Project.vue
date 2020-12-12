<template>
  <div>
    <v-container class="pt-0">
      <div v-if="project">
        <ProjectHeader :name="project.name" />
        <v-row>
          <v-col cols="12" sm="2">
            <ProjectSideNavigation />
          </v-col>
          <v-col cols="12" sm="10" class="mt-2">
            <ProjectOverview :project="project" v-if="menu === 'overview'" />
            <FlowsOverview :flows="flows" v-if="menu === 'flows'"/>
          </v-col>
        </v-row>
      </div>
      <div v-else>Project Not Found</div>
    </v-container>
  </div>
</template>

<script>
import ProjectHeader from "./components/ProjectHeader";
import ProjectSideNavigation from "./components/ProjectSideNavigation";
import ProjectOverview from "./components/ProjectOverview";
import FlowsOverview from "./components/FlowsOverview";
export default {
  name: "Project",
  components: {
    ProjectHeader,
    ProjectSideNavigation,
    ProjectOverview,
    FlowsOverview,
  },
  computed: {
    project() {
      return this.$store.getters.getProjectById(this.$route.params.id);
    },
    analysis() {
      const ids = this.project.analysis.main;
      return this.$store.getters.getAnalysisById(ids[ids.length - 1]);
    },
    flows() {
      if (this.analysis) {
        const flowIds = this.analysis.flows;
        return this.$store.getters.getFlowsByIds(flowIds);
      } else {
        return [];
      }
    },
    menu() {
      return this.$store.state.projects.selectedMenu;
    }
  },
  created() {
    this.$store.dispatch("LOAD_PROJECT_DASHBOARD_PAGE", this.$route.params.id);
  },
};
</script>