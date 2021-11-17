<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      部门类型设置
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
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="queryDepartmentTypes">
              查询
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" @click="openAddDialog" disabled>
              添加
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <dictionaryDataTable
        ref="dictionaryDataTable"
        :queryObject="queryObject"
      />
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
      typeName: "DepartmentType",
      text: "",
    },
  }),
  methods: {
    queryDepartmentTypes() {
      this.$refs.dictionaryDataTable.getObject(this.queryObject);
    },
  },
};
</script>