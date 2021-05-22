<template>
  <div>
    <v-card
      outlined
      tile
      v-for="gate in gates"
      :key="gate.environment"
      class="mb-5"
    >
      <v-card-title>
        {{ gate.environment }}
        <v-icon v-if="gate.status === 'OK'" right color="green darken-2">
          mdi-check-bold
        </v-icon>
        <v-icon v-else right color="red darken-2"> mdi-close-thick </v-icon>
      </v-card-title>
      <div v-if="gate.consumers.length > 0">
        <v-divider></v-divider>
        <QualityGateMember :title="'consumers'" :members="gate.consumers" />
      </div>
      <div v-if="gate.providers.length > 0">
        <v-divider></v-divider>
        <QualityGateMember :title="'providers'" :members="gate.providers" />
      </div>
    </v-card>
  </div>
</template>

<script>
import QualityGateMember from '../components/QualityGateMember';

export default {
  name: "ProjectQualityGate",
  components: {
    QualityGateMember
  },
  computed: {
    analysis() {
      return this.$store.getters.getAnalysisByProjectVersion(
        this.$route.params.id,
        this.$route.params.version
      );
    },
    gates() {
      const qg = this.$store.getters.getQualityGateByProjectVersion(
        this.$route.params.id,
        this.$route.params.version
      );
      return qg ? qg.gates : [];
    },
  },
};
</script>