<template>
  <div class="home mt-6">
    <v-container>
      
      <div class="text-center">
        <img
        height="250"
        src="@/assets/logo-icon.svg"
        alt="logo"
      />
        <div class="my-6">
          <span class="v-heading text-h3">REST API Testing Library</span>
        </div>
        <p class="mx-auto" style="max-width: 668px;">
          PactumJS is a free and open source REST API testing library for all levels in a
          <a
            href="https://martinfowler.com/articles/practical-test-pyramid.html"
            target="_blank"
          >Test Pyramid</a>.
          Supports component, contract & e2e testing of APIs.
         </p>
        <v-btn
          dark
          x-large
          href="https://pactumjs.github.io/#/"
          target="_blank"
          class="yellow--text mr-6 mt-2"
        >
          Get Started
          <v-icon right dark> mdi-play </v-icon>
        </v-btn>
        <v-btn
          dark
          x-large
          href="https://github.com/pactumjs/pactum"
          target="_blank"
          class="yellow--text ml-6 mt-2"
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
