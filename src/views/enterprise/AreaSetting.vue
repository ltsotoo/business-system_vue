<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="object"
          :footer-props="{
            itemsPerPageOptions: [5, 10, 20],
          }"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { queryAreas } from "@/api/oadrp";
export default {
  data: () => ({
    headers: [
      {
        text: "区域",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "办事处",
        align: "center",
        value: "office.name",
        sortable: false,
      },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    object: [],
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryAreas().then((res) => {
        this.object = res.data;
      });
    },
  },
};
</script>