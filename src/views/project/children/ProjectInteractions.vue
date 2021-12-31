<template>
  <div>
    <div v-if="filter || (interactions && interactions.length > 0)">
      <v-row no-gutters>
        <v-col cols="6">
          <v-form>
            <v-text-field
              prepend-icon="mdi-magnify"
              v-model="filter"
              dense
              clearable
              color="black"
              placeholder="Search"
              class="mr-2"
            ></v-text-field>
          </v-form>
        </v-col>
        <v-col cols="4"> 
          <v-select
              :items="providers"
              label="Providers"
              class="mx-2"
              dense
              @change="filterByProvider"
            ></v-select>
        </v-col>
        <v-col cols="2">
          <v-chip class="float-right" color="orange darken-3" label outlined>
            {{ filtered_interactions.length }} Interactions
          </v-chip>
        </v-col>
      </v-row>
    </div>
    <div v-if="interactions && interactions.length > 0">
      <v-list>
        <ListHeader text="Interactions" icon="mdi-swap-horizontal" />
        <v-divider></v-divider>
        <ListItems :items="filtered_interactions" path="interactions" />
      </v-list>
    </div>
    <div v-else>
      <NoItems message="No Interactions"></NoItems>
    </div>
  </div>
</template>

<script>
import NoItems from "../components/NoItems";
import ListHeader from "../components/ListHeader";
import ListItems from "../components/ListItems";

export default {
  name: "ProjectInteractions",
  data: () => {
    return {
      filter: "",
      filter_by_provider: ""
    };
  },
  components: {
    NoItems,
    ListItems,
    ListHeader,
  },
  computed: {
    analysis() {
      return this.$store.getters.getAnalysisByProjectVersion(
        this.$route.params.id,
        this.$route.params.version
      );
    },
    interactions() {
      const aid = this.analysis._id;
      const items = this.$store.getters.getInteractionsByAnalysisId(aid);
      items.forEach((item) => (item.name = item.flow));
      return items;
    },
    filtered_interactions() {
      let items = this.interactions;
      if (this.filter) {
        items = items.filter((item) => {
          return (
            item.name.includes(this.filter) || item.info.includes(this.filter)
          );
        });
      }
      if (this.filter_by_provider) {
        items = items.filter((item) => item.provider === this.filter_by_provider);
      }
      return items;
    },
    providers() {
      return [''].concat(this.interactions.map(_interaction => _interaction.provider));
    }
  },
  methods: {
    filterByProvider(value) {
      this.filter_by_provider = value;
    }
  }
};
</script>