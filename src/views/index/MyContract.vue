<template>
  <v-card>
    <v-card-title>我签订的合同</v-card-title>
    <v-card-subtitle>
      <v-form ref="queryForm">
        <v-row align="center">
          <v-col cols="10">
            <v-row>
              <v-col cols="3">
                <v-text-field
                  label="合同编号"
                  v-model.trim="queryObject.no"
                  clearable
                  maxlength="20"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.regionUID"
                  :items="regionItems"
                  item-text="text"
                  item-value="UID"
                  label="省份"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="客户单位"
                  v-model.trim="queryObject.companyName"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="客户名称"
                  v-model.trim="queryObject.customerName"
                  clearable
                  maxlength="20"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.status"
                  :items="statusItems"
                  item-text="text"
                  item-value="value"
                  label="合同状态"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.productionStatus"
                  :items="productionStatusItems"
                  item-text="text"
                  item-value="value"
                  label="生产状态"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.collectionStatus"
                  :items="collectionStatusItems"
                  item-text="text"
                  item-value="value"
                  label="回款状态"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.payType"
                  :items="payTypeItems"
                  item-text="text"
                  item-value="value"
                  label="付款类型"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-menu
                  ref="startMenu"
                  v-model="startMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="queryObject.startDate"
                      label="开始时间"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="zh-cn"
                    scrollable
                    no-title
                    v-model="queryObject.startDate"
                    @change="$refs.yearMenu.save(queryObject.startDate)"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-menu
                  ref="endMenu"
                  v-model="endMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="queryObject.endDate"
                      label="结束时间"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="zh-cn"
                    scrollable
                    no-title
                    v-model="queryObject.endDate"
                    @change="$refs.yearMenu.save(queryObject.endDate)"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.isSpecial"
                  :items="isSpecialItems"
                  item-text="text"
                  item-value="value"
                  label="特殊合同"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.isPreDeposit"
                  :items="isPreDepositItems"
                  item-text="text"
                  item-value="value"
                  label="预存款合同"
                  clearable
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="0.5">
            <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
          </v-col>
          <v-col cols="0.5">
            <v-btn rounded color="primary" dark @click="resetQueryForm">
              重置
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" dark @click="goToEntry">
              录入
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <contracts
        style="margin-top: 10px"
        :queryObject="queryObject"
        ref="contracts"
        :statusItems="statusItems"
        :productionStatusItems="productionStatusItems"
        :collectionStatusItems="collectionStatusItems"
      />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import {
  queryRegions,
  queryContractStatus,
  queryContractPayTypes,
  queryContractProductionStatus,
  queryContractCollectionStatus,
} from "@/api/dictionary";
import contracts from "@/components/my/Contracts";
export default {
  components: {
    contracts,
  },
  data: () => ({
    regionItems: [],
    statusItems: [{ text: "暂存", value: 0 }],
    payTypeItems: [],
    productionStatusItems: [],
    collectionStatusItems: [],
    startMenu: false,
    endMenu: false,
    queryObject: {
      regionUID: "",
      no: "",
      companyName: "",
      customerName: "",
      payType: null,
      isSpecial: 0,
      isPreDeposit: 0,
      status: 2,
      productionStatus: 0,
      collectionStatus: 0,
      employeeUID: "",
      startDate: new Date().getFullYear() + "-01-01",
      endDate: new Date().getFullYear() + "-12-31",
    },
    isSpecialItems: [
      { text: "是", value: 1 },
      { text: "否", value: 2 },
    ],
    isPreDepositItems: [
      { text: "是", value: 1 },
      { text: "否", value: 2 },
    ],
  }),
  created() {
    this.getRegionItems();
    this.getStatusItems();
    this.getPayTypeItems();
    this.getProductionStatusItems();
    this.getCollectionStatusItems();
  },
  methods: {
    getStatusItems() {
      queryContractStatus().then((res) => {
        res.data.forEach((item) => {
          this.statusItems.push(item)
        });
      });
    },
    getPayTypeItems() {
      queryContractPayTypes().then((res) => {
        this.payTypeItems = res.data;
      });
    },
    getProductionStatusItems() {
      queryContractProductionStatus().then((res) => {
        this.productionStatusItems = res.data;
      });
    },
    getCollectionStatusItems() {
      queryContractCollectionStatus().then((res) => {
        this.collectionStatusItems = res.data;
      });
    },
    query() {
      this.$refs.contracts.getObject();
    },
    getRegionItems() {
      queryRegions().then((res) => {
        this.regionItems = res.data;
      });
    },
    resetQueryForm() {
      this.$refs.queryForm.reset();
      this.$refs.contracts.getObject();
    },
    goToEntry() {
      this.$router.replace("entryContract");
    },
  },
};
</script>