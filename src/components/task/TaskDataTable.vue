<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :items-per-page="5"
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
      <template v-slot:item.actions="{ item }">
        <v-icon @click="openEditDialog(item.ID)"> mdi-pencil </v-icon>
        <v-icon @click="openDeleteDialog(item.ID)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.viewDialog"
      v-if="options.viewDialog"
      max-width="800px"
    >
      <productForms :openID="options.openID" :openType="options.openType" />
    </v-dialog>

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      max-width="800px"
      persistent
    >
      <productForms
        :openID="options.openID"
        ref="productForms"
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
        <v-card-title class="text-h5">您确定删除该产品吗?</v-card-title>
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
import productForms from "../product/ProductForms";
import { delTask, queryTasksByContractID } from "@/api/task";

export default {
  components: {
    productForms,
  },
  props: {
    openID: {
      type: Number,
      default: 0,
    },
    openType: {
      type: Number,
      default: 0,
    },
    queryObject: {
      type: Object,
    },
    parentObject: {},
  },
  data: () => ({
    headers: [
      {
        text: "合同ID",
        align: "start",
        sortable: false,
        value: "contractID",
      },
      { text: "产品ID", value: "productID", sortable: false },
      { text: "数量", value: "specification", sortable: false },
      { text: "库存数量", value: "number", sortable: false },
      { text: "单位", value: "unit", sortable: false },
      { text: "状态", value: "status", sortable: false },
      { text: "技术负责人ID", value: "technicianManID", sortable: false },
      { text: "采购负责人ID", value: "purchaseManID", sortable: false },
      { text: "库存负责人ID", value: "inventoryManID", sortable: false },
      { text: "发货人员ID", value: "shipmentManID", sortable: false },
      { text: "操作", value: "actions", sortable: false },
    ],
    options: {
      loading: false,
      total: 1,
      page: 1,
      itemsPerPage: 10,
      viewDialog: false,
      editDialog: false,
      deleteDialog: false,
    },
    object: [],
  }),
  created() {
    if (this.openType == 1) {
      this.object = this.parentObject;
    } else {
      this.getObject();
    }
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryTasksByContractID(this.openID).then((res) => {
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
    openEditDialog(id) {
      this.options.openID = id;
      this.options.editDialog = true;
    },
    closeEditDialog() {
      this.options.openID = null;
      this.options.editDialog = false;
    },
    editItem() {
      this.$refs.productForms.editObject();
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
      delTask(this.options.openID).then((res) => {
        this.$message.success("删除成功了！");
        this.options.openID = null;
        this.getObject();
        this.options.deleteDialog = false;
      });
    },
  },
};
</script>