<template>
  <div>
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
      @click:row="openViewDialog"
    >
      <template v-slot:[`item.estimatedDeliveryDate`]="{ item }">
        <v-chip :color="compareColor(item.estimatedDeliveryDate)">
          {{ item.estimatedDeliveryDate }}
        </v-chip>
      </template>
      <template v-slot:[`item.isSpecial`]="{ item }">
        {{ item.isSpecial == "true" ? "是" : "否" }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="openEditDialog(item.ID)"> mdi-pencil </v-icon>
        <v-icon small @click="openDeleteDialog(item.ID)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.viewDialog"
      v-if="options.viewDialog"
      max-width="1440px"
      @click:outside="closeViewDialog"
    >
      <contractForms :openID="options.openID" :openType="options.openType" />
    </v-dialog>

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      min-width="800px"
      max-width="1440px"
      persistent
    >
      <contractForms
        :openID="options.openID"
        :openType="options.openType"
        ref="contractForms"
        :parentFun="getObject"
      />
      <v-card style="margin-top: 1px">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="editItem">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeEditDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="options.deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5">您确定删除该位合同吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="deleteItem">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeDeleteDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import contractForms from "./ContractForms";
import { delContract, queryContracts } from "@/api/contract";

export default {
  components: {
    contractForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      {
        text: "合同编号",
        align: "center",
        sortable: false,
        value: "no",
      },
      { text: "区域", align: "center", value: "area.name", sortable: false },
      {
        text: "业务员",
        align: "center",
        value: "employee.name",
        sortable: false,
      },
      {
        text: "客户",
        align: "center",
        value: "customer.name",
        sortable: false,
      },
      {
        text: "合同交货日期",
        align: "center",
        value: "estimatedDeliveryDate",
        sortable: false,
      },
      {
        text: "实际交货日期",
        align: "center",
        value: "endDeliveryDate",
        sortable: false,
      },
      {
        text: "开票类型",
        align: "center",
        value: "invoiceType",
        sortable: false,
      },
      {
        text: "开票内容",
        align: "center",
        value: "invoiceContent",
        sortable: false,
      },
      {
        text: "特殊合同",
        align: "center",
        value: "isSpecial",
        sortable: false,
      },
      {
        text: "总金额(元)",
        align: "center",
        value: "totalAmount",
        sortable: false,
      },
      { text: "状态", align: "center", value: "status", sortable: false },
      { text: "备注", align: "center", value: "remarks", sortable: false },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    options: {
      loading: false,
      total: 0,
      page: 1,
      itemsPerPage: 10,
      openID: null,
      openType: null,
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
      queryContracts(
        this.options.itemsPerPage,
        this.options.page,
        this.queryObject
      ).then((res) => {
        this.options.loading = false;
        if (res.total < this.options.total) {
          this.options.page = 1;
        }
        this.options.total = res.total;
        this.object = res.data;
      });
    },
    openViewDialog(item, other) {
      setTimeout(() => {
        if (
          this.options.editDialog == false &&
          this.options.deleteDialog == false
        ) {
          this.options.openID = item.ID;
          this.options.openType = 1;
          this.options.viewDialog = true;
        }
      }, 66);
    },
    closeViewDialog() {
      this.options.openID = null;
      this.options.openType = null;
    },
    openEditDialog(id) {
      this.options.openID = id;
      this.options.openType = 2;
      this.options.editDialog = true;
    },
    closeEditDialog() {
      this.options.openID = null;
      this.options.openType = null;
      this.options.editDialog = false;
    },
    editItem() {
      this.$refs.customerForms.editObject();
      this.options.openID = null;
      this.options.editDialog = false;
    },
    openDeleteDialog(id) {
      this.options.openID = id;
      this.options.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.options.openID = null;
      this.options.deleteDialog = false;
    },
    deleteItem() {
      delContract(this.options.openID).then((res) => {
        this.$message.success("删除成功了！");
        this.options.openID = null;
        this.getObject();
        this.options.deleteDialog = false;
      });
    },
    compareColor(date) {
      //替换为‘/’转译为中国时间，‘-’转译为UTC
      date = date.replace(/-/g, "/");
      var nowDate = new Date().getTime();
      var parseDate = Date.parse(date);
      if (nowDate > parseDate) {
        return "red";
      }
      if (nowDate + 7 * 24 * 60 * 60 * 1000 > parseDate) {
        return "orange";
      }
      return "green";
    },
  },
};
</script>