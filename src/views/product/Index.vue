<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-col cols="2">
              <v-select
                v-model="queryObject.sourceTypeUID"
                :items="sourceTypeItems"
                item-text="text"
                item-value="UID"
                label="类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="queryObject.subtypeUID"
                :items="subtypeItems"
                item-text="text"
                item-value="UID"
                label="子类别"
                :disabled="sourceTypeItems.length == 0"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="产品名称"
                v-model.trim="queryObject.name"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="规格"
                v-model.trim="queryObject.specification"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="resetQueryForm">
                重置
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn
                rounded
                color="success"
                dark
                @click="goToEntry"
                v-if="nos.indexOf('09') > -1"
              >
                录入
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <div style="margin-top: 10px"></div>
    <productDataTable :queryObject="queryObject" ref="productDataTable" />
  </v-container>
</template>

<script>
import productDataTable from "@/components/product/DataTable";
import { queryProductSourceType, queryProductSubtype } from "@/api/dictionary";

export default {
  components: {
    productDataTable,
  },
  data: () => ({
    nos: [],
    sourceTypeItems: [],
    subtypeItems: [],
    sourceTypeName: "",
    queryObject: {
      sourceTypeUID: "",
      subtypeUID: "",
      name: "",
      specification: "",
    },
  }),
  created() {
    this.nos = localStorage.getItem("nos");
    this.getProductSoureTypeItems();
  },
  methods: {
    getProductSoureTypeItems() {
      queryProductSourceType().then((res) => {
        this.sourceTypeItems = res.data.dictionaries;
      });
    },
    getSubtypeItems(parentUID) {
      queryProductSubtype(parentUID).then((res) => {
        this.subtypeItems = res.data;
      });
    },
    query() {
      this.$refs.productDataTable.getObject();
    },
    resetQueryForm() {
      this.$refs.queryForm.reset();
      this.$refs.productDataTable.getObject();
    },
    goToEntry() {
      this.$router.replace("/product/entry");
    },
  },
  watch: {
    "queryObject.sourceTypeUID": {
      handler: function (val) {
        this.subtypeItems = [];
        this.queryObject.subtypeUID = null;
        if (val != null) {
          this.getSubtypeItems(val);
        }
      },
    },
  },
};
</script>