<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      产品类型设置
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="7">
            <v-text-field
              label="名称"
              clearable
              v-model="queryObject.name"
              counter
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="query"> 查询 </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" @click="openAddDialog"> 添加 </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <productTypeDataTable
        ref="productTypeDataTable"
        :queryObject="queryObject"
      />

      <v-dialog
        v-model="addDialog"
        width="500px"
        persistent
        v-if="addDialog"
        @click:outside="closeAddDialog"
      >
        <productTypeForms
          :refresh="query"
          :closeDialog="closeAddDialog"
        ></productTypeForms>
      </v-dialog>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import productTypeDataTable from "@/components/productType/DataTable";
import productTypeForms from "@/components/productType/Forms";
export default {
  components: {
    productTypeDataTable,
    productTypeForms,
  },
  data: () => ({
    dictionaryTypeItems: [],
    queryObject: {
      name: "",
    },
    addDialog: false,
  }),
  methods: {
    query() {
      this.$refs.productTypeDataTable.getObject();
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