<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
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
        <v-btn text color="success" @click="openViewDialog(item.UID)">
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openEditBaseDialog(item.UID)"
          v-if="nos.includes('08-03-04')"
        >
          <v-icon left> mdi-pencil </v-icon>
          基础编辑
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openEditExpenseDialog(item.UID)"
          v-if="nos.includes('08-03-05')"
        >
          <v-icon left> mdi-pencil </v-icon>
          财务编辑
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openEditRoleDialog(item.UID)"
          v-if="nos.includes('08-03-06')"
        >
          <v-icon left> mdi-pencil </v-icon>
          人事编辑
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openResetPwdDialog(item)"
          v-if="nos.includes('08-03-07')"
        >
          <v-icon left> mdi-pencil </v-icon>
          重置密码
        </v-btn>
        <v-btn
          text
          color="error"
          @click="openDelDialog(item.UID)"
          v-if="nos.includes('08-03-08')"
        >
          <v-icon left> mdi-delete </v-icon>
          停用
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="viewDialog"
      v-if="viewDialog"
      width="1000px"
      @click:outside="closeViewDialog"
    >
      <employeeFormsView :openUID="openUID" />
    </v-dialog>

    <v-dialog
      v-model="editDialog"
      v-if="editDialog"
      width="1000px"
      persistent
      @click:outside="closeEditDialog"
    >
      <employeeFormsEdit
        :editType="editType"
        :openUID="openUID"
        :closeDialog="closeEditDialog"
        :refresh="getObject"
      />
    </v-dialog>

    <v-dialog
      v-model="delDialog"
      v-if="delDialog"
      width="1000px"
      persistent
      @click:outside="closeDelDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定要删除该员工吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="delObject">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeDelDialog"> 取消 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="resetPwdDialog"
      v-if="resetPwdDialog"
      width="600px"
      persistent
      @click:outside="closeResetPwdDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定要重置该员工的密码吗?</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="resetObject">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeResetPwdDialog">
            取消
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryEmployees, delEmployee, resetPwd } from "@/api/employee";
import employeeFormsView from "@/components/enterprise/EmployeeFormsView";
import employeeFormsEdit from "@/components/enterprise/EmployeeFormsEdit";
export default {
  components: {
    employeeFormsView,
    employeeFormsEdit,
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
        text: "编号",
        align: "center",
        value: "number",
        sortable: false,
      },
      {
        text: "姓名",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "办事处",
        align: "center",
        value: "office.name",
        sortable: false,
      },
      {
        text: "部门",
        align: "center",
        value: "department.name",
        sortable: false,
      },
      {
        text: "电话",
        align: "center",
        value: "phone",
        sortable: false,
      },
      {
        text: "操作",
        align: "center",
        value: "actions",
        width: "50%",
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
    viewDialog: false,
    editType: 0,
    editDialog: false,
    delDialog: false,
    resetPwdDialog: false,
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryEmployees(
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
    delObject() {
      delEmployee(this.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDelDialog();
      });
    },
    resetObject() {
      resetPwd(this.openItem.UID).then((res) => {
        this.$message.success("重置成功了！");
        this.closeResetPwdDialog();
      });
    },

    openDelDialog(uid) {
      this.openUID = uid;
      this.delDialog = true;
    },
    closeDelDialog() {
      this.openUID = "";
      this.delDialog = false;
    },

    openEditBaseDialog(uid) {
      this.editType = 1;
      this.openUID = uid;
      this.editDialog = true;
    },
    openEditExpenseDialog(uid) {
      this.editType = 2;
      this.openUID = uid;
      this.editDialog = true;
    },
    openEditRoleDialog(uid) {
      this.editType = 3;
      this.openUID = uid;
      this.editDialog = true;
    },

    closeEditDialog() {
      this.editType = 0;
      this.openUID = "";
      this.editDialog = false;
    },

    openViewDialog(uid) {
      this.openUID = uid;
      this.viewDialog = true;
    },
    closeViewDialog() {
      this.openUID = "";
      this.viewDialog = false;
    },

    openResetPwdDialog(item) {
      this.openItem = item;
      this.resetPwdDialog = true;
    },
    closeResetPwdDialog() {
      this.openItem = {};
      this.resetPwdDialog = false;
    },
  },
};
</script>