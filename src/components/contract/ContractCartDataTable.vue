<template>
  <div>
    <v-data-table
      :headers="headers"
      :items.sync="object"
      :items-per-page="5"
      class="elevation-1"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
      @click:row="openViewDialog"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="openDeleteDialog(item.productID)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.viewDialog"
      v-if="options.viewDialog"
      max-width="800px"
      @click:outside="closeViewDialog"
    >
      <productForms :openID="options.openID" :openType="options.openType" />
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

export default {
  components: {
    productForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    snack: false,
    headers: [
      {
        text: "名称",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "品牌", value: "brand", sortable: false },
      { text: "规格", value: "specification", sortable: false },
      { text: "购买数量", value: "number", sortable: false },
      { text: "单位", value: "unit", sortable: false },
      { text: "单价(元)", value: "price", sortable: false },
      { text: "总价格(元)", value: "totalPrice", sortable: false },
      { text: "操作", value: "actions", sortable: false },
    ],
    options: {
      loading: false,
      total: 1,
      page: 1,
      itemsPerPage: 10,
      openID: null,
      openType: null,
      viewDialog: false,
      deleteDialog: false,
    },
    object: [],
  }),
  created() {},
  methods: {
    addProduct(task) {
      var isNew = true;
      this.object.forEach((item) => {
        if (item.productID == task.productID) {
          this.$message.error("请勿重复添加！")
          isNew = false;
          return;
        }
      });
      if (isNew) {
        this.object.push(task);
      }
    },
    openViewDialog(item, other) {
      setTimeout(() => {
        if (this.options.deleteDialog == false) {
          this.options.openID = item.productID;
          this.options.openType = 1;
          this.options.viewDialog = true;
        }
      }, 66);
    },
    closeViewDialog() {
      this.options.openID = null;
      this.options.openType = null;
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
      this.object = this.object.filter((t) => t.productID != this.options.openID);
      this.options.openID = null;
      this.options.deleteDialog = false;
    },
  },
};
</script>