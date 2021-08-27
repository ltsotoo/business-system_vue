<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="roles"
      :items-per-page="5"
      :single-select="true"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="openEditDialog(item.UID)"> mdi-pencil </v-icon>
        <v-icon @click="openDepartmentDelDialog(item.UID)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog
      v-model="editDialog"
      max-width="600px"
      persistent
      v-if="editDialog"
    >
      <roleForms
        :closeDialog="closeEditDialog"
        :openUID="openUID"
        :openType="2"
      />
    </v-dialog>
  </div>
</template>

<script>
import roleForms from "@/components/role/Forms";
import { queryRoles } from "@/api/oadrp.js";
export default {
  props: {
    queryName: {
      type: String,
      default: "",
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
      {
        text: "部门类型默认",
        align: "center",
        value: "department.text",
        sortable: false,
      },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    editDialog: false,
    openUID: "",
  }),
  created() {
    this.getRoles();
  },
  methods: {
    getRoles() {
      queryRoles(this.queryName).then((res) => {
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
  },
};
</script>