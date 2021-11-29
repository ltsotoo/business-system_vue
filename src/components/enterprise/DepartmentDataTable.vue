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
        <v-btn text color="primary" @click="openEditNameDialog(item)">
          <v-icon left> mdi-pencil </v-icon>
          名称编辑
        </v-btn>
        <!-- <v-btn
          text
          color="error"
          @click="openDelDialog(item.UID)"
          dark
          disabled
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn> -->
      </template>
    </v-data-table>

    <v-dialog
      v-model="editNameDialog"
      v-if="editNameDialog"
      width="800px"
      persistent
      @click:outside="closeEditNameDialog"
    >
      <departmentForms
        :openType="2"
        :closeDialog="closeEditNameDialog"
        :refresh="getObject"
        :parentObj="openItem"
        :officeItems="officeItems"
      />
    </v-dialog>

    <v-dialog
      v-model="delDialog"
      v-if="delDialog"
      width="600px"
      persistent
      @click:outside="closeDelDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定要删除该部门吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="delObject">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeDelDialog"> 取消 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryDepartments, delDepartment } from "@/api/oadrp";
import departmentForms from "./DepartmentForms";
export default {
  components: {
    departmentForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
    officeItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    headers: [
      {
        text: "部门名称",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "默认职位",
        align: "center",
        value: "role.name",
        sortable: false,
      },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    object: [],
    openUID: "",
    openItem: "",
    delDialog: false,
    editNameDialog: false,
  }),
  methods: {
    getObject() {
      queryDepartments(this.queryObject).then((res) => {
        this.object = res.data;
      });
    },
    delObject() {
      delDepartment(this.openUID).then((res) => {
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

    openEditNameDialog(item) {
      this.openItem = JSON.parse(JSON.stringify(item));
      this.editNameDialog = true;
    },
    closeEditNameDialog() {
      this.openItem = {};
      this.editNameDialog = false;
    },
  },
};
</script>