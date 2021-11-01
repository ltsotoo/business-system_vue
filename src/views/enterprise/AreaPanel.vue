<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      区域管理
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="4">
            <v-text-field
              label="区域名称"
              clearable
              v-model="queryObject.name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="办事处名称"
              clearable
              v-model="queryObject.officeName"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" dark @click="queryAreas">
              查询
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" dark @click="openAddDialog">
              添加
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <areaDataTable
        ref="areaDataTable"
        :queryObject="queryObject"
      ></areaDataTable>
      <v-dialog
        v-model="addDialog"
        max-width="500px"
        persistent
        v-if="addDialog"
      >
        <areaForms :closeDialog="closeAddDialog" :refresh="queryAreas" />
      </v-dialog>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import areaDataTable from "@/components/enterprise/AreaDataTable";
import areaForms from "@/components/enterprise/AreaForms";
export default {
  components: {
    areaDataTable,
    areaForms,
  },
  data: () => ({
    queryObject: {
      name: "",
      officeName: "",
    },
    addDialog: false,
  }),
  methods: {
    queryAreas() {
      this.$refs.areaDataTable.getObject(this.queryObject);
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