<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      产品子类型设置
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-select
              v-model="queryObject.parentUID"
              :items="dictionaryTypeItems"
              item-text="text"
              item-value="UID"
              label="类型"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="名称"
              clearable
              v-model="queryObject.text"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="queryDepartmentTypes">
              查询
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" disabled>
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
import { queryProductTypes } from "@/api/dictionary";
export default {
  components: {
    dictionaryDataTable,
    dictionaryForms,
  },
  data: () => ({
    dictionaryTypeItems: [],
    dictionaryType: {
      UID: "",
      module: "product",
    },
    queryObject: {
      parentUID:"",
      text: "",
      typeName: "",
    },
  }),
  created() {
    this.getDictionaryTypeItems();
  },
  methods: {
    getDictionaryTypeItems() {
      queryProductTypes().then((res) => {
        this.dictionaryTypeItems = res.data;
      });
    },
    queryDepartmentTypes() {
      this.$refs.dictionaryDataTable.getObject(this.queryObject);
    },
  },
};
</script>