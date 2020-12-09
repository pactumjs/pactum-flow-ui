<template>
  <div>
    <v-card elevation="1">
      <v-card-title>{{ project.name }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" sm="2">
              <div>
                <v-avatar color="indigo" size="32" class="mb-1 mr-1">
                  <span class="white--text" v-if="analysis">{{ analysis.flows.length }}</span>
                  <span class="white--text" v-else>-</span>
                </v-avatar>
                Flows
              </div>
            </v-col>
            <v-col cols="12" sm="2">
              <div>
                <v-avatar color="indigo" size="32" class="mb-1 mr-1">
                  <span class="white--text" v-if="analysis">{{ analysis.consumers.length }}</span>
                  <span class="white--text" v-else>-</span>
                </v-avatar>
                Consumers
              </div>
            </v-col>
            <v-col cols="12" sm="2">
              <div>
                <v-avatar color="indigo" size="32" class="mb-1 mr-1">
                  <span class="white--text" v-if="analysis">{{ analysis.providers.length }}</span>
                  <span class="white--text" v-else>-</span>
                </v-avatar>
                Providers
              </div>
            </v-col>
            <v-col cols="12" sm="2">
              <div>
                <v-avatar color="indigo" size="32" class="mb-1 mr-1">
                  <span class="white--text">{{
                    project.analysis.main.length
                  }}</span>
                </v-avatar>
                Versions
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: ["project"],
  computed: {
    analysis() {
      const ids = this.project.analysis.main;
      if (ids.length > 0) {
        return this.$store.getters.getAnalysisById(ids[ids.length - 1]);
      }
      return null;
    }
  }
};
</script>
