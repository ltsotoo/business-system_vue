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
          <v-row align="baseline">
            <v-col cols="3">
              <v-select
                v-model="productSerchForms.productType"
                :items="productTypeList"
                label="选择类型"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="productSerchForms.productType"
                :items="productTypeList"
                label="选择类型"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="productSerchForms.productName"
                label="产品名称"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="productSerch">
                查询
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                rounded
                color="primary"
                dark
                @click="productSearchCriteriaReset"
              >
                重置
              </v-btn>
            </v-col>
          </v-row>
          <p :class="`text-h6`" class="text--primary">产品列表：查询结果</p>
          <productDataTable />
          <p :class="`text-h6`" class="text--primary" style="margin-top: 20px">
            已选择产品列表：
          </p>
          <div>
            <productDataTable />
          </div>
        </v-card-subtitle>
      </v-card>
    </div>
    <div v-else>
      <taskDataTable style="margin-top: 1px" />
    </div>
  </div>
</template>

<script>
import contractBaseForms from "./ContractBaseForms";
import productDataTable from "../product/ProductDataTable";
import taskDataTable from "../task/TaskDataTable";

export default {
  components: {
    contractBaseForms,
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
  },
  data: () => ({
    signingCompanyList: [
      { text: "公司1", value: "1" },
      { text: "公司2", value: "2" },
      { text: "公司3", value: "3" },
    ],
    productTypeList: [
      { text: "类型A", value: "1" },
      { text: "类型B", value: "2" },
      { text: "类型C", value: "3" },
    ],
    productSerchForms: {
      productType: "1",
      productName: "",
    },
  }),
  created() {},
  methods: {
    productSerch() {},
    productSearchCriteriaReset() {
      this.productSerchForms.productType = null;
      this.productSerchForms.productName = "";
    },
  },
};
</script>