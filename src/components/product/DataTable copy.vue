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
      <template v-slot:[`item.actions`]="{ item }">
        <div v-if="openType == 3">
          <v-icon @click="openAddDialog(item)"> mdi-plus-thick </v-icon>
        </div>
        <div v-else>
          <v-icon @click="openEditDialog(item.ID)"> mdi-pencil </v-icon>
          <v-icon @click="openDeleteDialog(item.ID)"> mdi-delete </v-icon>
        </div>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.addDialog"
      v-if="options.addDialog"
      max-width="400px"
      persistent
    >
      <addToCart
        :closeFun="closeAddDialog"
        :product="options.addItem"
        :parentFun="closeAddDialogForAdd"
      />
    </v-dialog>

    <v-dialog
      v-model="options.viewDialog"
      v-if="options.viewDialog"
      max-width="800px"
      @click:outside="closeViewDialog"
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
        :openType="options.openType"
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
import productForms from "./Forms";
import addToCart from "./AddToCart";
import { delProduct, queryProducts } from "@/api/product";

export default {
  components: {
    productForms,
    addToCart,
  },
  props: {
    openType: {
      //0:录入 1:查看 2:编辑 3:合同录入
      type: Number,
      default: 0,
    },
    queryObject: {
      type: Object,
    },
    parentFun: {
      type: Function,
      default: null,
    },
  },
  data: () => ({
    headers: [
      {
        text: "名称",
        align: "center",
        sortable: false,
        value: "name",
      },
      { text: "品牌", align: "center", value: "brand", sortable: false },
      {
        text: "规格",
        align: "center",
        value: "specification",
        sortable: false,
      },
      {
        text: "供应商",
        align: "center",
        value: "supplier.name",
        sortable: false,
      },
      { text: "库存数量", align: "center", value: "number", sortable: false },
      { text: "单位", align: "center", value: "unit", sortable: false },
      {
        text: "采购/生产价格(元)",
        align: "center",
        value: "purchasedPrice",
        sortable: false,
      },
      {
        text: "标准价格(元)",
        align: "center",
        value: "standardPrice",
        sortable: false,
      },
      {
        text: "供货周期",
        align: "center",
        value: "deliveryCycle",
        sortable: false,
      },
      {
        text: "来源",
        align: "center",
        value: "sourceType.text",
        sortable: false,
      },
      {
        text: "子类别",
        align: "center",
        value: "subtype.text",
        sortable: false,
      },
      { text: "备注", align: "center", value: "remarks", sortable: false },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    options: {
      loading: false,
      total: 1,
      page: 1,
      itemsPerPage: 10,
      openID: null,
      openType: null,
      addDialog: false,
      addItem: {},
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
      queryProducts(
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
    openAddDialog(item) {
      this.options.addItem = item;
      this.options.addDialog = true;
    },
    closeAddDialog() {
      this.options.addItem = {};
      this.options.addDialog = false;
    },
    closeAddDialogForAdd(item) {
      item.totalPrice = item.number * item.price;
      this.parentFun(item);
      this.options.addItem = {};
      this.options.addDialog = false;
    },
    openViewDialog(item, other) {
      setTimeout(() => {
        if (
          this.options.editDialog == false &&
          this.options.deleteDialog == false &&
          this.options.addDialog == false
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
      if (this.$refs.productForms.validateForm()) {
        this.$refs.productForms.editObject();
        this.closeEditDialog();
      }
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
      delProduct(this.options.openID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },
  },
};
</script>