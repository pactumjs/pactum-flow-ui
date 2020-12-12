<template>
  <v-app>
    <NavigationBar />
    <!-- Sizes your content based upon application components -->
    <v-main class="grey lighten-4">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar';
export default {
  name: "App",
  components: {
    NavigationBar
  }
};
</script>
