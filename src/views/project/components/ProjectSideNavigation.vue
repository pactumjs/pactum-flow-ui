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
          <v-list-item v-for="item in items" router :to="`/projects/${$route.params.id}/${$route.params.version}/${item.title}`" :key="item.title" class="yellow--text">
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
        { title: "interactions", icon: "mdi-swap-horizontal" },
        { title: "consumers", icon: "mdi-download-outline" },
        { title: "providers", icon: "mdi-upload-outline" },
        { title: "quality-gates", icon: "mdi-shield-plus-outline" },
      ],
      selected: [0],
    };
  }
};
</script>