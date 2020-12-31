<template>
  <v-expand-transition>
    <div v-show="show">
      <v-divider></v-divider>
      <v-card-text>
        <pre class="language-json">
            <code>
{{ JSON.stringify(payload, null, 2) }}
            </code>
        </pre>
      </v-card-text>
    </div>
  </v-expand-transition>
</template>

<script>
export default {
  name: "ExpansionPanel",
  props: ["show", "payload"],
};
</script>