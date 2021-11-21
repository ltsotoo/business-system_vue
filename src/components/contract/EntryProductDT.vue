<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :items-per-page="options.itemsPerPage"
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
        <v-btn text color="success" @click="openViewDialog(item)">
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn text color="primary" @click="openP2CDialog(item)">
          <v-icon left> mdi-plus-thick </v-icon>
          添加
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="viewDialog"
      v-if="viewDialog"
      max-width="800px"
      persistent
      @click:outside="closeViewDialog"
    >
      <productViewForms :openItem="openItem" />
    </v-dialog>
  </div>
</template>

<script>
import productViewForms from "@/components/product/ViewForms";
import { queryProducts } from "@/api/product";

export default {
  components: {
    productViewForms,
  },
  props: {
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
        text: "库存可售数量",
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
        text: "标准售价(CNY)",
        align: "center",
        value: "standardPrice",
        sortable: false,
      },
      {
        text: "标准售价(USD)",
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
      itemsPerPage: 5,
      isTransfer: false,
    },
    openItem: {},
    viewDialog: false,
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
    openP2CDialog(item) {
      this.$emit("child-event", item);
    },
    openViewDialog(item) {
      this.openItem = item;
      this.viewDialog = true;
    },
    closeViewDialog() {
      this.openItem = "";
      this.viewDialog = false;
    },
  },
};
</script>