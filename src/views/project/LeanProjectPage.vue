<template>
  <main></main>
</template>
<script>
export default {
  name: "LeanProjectPage",
  created() {
    this.$store.dispatch("LOAD_PROJECTS_PAGE_VIEW").then(() => {
      const projectId = this.$route.params.id;
      const analysisId = this.$store.getters.getProjectAnalysisIdByEnvironment(
        this.$store.getters.getSelectedEnvironment(),
        projectId
      );
      if (analysisId) {
        const analysis = this.$store.getters.getAnalysisById(analysisId);
        const version = analysis.version;
        this.$router.push({
          path: `/projects/${projectId}/${version}`,
        });
      } else {
        this.$router.push({
          path: `/projects/${projectId}/NA`,
        });
      }
    });
  },
};
</script>