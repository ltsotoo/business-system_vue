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
          color="primary"
          dark
          @click="openEditNameDialog(item)"
          class="mx-2"
        >
          <v-icon left> mdi-pencil </v-icon>
          修改名称
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

    <v-dialog v-model="delDialog" max-width="500px" persistent v-if="delDialog">
      <v-card>
        <v-card-title class="text-h5">您确定要删除该部门吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="delObject">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDelDialog"> 取消 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="editNameDialog"
      max-width="500px"
      persistent
      v-if="editNameDialog"
    >
      <v-card>
        <v-card-title class="text-h5">修改部门名称</v-card-title>
        <v-card-subtitle>
          <v-text-field label="名称" v-model="openItem.name"></v-text-field>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="editObject">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeEditNameDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryDepartments, editDepartment, delDepartment } from "@/api/oadrp";
export default {
  data: () => ({
    headers: [
      {
        text: "部门名称",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "部门类型",
        align: "center",
        value: "type.text",
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
  created() {
    this.getObject();
  },
  methods: {
    getObject(queryObj) {
      queryDepartments(queryObj).then((res) => {
        this.object = res.data;
      });
    },
    editObject() {
      editDepartment(this.openItem).then((res) => {
        this.getObject();
        this.closeEditNameDialog();
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