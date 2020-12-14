<template>
  <div>
    <v-container class="pt-0">
      <div v-if="project && analysis">
        <ProjectHeader :name="project.name" />
        <v-row>
          <v-col cols="12" sm="2">
            <ProjectSideNavigation />
          </v-col>
          <v-col cols="12" sm="10" class="mt-2">
            <ProjectOverview :project="project" v-if="menu === 'overview'" />
            <FlowsOverview :flows="flows" v-if="menu === 'flows'"/>
            <EndpointsOverview :flows="flows" v-if="menu === 'endpoints'"/>
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
import EndpointsOverview from "./components/EndpointsOverview";

export default {
  name: "Project",
  components: {
    ProjectHeader,
    ProjectSideNavigation,
    ProjectOverview,
    FlowsOverview,
    EndpointsOverview,
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
    flows() {
      if (this.analysis) {
        const flowIds = this.analysis.flows;
        return this.$store.getters.getFlowsByIds(flowIds);
      } else {
        return [];
      }
    },
    menu() {
      return this.$store.state.ProjectView.selectedMenuItem;
    }
  },
  created() {
    this.$store.dispatch("LOAD_PROJECT_VIEW_PAGE", this.$route.params.id);
  },
};
</script>