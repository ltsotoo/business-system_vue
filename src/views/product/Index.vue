<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-col cols="1">
              <v-select
                v-model="queryObject.sourceTypeID"
                :items="sourceTypeItems"
                item-text="text"
                item-value="ID"
                label="来源"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="queryObject.subtypeID"
                :items="subtypeItems"
                item-text="text"
                item-value="ID"
                label="子类别"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="产品名称"
                v-model="queryObject.name"
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="2">
            <v-text-field label="厂商名称"></v-text-field>
          </v-col> -->
            <v-col cols="2">
              <v-text-field
                label="规格"
                v-model="queryObject.specification"
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
              <v-btn rounded color="green" dark @click="goToEntry">
                录入
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <v-row style="margin-top: 10px">
      <v-col>
        <productDataTable :queryObject="queryObject" ref="productDataTable" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import productDataTable from "@/components/product/ProductDataTable";
import { queryDictionaries } from "@/api/dictionary";

export default {
  components: {
    productDataTable,
  },
  data: () => ({
    sourceTypeItems: [],
    subtypeItems: [],
    sourceTypeName: "",
    queryObject: {
      sourceTypeID: null,
      subtypeID: null,
      name: "",
      specification: "",
    },
  }),
  created() {
    this.getProductSoureTypeItems();
  },
  methods: {
    getProductSoureTypeItems() {
      queryDictionaries("product_source_type").then((res) => {
        this.sourceTypeItems = res.data;
      });
    },
    getSubtypeItems(sourceType) {
      queryDictionaries("product_subtype", sourceType).then((res) => {
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
    "queryObject.sourceTypeID": {
      handler: function (val) {
        this.subtypeItems = [];
        this.queryObject.subtypeID = null;
        if (val != null) {
          this.getSubtypeItems(val);
        }
      },
    },
  },
};
</script>