<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      公司(办事处)管理
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="5">
            <v-text-field
              label="名称"
              v-model="queryObject.name"
              clearable
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="queryOffices"> 查询 </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" @click="openAddDialog"> 添加 </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <officeDataTable
        ref="officeDataTable"
        :queryObject="queryObject"
      ></officeDataTable>

      <v-dialog
        v-model="addDialog"
        v-if="addDialog"
        width="800px"
        persistent
        @click:outside="closeAddDialog"
      >
        <officeFormsAdd :closeDialog="closeAddDialog" :refresh="queryOffices" />
      </v-dialog>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import officeDataTable from "@/components/enterprise/OfficeDataTable";
import officeFormsAdd from "@/components/enterprise/OfficeFormsAdd";
export default {
  components: {
    officeDataTable,
    officeFormsAdd,
  },
  data: () => ({
    queryObject: {
      name: "",
    },
    addDialog: false,
  }),
  methods: {
    queryOffices() {
      this.$refs.officeDataTable.getObject();
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