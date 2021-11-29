<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      合同签订单位管理
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="4">
            <v-text-field
              label="名称"
              clearable
              v-model="queryObject.text"
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="queryUnits"> 查询 </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" @click="openAddDialog"> 添加 </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <dictionaryDataTable
        ref="dictionaryDataTable"
        :queryObject="queryObject"
        :refresh="queryUnits"
      />

      <v-dialog
        v-model="addDialog"
        width="800px"
        persistent
        v-if="addDialog"
      >
        <dictionaryForms
          :closeDialog="closeAddDialog"
          :refresh="queryUnits"
          :typeName="queryObject.typeName"
        />
      </v-dialog>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import dictionaryDataTable from "@/components/dictionary/DataTable";
import dictionaryForms from "@/components/dictionary/Forms";
export default {
  components: {
    dictionaryDataTable,
    dictionaryForms,
  },
  data: () => ({
    queryObject: {
      typeName: "ContractUnit",
      text: "",
    },
    addDialog: false,
  }),
  methods: {
    queryUnits() {
      this.$refs.dictionaryDataTable.getObject(this.queryObject);
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