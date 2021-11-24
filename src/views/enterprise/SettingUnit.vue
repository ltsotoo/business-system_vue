<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      签订单位设置
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="7">
            <v-text-field
              label="名称"
              clearable
              v-model="queryObject.text"
              counter
              maxlength="50"
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
      />

      <v-dialog
        v-model="addDialog"
        width="500px"
        persistent
        v-if="addDialog"
        @click:outside="closeAddDialog"
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