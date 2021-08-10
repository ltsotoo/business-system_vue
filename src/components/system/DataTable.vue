<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      class="elevation-1"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
    >
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
    items: [],
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