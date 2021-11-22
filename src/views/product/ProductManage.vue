<template>
  <div>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-select
                v-model="sourceType"
                :items="sourceTypeItems"
                item-text="text"
                label="类型"
                return-object
                clearable
                @change="getSubtypeItems"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="queryObject.subtypeUID"
                :items="subtypeItems"
                item-text="text"
                item-value="UID"
                label="子类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="产品名称"
                v-model.trim="queryObject.name"
                clearable
                counter
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="规格"
                v-model.trim="queryObject.specification"
                clearable
                counter
                maxlength="50"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="success" dark @click="openAddDialog">
                添加
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <productDataTable :queryObject="queryObject" ref="productDataTable" />
      </v-card-subtitle>
    </v-card>

    <v-dialog v-model="addDialog" v-if="addDialog" width="800px" persistent>
      <productEntryForms :refresh="query" :closeDialog="closAddDialog" />
    </v-dialog>
  </div>
</template>

<script>
import productDataTable from "@/components/product/DataTable";
import productEntryForms from "@/components/product/EntryForms";
import { queryProductTypes, queryDictionaries } from "@/api/dictionary";

export default {
  components: {
    productDataTable,
    productEntryForms,
  },
  data: () => ({
    sourceTypeItems: [],
    subtypeItems: [],
    sourceType: {},
    queryObject: {
      sourceTypeUID: "",
      subtypeUID: "",
      name: "",
      specification: "",
    },

    addDialog: false,
  }),
  created() {
    this.getProductSoureTypeItems();
  },
  methods: {
    getProductSoureTypeItems() {
      queryProductTypes().then((res) => {
        this.sourceTypeItems = res.data;
      });
    },
    getSubtypeItems() {
      this.queryObject.subtypeUID = "";
      this.subtypeItems = [];
      if (this.sourceType) {
        this.queryObject.sourceTypeUID = this.sourceType.UID;
        queryDictionaries(this.sourceType.name).then((res) => {
          this.subtypeItems = res.data;
        });
      } else {
        this.queryObject.sourceTypeUID = "";
      }
    },
    query() {
      this.$refs.productDataTable.getObject();
    },

    openAddDialog() {
      this.addDialog = true;
    },
    closAddDialog() {
      this.addDialog = false;
    },
  },
};
</script>