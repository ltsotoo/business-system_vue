<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="roles"
      :items-per-page="5"
      :single-select="true"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="primary" @click="openEditDialog(item.UID)">
          <v-icon left> mdi-pencil </v-icon>
          编辑权限
        </v-btn>
        <v-btn
          text
          color="error"
          @click="openDeleteDialog(item.UID)"
          dark
          disabled
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="editDialog" width="1000px" persistent v-if="editDialog">
      <roleForms
        :closeDialog="closeEditDialog"
        :openUID="openUID"
        :openType="2"
      />
    </v-dialog>

    <v-dialog
      v-model="deleteDialog"
      v-if="deleteDialog"
      width="800px"
      persistent
      @click:outside="closeDeleteDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定删除该职位吗?</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded>确定</v-btn>
          <v-btn color="primary" rounded @click="closeDeleteDialog">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import roleForms from "@/components/role/Forms";
import { queryAllRoles } from "@/api/oadrp.js";
export default {
  props: {
    queryName: {
      type: String,
      default: "",
    },
    queryObject: {
      type: Object,
    },
  },
  components: {
    roleForms,
  },
  data: () => ({
    roles: [],
    headers: [
      {
        text: "职位名称",
        align: "center",
        value: "name",
        sortable: false,
      },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],

    editDialog: false,
    deleteDialog: false,
    openUID: "",
  }),
  created() {
    this.getRoles();
  },
  methods: {
    getRoles() {
      queryAllRoles(this.queryObject.name).then((res) => {
        this.roles = res.data;
      });
    },

    openEditDialog(uid) {
      this.openUID = uid;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openUID = "";
      this.editDialog = false;
      this.getRoles();
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