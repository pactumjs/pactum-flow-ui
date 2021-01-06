<template>
  <div class="home mt-6">
    <v-container>
      <div class="text-center">
        <div class="mb-6">
          <span class="text-h2 mr-2">PACTUM</span>
          <span class="text-h2 black yellow--text pl-2 pr-2">JS</span>
        </div>
        <v-divider class="mb-4"></v-divider>
        <p class="text-h6 mb-8">
          Free & Open Source REST API testing tool for all levels in a Test
          Pyramid
        </p>
        <v-btn
          dark
          x-large
          href="https://pactumjs.github.io/#/"
          target="_blank"
          class="yellow--text mr-2"
        >
          Get Started
          <v-icon right dark> mdi-play </v-icon>
        </v-btn>
        <v-btn
          dark
          x-large
          href="https://github.com/pactumjs/pactum"
          target="_blank"
          class="yellow--text ml-2"
        >
          GitHub
          <v-icon right dark> mdi-github </v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
