<template>
  <div class="my-2">
    <v-card flat outlined>
      <v-card-title>
        <span>{{ endpoint.method }}</span>
        <span class="pl-2">{{ endpoint.path }}</span>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="flow in endpoint.flows" :key="flow">
            <v-list-item-content>
              <v-list-item-subtitle>
                <v-icon small left>mdi-arrow-decision-outline</v-icon>
                {{ flow }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "EndpointCard",
  props: ["endpoint"],
};
</script>