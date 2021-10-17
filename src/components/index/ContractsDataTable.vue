<template>
  <div>
    <v-card elevation="1">
      <v-card-title>回款表</v-card-title>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="object"
      class="elevation-1"
      :server-items-length="options.total"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
      :loading="options.loading"
      :options.sync="options"
      @update:page="getObject"
      @update:items-per-page="getObject"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="openEditDialog(item.UID)"> mdi-pencil </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { queryContracts } from "@/api/contract";
export default {
  data: () => ({
    headers: [
      {
        text: "合同编号",
        align: "center",
        value: "no",
        sortable: false,
      },
      {
        text: "区域",
        align: "center",
        value: "area.name",
        sortable: false,
      },
      {
        text: "业务员",
        align: "center",
        value: "employee.name",
        sortable: false,
      },
      {
        text: "客户单位",
        align: "center",
        value: "customer.company.name",
        sortable: false,
      },
      {
        text: "客户",
        align: "center",
        value: "customer.name",
        sortable: false,
      },
      {
        text: "总金额(元)",
        align: "center",
        value: "totalAmount",
        sortable: false,
      },
      {
        text: "回款状态",
        align: "center",
        value: "statusText",
        sortable: false,
      },
      {
        text: "操作",
        align: "center",
        value: "actions",
        sortable: false,
      },
    ],
    options: {
      loading: false,
      total: 0,
      page: 1,
      itemsPerPage: 10,
      openUID: "",
      openType: null,
      approveDialog: false,
      viewDialog: false,
      editDialog: false,
      deleteDialog: false,
    },
    object: [],
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryContracts({}, this.options.itemsPerPage, this.options.page).then(
        (res) => {
          this.options.loading = false;
          if (res.total < this.options.total) {
            this.options.page = 1;
          }
          this.options.total = res.total;
          if (this.options.total != 0) {
            this.object = res.data;
          }
          this.stautsToText();
        }
      );
    },
    stautsToText() {
      this.object.forEach(function (e) {
        switch (e.collectionStatus) {
          case 1:
            e.statusText = "回款中";
            return;
          case 2:
            e.statusText = "回款完成";
            return "回款完成";
        }
      });
    },
  },
};
</script>