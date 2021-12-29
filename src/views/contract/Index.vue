<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="center">
            <v-spacer></v-spacer>
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
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-select
                    v-model="queryObject.officeUID"
                    :items="officeItems"
                    item-text="name"
                    item-value="UID"
                    label="办事处"
                    :clearable="nos.includes('02-01-02')"
                    :disabled="nos.includes('02-01-01')"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="业务员"
                    v-model.trim="queryObject.employeeName"
                    clearable
                    maxlength="20"
                  ></v-text-field>
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
              </v-row>
              <v-row>
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
                  <v-select
                    v-model="queryObject.invoiceType"
                    :items="invoiceTypeItems"
                    item-text="text"
                    item-value="value"
                    label="开票类型"
                    clearable
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
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
              </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="resetQueryForm">
                重置
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <div style="margin-top: 10px"></div>
        <contractDataTable
          :queryObject="queryObject"
          ref="contractDataTable"
          :statusItems="statusItems"
          :productionStatusItems="productionStatusItems"
          :collectionStatusItems="collectionStatusItems"
        />
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import contractDataTable from "@/components/contract/DataTable";
import {
  queryRegions,
  queryContractStatus,
  queryContractPayTypes,
  queryContractInvoiceTypes,
  queryContractProductionStatus,
  queryContractCollectionStatus,
} from "@/api/dictionary";
import { queryOffices } from "@/api/oadrp";
export default {
  components: {
    contractDataTable,
  },
  data: () => ({
    nos: [],

    officeItems: [],
    regionItems: [],
    payTypeItems: [],
    invoiceTypeItems: [],
    statusItems: [],
    productionStatusItems: [],
    collectionStatusItems: [],
    startMenu: false,
    endMenu: false,
    queryObject: {
      no: "",
      officeUID: "",
      employeeName: "",
      regionUID: "",
      companyName: "",
      customerName: "",
      payType: null,
      isSpecial: 0,
      isPreDeposit: 0,
      status: 0,
      productionStatus: 0,
      collectionStatus: 0,
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
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
    if (this.nos.includes("02-01-01")) {
      this.queryObject.officeUID = localStorage.getItem("office");
    }
    this.getOfficeItems();
    this.getRegionItems();
    this.getStatusItems();
    this.getPayTypeItems();
    this.getInvoiceTypeItems();
    this.getProductionStatusItems();
    this.getCollectionStatusItems();
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getStatusItems() {
      queryContractStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    getPayTypeItems() {
      queryContractPayTypes().then((res) => {
        this.payTypeItems = res.data;
      });
    },
    getInvoiceTypeItems() {
      queryContractInvoiceTypes().then((res) => {
        this.invoiceTypeItems = res.data;
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
    getRegionItems() {
      queryRegions().then((res) => {
        this.regionItems = res.data;
      });
    },
    query() {
      this.$refs.contractDataTable.getObject();
    },
    resetQueryForm() {
      this.$refs.queryForm.reset();
      if (!this.nos.includes("02-01-02") && this.nos.includes("02-01-01")) {
        this.queryObject.officeUID = localStorage.getItem("office");
      }
      this.$refs.contractDataTable.getObject();
    },
  },
};
</script>