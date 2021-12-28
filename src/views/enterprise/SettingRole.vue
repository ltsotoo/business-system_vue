<template>
  <div>
    <v-card>
      <v-card-title>职位管理</v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="4">
              <v-text-field
                label="职位名称"
                v-model="queryObject.name"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" @click="queryRoles"> 查询 </v-btn>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn
                rounded
                color="success"
                @click="openAddDialog"
                v-if="nos.includes('08-04-02')"
              >
                添加
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <roleDataTable ref="roleDataTable" :queryObject="queryObject" />

        <v-dialog v-model="addDialog" width="800px" persistent v-if="addDialog">
          <roleForms :closeDialog="closeAddDialog" :refresh="queryRoles" />
        </v-dialog>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import roleDataTable from "@/components/role/DataTable";
import roleForms from "@/components/role/Forms";
export default {
  components: {
    roleDataTable,
    roleForms,
  },
  data: () => ({
    nos: [],
    queryObject: {
      name: "",
    },
    addDialog: false,
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
  },
  methods: {
    queryRoles() {
      this.$refs.roleDataTable.getRoles();
    },

    openAddDialog() {
      this.addDialog = true;
    },
    closeAddDialog() {
      this.addDialog = false;
    },
  },
};
</script>