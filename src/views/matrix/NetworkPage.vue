<template>
  <main>
    <h3>Network Page</h3>
    <div v-if="tree.length > 0">
      <Edge :tree="tree" :diameter="diameter" :key="diameter"/>
      <Zoom @zoom="zoom"/>
    </div>
  </main>
</template>

<script>
import Edge from "./components/Edge";
import Zoom from "./components/Zoom";

export default {
  name: "NetworkPage",
  data() {
    return {
      diameter: 600
    }
  },
  components: {
    Edge,
    Zoom
  },
  computed: {
    tree() {
      const _tree = []
      const relations = this.$store.getters.getRelations();
      for (let i = 0; i < relations.length; i++) {
        const relation = relations[i];
        _tree.push({
          name: relation.projectId,
          imports: relation.consumers
        })
      }
      return _tree;
    }
  },
  methods: {
    zoom(event) {
      if (event === '+') {
        this.diameter = this.diameter + 100;
      }
      if (event === '-' && this.diameter > 300) {
        this.diameter = this.diameter - 100;
      }
    }
  },
  created() {
    this.$store.dispatch("FETCH_RELATIONS");
  },
};
</script>