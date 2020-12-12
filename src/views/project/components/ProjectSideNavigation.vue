<template>
  <div>
    <v-navigation-drawer dark permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class="overline"> MENU </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item-group mandatory v-model="selected" active-class="border">
          <v-list-item v-for="item in items" :key="item.title" @click="selectMenu(item.title)" class="yellow--text">
            <v-list-item-icon class="mr-4">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="text-uppercase overline">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "overview", icon: "mdi-view-dashboard" },
        { title: "flows", icon: "mdi-arrow-decision-outline" },
        { title: "endpoints", icon: "mdi-elevator" },
        { title: "consumers", icon: "mdi-download-outline" },
        { title: "providers", icon: "mdi-upload-outline" },
      ],
      selected: [1],
    };
  },
  methods: {
    selectMenu(item) {
      this.$store.dispatch('LOAD_PROJECT_MENU_PAGE', item);
    }
  }
};
</script>