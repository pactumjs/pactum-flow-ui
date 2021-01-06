<template>
  <v-subheader class="blue-grey--text text--darken-4 font-weight-bold">
    <v-icon small class="mr-2" color="blue-grey darken-2">
      {{ icon }}
    </v-icon>
    {{ text }}
  </v-subheader>
</template>

<script>
export default {
  name: 'ListHeader',
  props: ["text", "icon"]
}
</script>