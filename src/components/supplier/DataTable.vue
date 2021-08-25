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
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="openEditDialog(item.UID)"> mdi-pencil </v-icon>
        <v-icon @click="openDeleteDialog(item.UID)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      max-width="800px"
      persistent
    >
      <supplierForms
        :openUID="options.openUID"
        :openType="options.openType"
        ref="supplierForms"
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
        <v-card-title class="text-h5">您确定删除该位供应商吗?</v-card-title>
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
import supplierForms from "./Forms";
import { delSupplier, querySuppliers } from "@/api/supplier";

export default {
  components: {
    supplierForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      {
        text: "名称",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "地址",
        align: "center",
        value: "address",
        sortable: false,
      },
      {
        text: "联系人",
        align: "center",
        value: "linkman",
        sortable: false,
      },
      {
        text: "联系电话",
        align: "center",
        value: "phone",
        sortable: false,
      },
      {
        text: "微信号",
        align: "center",
        value: "wechatID",
        sortable: false,
      },
      {
        text: "邮箱",
        align: "center",
        value: "email",
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
      total: 0,
      page: 1,
      itemsPerPage: 10,
      openUID: "",
      openType: null,
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
      querySuppliers(
        this.queryObject,
        this.options.itemsPerPage,
        this.options.page
      ).then((res) => {
        this.options.loading = false;
        if (res.total < this.options.total) {
          this.options.page = 1;
        }
        this.options.total = res.total;
        this.object = res.data;
      });
    },
    openEditDialog(uid) {
      this.options.openUID = uid;
      this.options.openType = 2;
      this.options.editDialog = true;
    },
    closeEditDialog() {
      this.options.openUID = "";
      this.options.openType = null;
      this.options.editDialog = false;
    },
    editItem() {
      if (this.$refs.supplierForms.validateForm()) {
        this.$refs.supplierForms.editObject();
        this.closeEditDialog();
      }
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
      delSupplier(this.options.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },
  },
};
</script>