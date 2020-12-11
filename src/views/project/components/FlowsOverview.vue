<template>
  <div>
    <FlowCard v-for="flow in flows" :key="flow.id" :flow="flow" />
  </div>
</template>

<script>
import FlowCard from "./FlowCard";

export default {
  name: "FlowsOverview",
  props: ["flows"],
  components: {
    FlowCard
  }
};
</script>