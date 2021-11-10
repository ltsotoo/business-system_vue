<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      办事处管理
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="7">
            <v-text-field
              label="办事处名称"
              clearable
              v-model="queryObject.name"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="queryOffices">
              查询
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" @click="openAddDialog">
              添加
            </v-btn>
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
        max-width="400px"
        persistent
        v-if="addDialog"
      >
        <officeForms :closeDialog="closeAddDialog" :refresh="queryOffices" />
      </v-dialog>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import officeDataTable from "@/components/enterprise/OfficeDataTable";
import officeForms from "@/components/enterprise/OfficeForms";
export default {
  components: {
    officeDataTable,
    officeForms,
  },
  data: () => ({
    queryObject: {
      name: "",
    },
    addDialog: false,
  }),
  methods: {
    queryOffices() {
      this.$refs.officeDataTable.getObject(this.queryObject);
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