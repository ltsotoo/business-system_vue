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
        <v-btn text color="success" @click="openViewDialog(item)">
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openEditDialog(item)"
          v-if="nos.includes('06-01-03')"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
        <!-- <v-btn
          text
          color="error"
          @click="openDeleteDialog(item.UID)"
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn> -->
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.viewDialog"
      v-if="options.viewDialog"
      width="1000px"
      persistent
      @click:outside="closeViewDialog"
    >
      <supplierForms :parentObj="options.openItem" openType="1" />
    </v-dialog>

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      width="1000px"
      persistent
      @click:outside="closeEditDialog"
    >
      <supplierForms
        ref="supplierForms"
        :parentObj="options.openItem"
        openType="2"
        :refresh="getObject"
        :closeDialog="closeEditDialog"
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
        <v-card-title class="text-h5">您确定删除该位供应商吗?</v-card-title>
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
    nos: [],

    headers: [
      {
        text: "名称",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "网站",
        align: "center",
        value: "web",
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
      viewDialog: false,
    },
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

    openViewDialog(item) {
      this.options.openItem = JSON.parse(JSON.stringify(item));
      this.options.viewDialog = true;
    },
    closeViewDialog() {
      this.options.openItem = {};
      this.options.viewDialog = false;
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