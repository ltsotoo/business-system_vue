<template>
  <v-expansion-panel @click="clickPanel">
    <v-expansion-panel-header :class="[`text-h4`]">
      我的回款追踪任务
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="center">
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-row>
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
                <v-text-field
                  label="合同编号"
                  v-model.trim="queryObject.no"
                  clearable
                  maxlength="20"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.isSpecial"
                  :items="isSpecialItems"
                  item-text="key"
                  item-value="value"
                  label="特殊合同"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.status"
                  :items="statusItems"
                  item-text="key"
                  item-value="value"
                  label="合同状态"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.productionStatus"
                  :items="productionStatusItems"
                  item-text="key"
                  item-value="value"
                  label="生产状态"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.collectionStatus"
                  :items="collectionStatusItems"
                  item-text="key"
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
      <payments
        style="margin-top: 10px"
        :queryObject="queryObject"
        ref="payments"
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import payments from "@/components/my/Payments";
import { queryRegions } from "@/api/dictionary";
export default {
  components: {
    payments,
  },
  data: () => ({
    regionItems: [],
    queryObject: {
      regionUID: "",
      companyName: "",
      customerName: "",
      no: "",
      isSpecial: 0,
      status: 0,
      productionStatus: 0,
      collectionStatus: 0,
      employeeUID: "",
    },
    isSpecialItems: [
      { key: "是", value: 1 },
      { key: "否", value: 2 },
    ],
    statusItems: [
      { key: "审核驳回", value: -1 },
      { key: "待审核", value: 1 },
      { key: "未完成", value: 2 },
      { key: "已完成", value: 3 },
    ],
    productionStatusItems: [
      { key: "生产中", value: 1 },
      { key: "生产完成", value: 2 },
    ],
    collectionStatusItems: [
      { key: "回款中", value: 1 },
      { key: "回款完成", value: 2 },
    ],
  }),
  created() {},
  methods: {
    clickPanel(event) {
      if (
        !event.currentTarget.classList.contains(
          "v-expansion-panel-header--active"
        ) &&
        this.regionItems.length == 0
      ) {
        this.getRegionItems();
      }
    },

    getRegionItems() {
      queryRegions().then((res) => {
        this.regionItems = res.data;
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