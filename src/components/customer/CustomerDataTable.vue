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

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      max-width="800px"
      persistent
    >
      <customerForms :openId="options.openId" />
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
import customerForms from "./CustomerForms";

export default {
  components: {
    customerForms,
  },
  data: () => ({
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "客户姓名", value: "name", sortable: false },
      { text: "公司", value: "companyName", sortable: false },
      { text: "课题组", value: "researchGroup", sortable: false },
      { text: "联系电话", value: "phone", sortable: false },
      { text: "微信号", value: "wxCode", sortable: false },
      { text: "电子邮箱", value: "email", sortable: false },
      { text: "区域", value: "areaId" },
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
        name: "客户1号",
        companyName: "公司1号",
        researchGroup: "课题组1号",
        phone: "123456789",
        wxCode: "123444444",
        email: "XXX@XXX.com",
        areaId: "1",
      },
    ],
  }),
  methods: {
    getObject() {},
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