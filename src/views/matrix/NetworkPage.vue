<template>
  <main>
    <h3>Network Page</h3>
    <p class="text-caption">Links between projects are random.</p>
    <div class="text-center pa-10">
      <hierarchical-edge-bundling
        identifier="id"
        node-text="name"
        class="graph-root"
        :data="tree"
        :links="links"
        :linkTypes="linkTypes"
      />
    </div>
  </main>
</template>

<style scoped>
.graph-root {
  height: 600px;
  width: 100%;
}
</style>

<script>
import { hierarchicalEdgeBundling } from "vued3tree";

export default {
  name: "NetworkPage",
  components: {
    hierarchicalEdgeBundling,
  },
  computed: {
    tree() {
      const projects = this.$store.state.Projects.projects;
      const children = [];
      for (let i = 0; i < projects.length; i++) {
        children.push({
          name: projects[i]._id,
          id: i,
        });
      }
      return {
        name: "projects",
        children,
      };
    },
    links() {
      const projects = this.$store.state.Projects.projects;
      const links = [];
      for (let i = 1; i < projects.length; i++) {
        links.push({ source: i - 1, target: i, type: 1 })
      }
      return links;
    },
  },
  created() {
    this.$store.dispatch("LOAD_MATRIX_PAGE_VIEW");
  },
};
</script>