<template>
  <div>
    <v-container class="text-center my-10">
        <v-icon color="red" x-large>mdi-magnify-remove-outline</v-icon>
        <br />
        <span class="text-h4 my-4">{{ message }}</span>
      </v-container>
  </div>
</template>

<script>
export default {
  name: 'ResourceNotFound',
  props: ['message']
}
</script>