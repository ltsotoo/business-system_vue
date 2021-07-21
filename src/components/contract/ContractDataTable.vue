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
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="openEditDialog(item.id)"> mdi-pencil </v-icon>
        <v-icon small @click="openDeleteDialog(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

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

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      min-width="800px"
      max-width="1200px"
      persistent
    >
      <contractForms :openId="options.openId" />
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
  </div>
</template>

<script>
import axios from "axios";
import contractForms from "./ContractForms";

export default {
  components: {
    contractForms,
  },
  props: {},
  data: () => ({
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "合同编号", value: "contractNumber", sortable: false },
      { text: "业务员", value: "salesmanName", sortable: false },
      { text: "客户单位", value: "customerCompanyName", sortable: false },
      { text: "客户名称", value: "customerName", sortable: false },
      { text: "总金额(元)", value: "totalAmount" },
      { text: "状态", value: "status", sortable: false },
      { text: "操作", value: "actions", sortable: false },
    ],
    options: {
      loading: false,
      total: 100,
      page: 1,
      itemsPerPage: 5,
      openId: null,
      editDialog: false,
      deleteDialog: false,
    },
    object: [
      {
        id: 1,
        contractNumber: "bjscistar-20210712-0101-001",
        salesmanName: "开发者1号",
        customerCompanyName: "开发者公司",
        customerName: "顾客1号",
        totalAmount: 123456,
        status: 1,
      },
      {
        id: 2,
        contractNumber: "bjscistar-20210712-0101-002",
        salesmanName: "开发者2号",
        customerCompanyName: "开发者公司",
        customerName: "顾客2号",
        totalAmount: 2333333,
        status: 2,
      },
      {
        id: 3,
        contractNumber: "bjscistar-20210712-0101-003",
        salesmanName: "开发者3号",
        customerCompanyName: "开发者公司",
        customerName: "顾客3号",
        totalAmount: 6666,
        status: 3,
      },
    ],
  }),
  methods: {
    getObject() {
      var _this = this;
      _this.options.loading = true;
      _this.data = [];
      axios
        .get(
          "https://www.fastmock.site/mock/57a96119947a3da2587589de85bee347/zyhk/contract/" +
            _this.options.page
        )
        .then(function (res) {
          _this.options.total = res.data.count;
          _this.object = res.data.data;
          _this.options.loading = false;
        });
    },
    openEditDialog(id) {
      // this.editedIndex = this.data.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.options.openId = id;
      this.options.editDialog = true;
    },
    closeEditDialog() {
      this.options.openId = null;
      this.options.editDialog = false;
    },
    editItem() {
      this.options.openId = null;
      this.options.editDialog = false;
    },
    openDeleteDialog(id) {
      this.options.openId = id;
      this.options.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.options.openId = null;
      this.options.deleteDialog = false;
    },
    deleteItem() {
      //删除操作
      this.options.openId = null;
      this.options.deleteDialog = false;
    },
  },
};
</script>