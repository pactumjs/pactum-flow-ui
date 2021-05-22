<template>
  <div>
    <v-list>
      <v-subheader class="text-uppercase"> {{ title }} </v-subheader>
      <v-list-item v-for="member in members" :key="member.name">
        <v-list-item-content>
          <v-list-item-title>
            {{ member.name }}
            <v-icon
              v-if="member.status === 'PASSED'"
              small
              color="green darken-2"
            >
              mdi-check
            </v-icon>
            <v-icon v-else small color="red darken-2"> mdi-close </v-icon>
          </v-list-item-title>
          <v-list-item-subtitle v-if="member.message">
            <v-icon small> mdi-menu-right </v-icon>
            {{ member.message }}
          </v-list-item-subtitle>
          <div
            class="mt-1"
            v-for="(exception, index) in member.exceptions"
            :key="index"
          >
            <v-list-item-subtitle class="text--primary">
              <v-icon small> mdi-arrow-decision-outline </v-icon>
              {{ exception.flow }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon small> mdi-menu-right </v-icon>
              {{ exception.error }}
            </v-list-item-subtitle>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "QualityGateMember",
  props: ["title", "members"],
};
</script>