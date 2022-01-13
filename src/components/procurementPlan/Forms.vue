<template>
  <v-card>
    <v-card-title v-if="openType == 0">添加采购计划</v-card-title>
    <v-card-title v-if="openType == 1">查看采购计划</v-card-title>
    <v-card-title v-if="openType == 2">编辑采购计划</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="3">
            <v-text-field
              label="合同编号"
              v-model="object.no"
              :rules="rules.must"
              counter
              maxlength="50"
              :disabled="openType == 2"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="客户"
              v-model="object.customer"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="3" v-if="openType != 0">
            <v-text-field
              label="申请人"
              v-model="object.employee.name"
              :disabled="openType == 2"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-menu
              ref="startDateMenu"
              v-model="startDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="object.startDate"
                  label="申请日期"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="zh-cn"
                scrollable
                no-title
                v-model="object.startDate"
                min="1900-01-01"
                @change="$refs.startDateMenu.save(object.startDate)"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="2">
            <v-text-field
              label="类别"
              v-model="object.type"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="物品"
              v-model="object.product"
              counter
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="规格类型"
              v-model="object.specification"
              counter
              maxlength="200"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="使用数量"
              v-model.number="object.userNumber"
              :rules="rules.number"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="采购数量"
              v-model.number="object.buyNumber"
              :rules="rules.number"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="单位"
              v-model="object.unit"
              counter
              maxlength="9"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="要求描述/链接"
              v-model="object.description"
              rows="3"
              counter
              maxlength="200"
            >
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="技术备注"
              v-model="object.remarks"
              rows="3"
              counter
              maxlength="500"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <v-menu
              ref="buyDateMenu"
              v-model="buyDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="object.buyDate"
                  label="采购/下单日期"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="zh-cn"
                scrollable
                no-title
                v-model="object.buyDate"
                min="1900-01-01"
                @change="$refs.buyDateMenu.save(object.buyDate)"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-menu
              ref="arriveDateMenu"
              v-model="arriveDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="object.arriveDate"
                  label="到货日期"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="zh-cn"
                scrollable
                no-title
                v-model="object.arriveDate"
                min="1900-01-01"
                @change="$refs.arriveDateMenu.save(object.arriveDate)"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="采购备注"
              v-model="object.buyRemarks"
              rows="3"
              counter
              maxlength="500"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <v-menu
              ref="payDateMenu"
              v-model="payDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="object.payDate"
                  label="付款日期"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="zh-cn"
                scrollable
                no-title
                v-model="object.payDate"
                min="1900-01-01"
                @change="$refs.payDateMenu.save(object.payDate)"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="付款单位"
              v-model="object.payUnit"
              counter
              maxlength="9"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="付款备注"
              v-model="object.payRemarks"
              rows="3"
              counter
              maxlength="500"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <v-menu
              ref="warehouseInDateMenu"
              v-model="warehouseInDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="object.warehouseInDate"
                  label="入库日期"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="zh-cn"
                scrollable
                no-title
                v-model="object.warehouseInDate"
                min="1900-01-01"
                @change="$refs.warehouseInDateMenu.save(object.warehouseInDate)"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-menu
              ref="warehouseOutDateMenu"
              v-model="warehouseOutDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="object.warehouseOutDate"
                  label="出库日期"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="zh-cn"
                scrollable
                no-title
                v-model="object.warehouseOutDate"
                min="1900-01-01"
                @change="
                  $refs.warehouseOutDateMenu.save(object.warehouseOutDate)
                "
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="库房备注"
              v-model="object.warehouseRemarks"
              rows="3"
              counter
              maxlength="500"
            >
            </v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions v-if="openType != 1">
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  entryProcurementPlan,
  editProcurementPlan,
} from "@/api/procurementPlan";
export default {
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    openItem: {
      type: Object,
    },
    refresh: {
      type: Function,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    startDateMenu: false,
    buyDateMenu: false,
    arriveDateMenu: false,
    payDateMenu: false,
    warehouseInDateMenu: false,
    warehouseOutDateMenu: false,
    object: {
      ID: null,
      no: null,
      customer: "",
      employeeUID: "",
      startDate: "",
      type: "",
      product: "",
      specification: "",
      userNumber: 0,
      buyNumber: 0,
      unit: "",
      description: "",
      remarks: "",
      buyDate: "",
      arriveDate: "",
      buyRemarks: "",
      payDate: "",
      payUnit: "",
      payRemarks: "",
      warehouseInDate: "",
      warehouseOutDate: "",
      warehouseRemarks: "",
      employee: {
        name: "",
      },
    },
    rules: {
      must: [(v) => !!v || "必填项"],
      number: [(v) => /^((0)|([1-9]\d*))$/.test(v) || "大于等于零的整数"],
      money: [
        (v) => /^\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },
  }),
  created() {
    if (this.openType > 0) {
      this.object = JSON.parse(JSON.stringify(this.openItem));
    }
  },
  methods: {
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        if (this.openType == 0) {
          entryProcurementPlan(this.object).then((res) => {
            this.$message.success("添加成功了!");
            this.refresh();
            this.closeDialog();
          });
        } else if (this.openType == 2) {
          editProcurementPlan(this.object).then((res) => {
            this.$message.success("编辑成功了!");
            this.refresh();
            this.closeDialog();
          });
        }
      } else {
        this.submitDisabled = false;
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>