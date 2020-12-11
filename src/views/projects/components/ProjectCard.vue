<template>
  <div>
    <v-card outlined >
      <router-link :to="'/projects/'+project._id" tag="span">
        <v-card-title class="pointer pb-0 indigo--text text--darken-4">
          <v-icon color="indigo darken-2" class="mr-2">mdi-domain</v-icon>
          {{ project.name }}</v-card-title>
      </router-link>
      <v-card-text class="pb-0 pt-0">
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" sm="2" class="ml-5">
              <div>
                <v-avatar color="blue-grey" size="32" class="mb-1 mr-1 darken-4">
                  <span class="white--text">{{ project.flows }}</span>
                </v-avatar>
                Flows
              </div>
            </v-col>
            <v-col cols="12" sm="2">
              <div>
                <v-avatar color="black" size="32" class="mb-1 mr-1">
                  <span class="white--text">{{ project.consumers }}</span>
                </v-avatar>
                Consumers
              </div>
            </v-col>
            <v-col cols="12" sm="2">
              <div>
                <v-avatar color="black" size="32" class="mb-1 mr-1">
                  <span class="white--text">{{ project.providers }}</span>
                </v-avatar>
                Providers
              </div>
            </v-col>
            <v-col cols="12" sm="2">
              <div>
                <v-avatar color="black" size="32" class="mb-1 mr-1">
                  <span class="white--text">{{
                    project.versions
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

<style scoped>
.pointer {
  cursor: pointer;
}
</style>

<script>
export default {
  name: "ProjectCard",
  props: ["project"]
};
</script>
