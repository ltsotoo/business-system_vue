<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :items-per-page="5"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="primary" @click="openAddCustomerDialog(item)">
          <v-icon left> mdi-plus-thick </v-icon>
          添加客户
        </v-btn>
        <v-btn text color="primary" @click="openEditDialog(item)">
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
        <!-- <v-btn
          text
          color="error"
          @click="openDeleteDialog(item.UID)"
          dark
          disabled
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn> -->
      </template>
    </v-data-table>

    <v-dialog
      v-model="deleteDialog"
      v-if="deleteDialog"
      width="800px"
      persistent
      @click:outside="closeDeleteDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定删除该客户公司吗?</v-card-title>
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

    <v-dialog
      v-model="addCustomerDialog"
      v-if="addCustomerDialog"
      width="1000px"
      persistent
    >
      <customerAddForms
        :company="openItem"
        :closeDialog="closeAddCustomerDialog"
        :refresh="refreshCustomers"
      ></customerAddForms>
    </v-dialog>

    <v-dialog
      v-model="editDialog"
      v-if="editDialog"
      width="1000px"
      persistent
      @click:outside="closeEditDialog"
    >
      <edit
        :parentObj="openItem"
        :refresh="getObject"
        :closeDialog="closeEditDialog"
      ></edit>
    </v-dialog>
  </div>
</template>

<script>
import { queryCompanys, delCompany } from "@/api/customer";
import customerAddForms from "@/components/customer/AddForms";
import edit from "./Edit";
export default {
  components: {
    customerAddForms,
    edit,
  },
  props: {
    refreshCustomers: {
      type: Function,
    },
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      {
        text: "省份",
        align: "center",
        value: "region.text",
        sortable: false,
      },
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
    },
    object: [],

    openUID: "",
    openItem: {},
    editDialog: false,
    deleteDialog: false,

    addCustomerDialog: false,
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryCompanys(this.queryObject).then((res) => {
        this.object = res.data;
      });
    },
    deleteItem() {
      delCompany(this.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },

    openAddCustomerDialog(item) {
      this.openItem = item;
      this.addCustomerDialog = true;
    },
    closeAddCustomerDialog() {
      this.openItem = {};
      this.addCustomerDialog = false;
    },

    openEditDialog(item) {
      this.openItem = JSON.parse(JSON.stringify(item));
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openItem = {};
      this.editDialog = false;
    },

    openDeleteDialog(uid) {
      this.openUID = uid;
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.openUID = "";
      this.deleteDialog = false;
    },
  },
};
</script>