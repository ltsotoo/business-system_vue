<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <contractBaseForms ref="contractBase" />
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
      <v-row style="margin-top: 10px" justify="center">
        <v-btn x-large :disabled="!valid" color="success" @click="submit">
          提交
        </v-btn>
      </v-row>
    </v-form>
    <p></p>
  </v-container>
</template>

<script>
import contractBaseForms from "@/components/contract/ContractBaseForms";
import productDataTable from "@/components/product/ProductDataTable";

export default {
  components: {
    contractBaseForms,
    productDataTable,
  },
  data: () => ({
    valid: true,
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
    dateMenu: false,
    productSerchForms: {
      productType: "1",
      productName: "",
    },
  }),

  methods: {
    productSerch() {},
    productSearchCriteriaReset() {
      this.productSerchForms.productType = null;
      this.productSerchForms.productName = "";
    },
    submit() {
      //获取合同基础信息
      console.log(this.$refs.contractBase.forms);
      // this.$refs.form.validate();
    },
  },

  computed: {},
};
</script>