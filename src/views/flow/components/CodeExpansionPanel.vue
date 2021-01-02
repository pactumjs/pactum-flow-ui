<template>
  <div v-if="code">
    <v-card-actions class="mt-n4">
      <v-btn color="orange darken-2" text> {{ text }} </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{
          show ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <pre class="language-json">
            <code>
{{ JSON.stringify(code, null, 2) }}
            </code>
        </pre>
        </v-card-text>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: "ExpansionPanel",
  props: ["text", "code"],
  data() {
    return {
      show: false,
    };
  },
};
</script>