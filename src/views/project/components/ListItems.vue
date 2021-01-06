<template>
  <div>
    <v-list-item
      v-for="item in records"
      :key="item.name"
      router
      :to="`/${path}/${item.id}`"
    >
      <v-list-item-action style="width: 40px">
        <v-list-item-action-text
          v-text="item.method"
          :class="`${item.method} font-weight-bold`"
        ></v-list-item-action-text>
        <v-list-item-action-text v-text="item.code"></v-list-item-action-text>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ item.endpoint }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "ListItems",
  props: ["items", "path"],
  computed: {
    records() {
      const items = [];
      this.items.forEach((item) => {
        const infos = item.info.split("::");
        items.push({
          id: item._id,
          name: item.name,
          method: infos[0],
          endpoint: infos[1],
          code: infos[2],
        });
      });
      return items;
    },
  },
};
</script>

<style scoped>
.v-list-item__action-text.GET {
  color: #2196f3;
}
.v-list-item__action-text.POST {
  color: #4caf50;
}
.v-list-item__action-text.DELETE {
  color: #f44336;
}
.v-list-item__action-text.PUT {
  color: #ffab00;
}
.v-list-item__action-text.PATCH {
  color: #f57f17;
}
</style>