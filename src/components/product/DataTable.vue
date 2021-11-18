<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :items-per-page="5"
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
        <div v-if="openType == 3">
          <v-btn text color="success" @click="transferItem(item)">
            <v-icon left> mdi-plus-thick </v-icon>
            添加
          </v-btn>
        </div>
        <div v-else>
          <v-btn text color="success" @click="openViewDialog(item.UID)">
            <v-icon left> mdi-eye </v-icon>
            查看
          </v-btn>
          <v-btn text color="primary" @click="openEditDialog(item.UID)">
            <v-icon left> mdi-pencil </v-icon>
            库存编辑
          </v-btn>
          <v-btn text color="error" @click="openDeleteDialog(item.UID)">
            <v-icon left> mdi-delete </v-icon>
            删除
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.viewDialog"
      v-if="options.viewDialog"
      max-width="800px"
      persistent
      @click:outside="closeViewDialog"
    >
      <productViewForms :openUID="options.openUID" />
    </v-dialog>

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      max-width="800px"
      persistent
      @click:outside="closeEditDialog"
    >
      <productEditForms
        ref="productEditForms"
        :openUID="options.openUID"
        :refresh="getObject"
        :closeDialog="closeEditDialog"
      />
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
import productViewForms from "./ViewForms";
import productEditForms from "./EditNumber";
import { delProduct, queryProducts } from "@/api/product";

export default {
  components: {
    productViewForms,
    productEditForms,
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
        text: "类型",
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
      {
        text: "名称",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "品牌",
        align: "center",
        value: "brand",
        sortable: false,
      },
      {
        text: "规格",
        align: "center",
        value: "specification",
        sortable: false,
      },
      {
        text: "库存数量",
        align: "center",
        value: "numberCount",
        sortable: false,
      },
      {
        text: "可售数量",
        align: "center",
        value: "number",
        sortable: false,
      },
      {
        text: "单位",
        align: "center",
        value: "unit",
        sortable: false,
      },
      {
        text: "供货周期",
        align: "center",
        value: "deliveryCycle",
        sortable: false,
      },
      {
        text: "标准售价(人民币)",
        align: "center",
        value: "standardPrice",
        sortable: false,
      },
      {
        text: "标准售价(美元)",
        align: "center",
        value: "standardPriceUSD",
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
      total: 1,
      page: 1,
      itemsPerPage: 10,
      openUID: "",
      openType: null,
      isTransfer: false,
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
        this.queryObject,
        this.options.itemsPerPage,
        this.options.page
      ).then((res) => {
        this.options.loading = false;
        if (res.total < this.options.total) {
          this.options.page = 1;
        }
        this.options.total = res.total;
        if (this.options.total != 0) {
          this.object = res.data;
        }
      });
    },
    transferItem(item) {
      this.options.isTransfer = !this.options.isTransfer;
      this.$emit("child-event", item);
    },
    changeTransferStatus() {
      this.options.isTransfer = !this.options.isTransfer;
    },
    openViewDialog(uid) {
      this.options.openUID = uid;
      this.options.viewDialog = true;
    },
    closeViewDialog() {
      this.options.openUID = "";
      this.options.viewDialog = false;
    },
    openEditDialog(uid) {
      this.options.openUID = uid;
      this.options.editDialog = true;
    },
    closeEditDialog() {
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
      delProduct(this.options.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },
  },
};
</script>