<template>
  <div>
    <contractBaseForms
      :openID="openID"
      :openType="openType"
      ref="contractBaseForms"
    />
    <div v-if="openType == 0">
      <v-card style="margin-top: 10px">
        <v-card-subtitle>
          <p :class="`text-h6`" class="text--primary">产品搜索条件：</p>
          <v-form ref="queryForm">
            <v-row align="baseline">
              <v-col cols="3">
                <v-select
                  v-model="queryObject.sourceTypeID"
                  :items="sourceTypeItems"
                  item-text="text"
                  item-value="ID"
                  label="来源"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.subtypeID"
                  :items="subtypeItems"
                  item-text="text"
                  item-value="ID"
                  label="子类别"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="queryObject.name"
                  label="产品名称"
                ></v-text-field>
              </v-col>
              <v-col cols="auto">
                <v-btn rounded color="primary" dark @click="getProducts">
                  查询
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn rounded color="primary" dark @click="resetQueryForm">
                  重置
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <p :class="`text-h6`" class="text--primary">产品列表：查询结果</p>
          <productDataTable
            ref="productDataTable"
            :queryObject="queryObject"
            :openType="2"
            :parentFun="addProductForCart"
          />
          <p :class="`text-h6`" class="text--primary" style="margin-top: 20px">
            已选择产品列表：
          </p>
          <div>
            <contractCartDataTable ref="contractCartDataTable" />
          </div>
        </v-card-subtitle>
      </v-card>
    </div>
    <div v-else>
      <taskDataTable
        style="margin-top: 1px"
        ref="taskDataTable"
        :openID="openID"
      />
    </div>
  </div>
</template>

<script>
import contractBaseForms from "./ContractBaseForms";
import contractCartDataTable from "./ContractCartDataTable";
import productDataTable from "../product/ProductDataTable";
import taskDataTable from "../task/TaskDataTable";
import { queryDictionaries } from "@/api/dictionary";
import { entryContract } from "@/api/contract";

export default {
  components: {
    contractBaseForms,
    contractCartDataTable,
    productDataTable,
    taskDataTable,
  },
  props: {
    openType: {
      //0:录入 1:查看 2:编辑
      type: Number,
      default: 0,
    },
    openID: {
      type: Number,
    },
    parentFun: {
      type: Function,
      default: null,
    },
  },
  data: () => ({
    sourceTypeItems: [],
    subtypeItems: [],
    object: {},
    queryObject: {
      sourceTypeID: null,
      subtypeID: null,
      name: "",
    },
  }),
  created() {
    this.getProductSoureTypeItems();
  },
  methods: {
    addProductForCart(product) {
      this.$refs.contractCartDataTable.addProduct(product);
    },
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
    getProducts() {
      this.$refs.productDataTable.getObject();
    },
    resetQueryForm() {
      this.$refs.queryForm.reset();
      this.$refs.productDataTable.getObject();
    },
    entryObject() {
      this.object = this.$refs.contractBaseForms.object;
      this.object.tasks = this.$refs.contractCartDataTable.object;
      entryContract(this.object).then((res) => {
        this.$message.success("录入成功了!");
        if (this.parentFun) {
          this.parentFun(false);
        }
      });
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