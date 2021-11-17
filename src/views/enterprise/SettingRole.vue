<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      职位设置
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="7">
            <v-text-field
              label="职位名称"
              v-model="queryObject.name"
              clearable
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="queryRoles"> 查询 </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" @click="openAddDialog"> 添加 </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <roleDataTable ref="roleDataTable" :queryObject="queryObject" />

      <v-dialog
        v-model="addDialog"
        max-width="500px"
        persistent
        v-if="addDialog"
        @click:outside="closeAddDialog"
      >
        <roleForms :closeDialog="closeAddDialog" :refresh="queryRoles" />
      </v-dialog>
    </v-expansion-panel-content>
  </v-expansion-panel>
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
    queryObject: {
      name: "",
    },
    addDialog: false,
  }),
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