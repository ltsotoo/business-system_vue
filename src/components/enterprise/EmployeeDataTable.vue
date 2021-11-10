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
        <v-btn
          rounded
          color="success"
          dark
          @click="openViewDialog(item)"
          class="mx-2"
        >
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn
          rounded
          color="primary"
          dark
          @click="openEditDialog(item)"
          class="mx-2"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
        <v-btn
          rounded
          color="error"
          dark
          @click="openDelDialog(item.UID)"
          class="mx-2"
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="viewDialog" max-width="500px" v-if="viewDialog">
      <employeeForms :openType="1" :parentObj="openItem" />
    </v-dialog>

    <v-dialog
      v-model="editDialog"
      max-width="500px"
      persistent
      v-if="editDialog"
    >
      <employeeForms
        :closeDialog="closeEditDialog"
        :openType="2"
        :parentObj="openItem"
        :refresh="getObject"
      />
    </v-dialog>

    <v-dialog v-model="delDialog" max-width="500px" persistent v-if="delDialog">
      <v-card>
        <v-card-title class="text-h5">您确定要删除该员工吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="delObject">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDelDialog"> 取消 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryEmployees, delEmployee } from "@/api/employee";
import employeeForms from "@/components/enterprise/EmployeeForms";
export default {
  props: {
    queryObject: {
      type: Object,
    },
  },
  components: {
    employeeForms,
  },
  data: () => ({
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
        text: "电话",
        align: "center",
        value: "phone",
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
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    object: [],
    openUID: "",
    openItem: "",
    viewDialog: false,
    editDialog: false,
    delDialog: false,
  }),
  created() {},
  methods: {
    getObject() {
      queryEmployees(this.queryObject).then((res) => {
        this.object = res.data;
      });
    },
    delObject() {
      delEmployee(this.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDelDialog();
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

    openEditDialog(item) {
      this.openItem = item;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openItem = {};
      this.editDialog = false;
    },

    openViewDialog(item) {
      this.openItem = item;
      this.viewDialog = true;
    },
    closeViewDialog() {
      this.openItem = {};
      this.viewDialog = false;
    },
  },
};
</script>