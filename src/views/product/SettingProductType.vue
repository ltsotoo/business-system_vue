<template>
  <div>
    <v-card>
      <v-card-title>产品类型管理</v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="5">
              <v-text-field
                label="名称"
                clearable
                v-model="queryObject.name"
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" @click="query"> 查询 </v-btn>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn
                rounded
                color="success"
                @click="openAddDialog"
                v-if="nos.includes('05-02-02')"
              >
                添加
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <productTypeDataTable
          ref="productTypeDataTable"
          :queryObject="queryObject"
          :refresh="query"
        />
      </v-card-subtitle>
    </v-card>

    <v-dialog
      v-model="addDialog"
      width="800px"
      persistent
      v-if="addDialog"
      @click:outside="closeAddDialog"
    >
      <productTypeForms
        :refresh="query"
        :closeDialog="closeAddDialog"
      ></productTypeForms>
    </v-dialog>
  </div>
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
    nos: [],
    dictionaryTypeItems: [],
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