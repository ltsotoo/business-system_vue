<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="primary" @click="openEditDialog(item)" class="mx-2">
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="editDialog" width="1000px" persistent v-if="editDialog">
      <monthPlanEditForms
        :closeDialog="closeEditDialog"
        :openItem="openItem"
        :refresh="getObject"
      />
    </v-dialog>
  </div>
</template>

<script>
import { queryMonthPlans } from "@/api/monthPlan";
import monthPlanEditForms from "./EditForms";
export default {
  components: {
    monthPlanEditForms,
  },
  data: () => ({
    headers: [
      { text: "ID", align: "center", value: "no", sortable: false },
      { text: "月份", align: "center", value: "text", sortable: false },
      { text: "百分比(%)", align: "center", value: "value", sortable: false },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    object: [],

    openItem: {},
    editDialog: false,
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryMonthPlans().then((res) => {
        this.object = res.data;
      });
    },
    openEditDialog(item) {
      this.openItem = item;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openItem = {};
      this.editDialog = false;
    },
  },
};
</script>