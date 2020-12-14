<template>
  <div>
    <EndpointCard v-for="endpoint in endpoints" :key="`${endpoint.method}${endpoint.path}`" :endpoint="endpoint"/>
  </div>
</template>

<script>
import EndpointCard from "./EndpointCard";

export default {
  name: "EndpointsOverview",
  props: ["flows"],
  components: {
    EndpointCard
  },
  computed: {
    endpoints() {
      const _endpoints = [];
      const endpointMap = new Map();
      for (let i = 0; i < this.flows.length; i++) {
        const flow = this.flows[i];
        const key = `${flow.request.method}-${flow.request.path}`;
        if (endpointMap.has(key)) {
          const index = endpointMap.get(key);
          const endpoint = _endpoints[index];
          endpoint.flows.push(flow.name);
        } else {
          const endpoint = {};
          endpoint.method = flow.request.method;
          endpoint.path = flow.request.path;
          endpoint.flows = [];
          endpoint.flows.push(flow.name);
          endpointMap.set(key, i);
          _endpoints.push(endpoint);
        }
      }
      return _endpoints;
    },
  },
};
</script>