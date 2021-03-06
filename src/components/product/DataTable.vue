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
        <v-row no-gutters>
          <v-col cols="12">
            <v-btn text color="success" @click="openViewDialog(item)">
              <v-icon left> mdi-eye </v-icon>
              查看
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn
              text
              color="primary"
              @click="openEditBaseDialog(item)"
              v-if="!isCart && nos.includes('05-01-03')"
            >
              <v-icon left> mdi-pencil </v-icon>
              基础编辑
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn
              text
              color="primary"
              @click="openEditNumberDialog(item.UID)"
              v-if="!isCart && nos.includes('05-01-04')"
            >
              <v-icon left> mdi-pencil </v-icon>
              库存编辑
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn
              text
              color="primary"
              @click="openEditPriceDialog(item.UID)"
              v-if="!isCart && nos.includes('05-01-05')"
            >
              <v-icon left> mdi-pencil </v-icon>
              价格编辑
            </v-btn>
          </v-col>
          <!-- <v-col cols="12">
            <v-btn
              text
              color="error"
              @click="openDeleteDialog(item.UID)"
              v-if="!isCart"
            >
              <v-icon left> mdi-delete </v-icon>
              删除
            </v-btn>
          </v-col> -->
        </v-row>

        <v-btn text color="primary" @click="openP2CDialog(item)" v-if="isCart">
          <v-icon left> mdi-plus-thick </v-icon>
          添加
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.viewDialog"
      v-if="options.viewDialog"
      width="1000px"
      persistent
      @click:outside="closeViewDialog"
    >
      <productViewForms :openItem="openItem" />
    </v-dialog>

    <v-dialog
      v-model="options.editBaseDialog"
      v-if="options.editBaseDialog"
      width="1000px"
      persistent
      @click:outside="closeEditBaseDialog"
    >
      <productEditBase
        :openItem="openItem"
        :refresh="getObject"
        :closeDialog="closeEditBaseDialog"
      />
    </v-dialog>

    <v-dialog
      v-model="options.editNumberDialog"
      v-if="options.editNumberDialog"
      width="1000px"
      persistent
      @click:outside="closeEditNumberDialog"
    >
      <productEditNumber
        :openUID="options.openUID"
        :refresh="getObject"
        :closeDialog="closeEditNumberDialog"
      />
    </v-dialog>

    <v-dialog
      v-model="options.editPriceDialog"
      v-if="options.editPriceDialog"
      width="1000px"
      persistent
      @click:outside="closeEditPriceDialog"
    >
      <productEditPrice
        :openUID="options.openUID"
        :refresh="getObject"
        :closeDialog="closeEditPriceDialog"
      />
    </v-dialog>

    <v-dialog
      v-model="options.deleteDialog"
      v-if="options.deleteDialog"
      width="800px"
      persistent
      @click:outside="closeDeleteDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定删除该产品吗?</v-card-title>
        <v-card-subtitle></v-card-subtitle>
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
import productEditBase from "./EditBase";
import productEditNumber from "./EditNumber";
import productEditPrice from "./EditPrice";
import { delProduct, queryProducts } from "@/api/product";

export default {
  components: {
    productViewForms,
    productEditBase,
    productEditNumber,
    productEditPrice,
  },
  props: {
    isCart: {
      //0:录入 1:查看 2:编辑
      type: Boolean,
      default: false,
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
    nos: [],

    headers: [
      {
        text: "类型",
        align: "center",
        value: "type.name",
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
        width: "10%",
      },
    ],

    options: {
      loading: false,
      total: 1,
      page: 1,
      itemsPerPage: 5,
      openUID: "",
      viewDialog: false,
      editBaseDialog: false,
      editNumberDialog: false,
      editPriceDialog: false,
      deleteDialog: false,
    },
    openItem: "",
    object: [],
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
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
    openViewDialog(item) {
      this.openItem = item;
      this.options.viewDialog = true;
    },
    closeViewDialog() {
      this.openItem = "";
      this.options.viewDialog = false;
    },
    openEditBaseDialog(item) {
      this.openItem = JSON.parse(JSON.stringify(item));
      this.options.editBaseDialog = true;
    },
    closeEditBaseDialog() {
      this.openItem = "";
      this.options.editBaseDialog = false;
    },
    openEditNumberDialog(uid) {
      this.options.openUID = uid;
      this.options.editNumberDialog = true;
    },
    closeEditNumberDialog() {
      this.options.openUID = "";
      this.options.editNumberDialog = false;
    },
    openEditPriceDialog(uid) {
      this.options.openUID = uid;
      this.options.editPriceDialog = true;
    },
    closeEditPriceDialog() {
      this.options.openUID = "";
      this.options.editPriceDialog = false;
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

    //合同录入时添加购物车用
    openP2CDialog(item) {
      this.$emit("child-event", item);
    },
  },
};
</script>