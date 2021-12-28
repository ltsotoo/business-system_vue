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
      <template v-slot:[`item.status`]="{ item }">
        {{ statusToText(item.status) }}
      </template>
      <template v-slot:[`item.remarks`]="{ item }">
        <v-textarea v-model="item.remarks" readonly rows="1" auto-grow>
        </v-textarea>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div v-if="item.status == 1">
          <v-btn
            text
            color="primary"
            @click="openApproveDialog(item.UID)"
            v-if="nos.includes('07-02-04')"
          >
            <v-icon left> mdi-pencil </v-icon>
            回款
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="openEditDialog(item)"
            v-if="nos.includes('07-02-03')"
          >
            <v-icon left> mdi-pencil </v-icon>
            编辑
          </v-btn>
        </div>
        <!-- <v-btn text color="error" @click="openDeleteDialog(item.UID)">
            <v-icon left> mdi-delete </v-icon>
            删除
          </v-btn> -->
      </template>
    </v-data-table>

    <v-dialog
      v-model="editDialog"
      v-if="editDialog"
      persistent
      @click:outside="closeEditDialog"
    >
      <editForms
        :parentObj="openItem"
        :refresh="getObject"
        :closeDialog="closeEditDialog"
      />
    </v-dialog>

    <v-dialog
      v-model="approveDialog"
      v-if="approveDialog"
      width="800px"
      persistent
      @click:outside="closeApproveDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定该保证金已经退还了吗?</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="approveItem">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeApproveDialog"
            >取消</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="deleteDialog"
      v-if="deleteDialog"
      width="800px"
      persistent
      @click:outside="closeDeleteDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定删除条记录吗?</v-card-title>
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
import { delBidBond, queryBidBonds, approve } from "@/api/bidbond";
import editForms from "./EditForms";
export default {
  components: {
    editForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
    statusItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    nos: [],

    headers: [
      {
        text: "录入时间",
        align: "center",
        value: "CreatedAt",
        sortable: false,
      },
      {
        text: "办事处",
        align: "center",
        value: "salesman.office.name",
        sortable: false,
      },
      {
        text: "业务员",
        align: "center",
        value: "salesman.name",
        sortable: false,
      },
      {
        text: "录入财务",
        align: "center",
        value: "employee.name",
        sortable: false,
      },
      {
        text: "回款确认财务",
        align: "center",
        value: "finalEmployee.name",
        sortable: false,
      },
      {
        text: "金额(元)",
        align: "center",
        value: "money",
        sortable: false,
      },
      {
        text: "备注",
        align: "center",
        value: "remarks",
        sortable: false,
      },
      {
        text: "状态",
        align: "center",
        value: "status",
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
    approveDialog: false,
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
      queryBidBonds(
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
    approveItem() {
      approve(this.openUID).then((res) => {
        this.$message.success("回款完成！");
        this.getObject();
        this.closeApproveDialog();
      });
    },
    deleteItem() {
      delBidBond(this.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },

    openApproveDialog(uid) {
      this.openUID = uid;
      this.approveDialog = true;
    },
    closeApproveDialog() {
      this.openUID = "";
      this.approveDialog = false;
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

    statusToText(status) {
      var temp = "";
      this.statusItems.some((item) => {
        if (item.value == status) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
  },
};
</script>

