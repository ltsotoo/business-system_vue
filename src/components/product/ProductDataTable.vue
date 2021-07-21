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
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="openEditDialog(item.id)"> mdi-pencil </v-icon>
        <v-icon small @click="openDeleteDialog(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

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

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      max-width="800px"
      persistent
    >
      <productForms :openId="options.openId" />
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
import productForms from "./ProductForms";

export default {
  components: {
    productForms,
  },
  data: () => ({
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "产品名称", value: "name", sortable: false },
      { text: "产品品牌", value: "brand", sortable: false },
      { text: "产品规格", value: "specification", sortable: false },
      { text: "厂家来源", value: "vendor" },
      { text: "库存数量", value: "number" },
      { text: "单位", value: "unit", sortable: false },
      { text: "采购/生产价格(元)", value: "purchasedPrice" },
      { text: "标准价格(元)", value: "standardPrice" },
      { text: "供货周期", value: "deliveryCycle", sortable: false },
      { text: "类别", value: "type", sortable: false },
      { text: "备注", value: "remark", sortable: false },
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
        id: "0001",
        name: "产品1",
        brand: "品牌1",
        specification: "规格XXX",
        vendor: "XX厂",
        number: 1,
        unit: "台",
        purchasedPrice: 8000,
        standardPrice: 10000,
        deliveryCycle: "一周",
        type: "A类",
        remark: "XXXXXXXXXX",
      },
    ],
  }),
  methods: {
    getObject() {},
    openEditDialog(id) {
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