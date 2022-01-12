<template>
  <v-card>
    <v-card-title>我的回款追踪任务</v-card-title>
    <v-card-subtitle>
      <v-form ref="queryForm">
        <v-row align="center">
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-row>
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
                  v-model="queryObject.invoiceType"
                  :items="invoiceTypeItems"
                  item-text="text"
                  item-value="value"
                  label="开票类型"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="合同编号"
                  v-model.trim="queryObject.no"
                  clearable
                  maxlength="30"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="业务员"
                  v-model.trim="queryObject.employeeName"
                  clearable
                  maxlength="20"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
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
      <payments
        style="margin-top: 10px"
        :queryObject="queryObject"
        ref="payments"
        :payTypeItems="payTypeItems"
        :invoiceTypeItems="invoiceTypeItems"
        :collectionStatusItems="collectionStatusItems"
      />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import payments from "@/components/my/Payments";
import {
  queryContractCollectionStatus,
  queryContractPayTypes,
  queryContractInvoiceTypes,
} from "@/api/dictionary";
export default {
  components: {
    payments,
  },
  data: () => ({
    collectionStatusItems: [],
    payTypeItems: [],
    invoiceTypeItems: [],
    startMenu: false,
    endMenu: false,
    queryObject: {
      no: "",
      employeeName: "",
      collectionStatus: 1,
      invoiceType: 0,
      startDate: "",
      endDate: "",
      companyName: "",
      customerName: "",
      isPreDeposit: null,
    },
    isPreDepositItems: [
      { text: "是", value: 1 },
      { text: "否", value: 2 },
    ],
  }),
  created() {
    this.getCollectionStatusItems();
    this.getPayTypeItems();
    this.getInvoiceTypeItems();
  },
  methods: {
    getCollectionStatusItems() {
      queryContractCollectionStatus().then((res) => {
        this.collectionStatusItems = res.data;
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
    query() {
      this.$refs.payments.getObject();
    },
    resetQueryForm() {
      this.$refs.queryForm.reset();
      this.$refs.payments.getObject();
    },
  },
};
</script>