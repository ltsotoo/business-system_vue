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
        <v-btn text color="primary" @click="openEditDialog(item)">
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
        <v-btn text color="error" @click="openDeleteDialog(item.UID)">
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      width="600px"
      persistent
      @click:outside="closeEditDialog"
    >
      <editForms
        :parentObj="options.openItem"
        :refresh="getObject"
        :closeDialog="closeEditDialog"
      />
    </v-dialog>

    <v-dialog v-model="options.deleteDialog" width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5">您确定删除该位客户吗?</v-card-title>
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
import editForms from "./EditForms";
import { delCustomer, queryCustomers } from "@/api/customer";

export default {
  components: {
    editForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      {
        text: "区域",
        align: "center",
        value: "company.area.name",
        sortable: false,
      },
      {
        text: "单位",
        align: "center",
        value: "company.name",
        sortable: false,
      },
      {
        text: "姓名",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "课题组",
        align: "center",
        value: "researchGroup",
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
        text: "电子邮箱",
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
      openItem: {},
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
      queryCustomers(
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
    openEditDialog(item) {
      this.options.openItem = JSON.parse(JSON.stringify(item));
      this.options.editDialog = true;
    },
    closeEditDialog() {
      this.options.openItem = {};
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
      delCustomer(this.options.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },
  },
};
</script>