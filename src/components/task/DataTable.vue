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
      <template v-slot:[`item.status`]="{ item }">
        {{ stautsToText(item.status) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="openApproveDialog(item.UID)" v-if="openType == 4">
          mdi-check-bold
        </v-icon>
        <v-icon
          @click="openEditDialog(item.productUID)"
          v-if="item.status == 0 && openType == 2"
        >
          mdi-pencil
        </v-icon>
        <v-icon @click="openDeleteDialog(item.UID)" v-if="openType == 2">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.viewDialog"
      v-if="options.viewDialog"
      max-width="800px"
    >
      <taskViewForms :openObject="options.openObject" ref="taskViewForms" />
    </v-dialog>

    <v-dialog
      v-model="options.approveDialog"
      v-if="options.approveDialog"
      max-width="800px"
    >
      <approve
        :openUID="options.openUID"
        ref="approve"
        :parentFun="getObject"
        :closeDialog="closeApproveDialog"
      />
    </v-dialog>

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      max-width="800px"
      persistent
    >
      <productViewForms :openUID="options.openUID" ref="productViewForms" />
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
import approve from "./Approve";
import productViewForms from "../product/ViewForms";
import taskViewForms from "./ViewForms";
import { delTask, queryTasks } from "@/api/task";
export default {
  components: {
    approve,
    productViewForms,
    taskViewForms,
  },
  props: {
    openUID: {
      type: String,
      default: "",
    },
    //2：编辑 4：分配
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
        text: "产品",
        align: "start",
        sortable: false,
        value: "product.name",
      },
      { text: "数量", value: "number", sortable: false },
      { text: "库存数量", value: "product.number", sortable: false },
      { text: "单位", value: "unit", sortable: false },
      { text: "技术负责人", value: "technicianMan.name", sortable: false },
      { text: "采购负责人", value: "purchaseMan.name", sortable: false },
      { text: "库存负责人", value: "inventoryMan.name", sortable: false },
      { text: "发货人员", value: "shipmentMan.name", sortable: false },
      { text: "状态", value: "status", sortable: false },
      { text: "操作", value: "actions", sortable: false },
    ],
    options: {
      loading: false,
      total: 1,
      page: 1,
      itemsPerPage: 10,
      viewDialog: false,
      approveDialog: false,
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
      queryTasks({ contractUID: this.openUID }).then((res) => {
        this.options.loading = false;
        if (res.total < this.options.total) {
          this.options.page = 1;
        }
        this.options.total = res.total;
        if (this.options.total != 0) {
          this.object = res.data;
        }
        this.stautsToText();
      });
    },
    openViewDialog(item, other) {
      setTimeout(() => {
        if (
          this.options.editDialog == false &&
          this.options.deleteDialog == false &&
          this.options.approveDialog == false
        ) {
          this.options.openUID = item.productUID;
          this.options.openObject = item;
          this.options.openType = 1;
          this.options.viewDialog = true;
        }
      }, 66);
    },
    openApproveDialog(uid) {
      this.options.openUID = uid;
      this.options.approveDialog = true;
    },
    closeApproveDialog() {
      this.options.openUID = "";
      this.options.approveDialog = false;
    },
    openEditDialog(uid) {
      this.options.openUID = uid;
      this.options.editDialog = true;
    },
    closeEditDialog() {
      this.options.openUID = "";
      this.options.editDialog = false;
    },
    editItem() {
      this.$refs.productViewForms.editObject();
      this.options.openUID = "";
      this.options.editDialog = false;
    },
    openDeleteDialog(uid) {
      this.options.openUID = uid;
      this.options.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.options.openUID = "";
      this.options.deleteDialog = false;
    },
    deleteItem() {
      delTask(this.options.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.options.openUID = "";
        this.getObject();
        this.options.deleteDialog = false;
      });
    },
    updateItemStatus(UID) {
      this.options.loading = true;
      queryTasks({ contractUID: UID }).then((res) => {
        this.options.loading = false;
        if (res.total < this.options.total) {
          this.options.page = 1;
        }
        this.options.total = res.total;
        if (this.options.total != 0) {
          this.object = res.data;
        }
        this.stautsToText();
      });
    },
    check() {
      var status = true;
      this.object.forEach(function (e) {
        if (e.status == 0) {
          status = false;
        }
      });
      return status;
    },
    stautsToText(status) {
      switch (status) {
        case 0:
          return "未分配";
        case 1:
          return "待设计";
        case 2:
          return "待采购";
        case 3:
          return "待入库";
        case 4:
          return "待发货";
        case 5:
          return "待确认收货";
        case 6:
          return "完成";
      }
    },
  },
};
</script>