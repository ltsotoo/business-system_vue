<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      class="elevation-1"
      hide-default-header
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { queryDictionaries } from "@/api/dictionary";
export default {
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      {
        text: "值",
        align: "center",
        sortable: false,
        value: "text",
      },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    object: [],
  }),
  methods: {
    getObject() {
      if (this.queryObject) {
        queryDictionaries(this.queryObject).then((res) => {
          this.object = res.data;
        });
      }
    },
  },
};
</script>