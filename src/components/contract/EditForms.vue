<template>
  <div>
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-form ref="form">
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="object.areaUID"
                item-text="name"
                item-value="UID"
                :items="areaItems"
                label="区域"
                :rules="rules.areaUID"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="object.employeeUID"
                item-text="name"
                item-value="UID"
                :items="employeeItems"
                label="业务员"
                :rules="rules.employeeUID"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-radio-group v-model="object.isEntryCustomer" row>
                <template v-slot:label>
                  <div>客户类型</div>
                </template>
                <v-radio label="已录入客户" :value="true"></v-radio>
                <v-radio label="未录入客户" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row align="center" v-if="object.isEntryCustomer == true">
            <v-col class="d-flex" cols="4">
              <v-select
                v-model="object.customer.companyUID"
                item-text="name"
                item-value="UID"
                :items="companyItems"
                label="客户公司"
                :rules="rules.companyUID"
              ></v-select>
            </v-col>

            <v-col class="d-flex" cols="4">
              <v-select
                v-model="object.customerUID"
                item-text="name"
                item-value="UID"
                :items="customerItems"
                label="客户名称"
                :rules="rules.customerUID"
              ></v-select>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col cols="3">
              <v-select
                v-model="object.customer.companyUID"
                item-text="name"
                item-value="UID"
                :items="companyItems"
                label="客户公司"
                :rules="rules.companyUID"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="客户名称"
                v-model="object.customer.name"
                :rules="rules.customerName"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="客户课题组"
                v-model="object.customer.researchGroup"
                :rules="rules.customerResearchGroup"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="客户电话"
                v-model="object.customer.phone"
                :rules="rules.customerPhone"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-select
                v-model="object.contractUnitUID"
                item-text="text"
                item-value="UID"
                :items="contractUnitItems"
                label="签订单位"
                :rules="rules.contractUnitUID"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-menu
                ref="contractDateMenu"
                v-model="contractDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="object.contractDate"
                    label="签订日期"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="rules.contractDate"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="zh-cn"
                  v-model="object.contractDate"
                  min="2000-01-01"
                  @change="$refs.contractDateMenu.save(object.contractDate)"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-menu
                ref="estimatedDeliveryDateMenu"
                v-model="estimatedDeliveryDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="object.estimatedDeliveryDate"
                    label="合同交货日期"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="rules.estimatedDeliveryDate"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="zh-cn"
                  v-model="object.estimatedDeliveryDate"
                  min="2000-01-01"
                  @change="
                    $refs.estimatedDeliveryDateMenu.save(
                      object.estimatedDeliveryDate
                    )
                  "
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-radio-group v-model.number="object.invoiceType" row>
                <template v-slot:label>
                  <div>开票类型</div>
                </template>
                <v-radio label="不开发票" :value="1"></v-radio>
                <v-radio label="普票" :value="2"></v-radio>
                <v-radio label="专票" :value="3"></v-radio>
                <v-radio label="形式发票" :value="4"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-if="object.invoiceType != 1"
                label="开票内容"
                v-model.trim="object.invoiceContent"
                :rules="rules.invoiceContent"
                auto-grow
                rows="3"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-radio-group v-model.number="object.isSpecial" row>
                <template v-slot:label>
                  <div style="color: red">特殊合同</div>
                </template>
                <v-radio label="是" :value="true"></v-radio>
                <v-radio label="否" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="备注"
                v-model.trim="object.remarks"
                auto-grow
                rows="3"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <taskDataTable
      style="margin-top: 1px"
      ref="taskDataTable"
      :openType="2"
      :openUID="openUID"
      :parentObject="object.tasks"
      v-if="object.tasks"
    />
    <v-card style="margin-top: 1px">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" rounded @click="editObject">确定</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="closeDialog">取消</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import taskDataTable from "../task/DataTable";
import { queryAreas } from "@/api/oadrp";
import { queryContractUnits } from "@/api/dictionary";
import { queryCompanys, queryCustomers } from "@/api/customer";
import { queryEmployees } from "@/api/employee";
import { queryContract, editContract } from "@/api/contract";
export default {
  components: {
    taskDataTable,
  },
  props: {
    openUID: {
      type: String,
      default: "",
    },
    parentFun: {
      type: Function,
      default: null,
    },
    closeDialog: {
      type: Function,
      default: null,
    },
  },
  data: () => ({
    areaItems: [],
    employeeItems: [],
    companyItems: [],
    customerItems: [],
    contractUnitItems: [],
    contractDateMenu: false,
    estimatedDeliveryDateMenu: false,
    object: {
      UID: "",
      no: "",
      areaUID: "",
      employeeUID: "",
      isEntryCustomer: true,
      customerUID: "",
      contractDate: null,
      contractUnitUID: "",
      estimatedDeliveryDate: "",
      endDeliveryDate: "",
      invoiceType: 1,
      invoiceContent: "",
      isSpecial: false,
      remarks: "",
      status: null,

      area: {},
      employee: {},
      customer: {
        companyUID: "",
      },
      contractUnit: {},
    },
    rules: {
      areaUID: [(v) => !!v || "必填项！"],
      employeeUID: [(v) => !!v || "必填项！"],
      companyUID: [(v) => !!v || "必填项！"],
      customerUID: [(v) => !!v || "必填项！"],
      contractUnitUID: [(v) => !!v || "必填项！"],
      contractDate: [(v) => !!v || "必填项！"],
      estimatedDeliveryDate: [(v) => !!v || "必填项！"],
      invoiceContent: [(v) => !!v || "必填项！"],

      customerName: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 12) || "名称的长度必须小于12个字符",
      ],
      customerResearchGroup: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 20) || "课题组的长度必须小于20个字符",
      ],
      customerPhone: [
        (v) => !!v || "必填项！",
        (v) => /[1-9][0-9]+$/.test(v) || "电话的格式错误",
      ],
    },
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      var _this = this;
      queryContract(_this.openUID).then((res) => {
        _this.object = res.data;
        queryEmployees().then((res) => {
          this.employeeItems = res.data;
        });
        queryCompanys({ areaUID: _this.object.areaUID }).then((res) => {
          _this.companyItems = res.data;
        });
        queryAreas().then((res) => {
          _this.areaItems = res.data;
        });
        queryCustomers({
          companyUID: _this.object.customer.companyUID,
        }).then((res) => {
          _this.customerItems = res.data;
        });
        queryContractUnits().then((res) => {
          this.contractUnitItems = res.data.dictionaries;
        });
      });
    },
    getAreaItems() {
      queryAreas().then((res) => {
        this.areaItems = res.data;
      });
    },
    getEmployeeItems() {
      queryEmployees().then((res) => {
        this.employeeItems = res.data;
      });
    },
    getCompanyItems(areaUID) {
      queryCompanys({ areaUID: areaUID }).then((res) => {
        this.companyItems = res.data;
      });
    },
    getCustomerItems(companyUID) {
      queryCustomers({ companyUID }).then((res) => {
        this.customerItems = res.data;
      });
    },
    getContractUnitItems() {
      queryContractUnits().then((res) => {
        this.contractUnitItems = res.data.dictionaries;
      });
    },
    getObject() {
      queryContract(this.openUID).then((res) => {
        this.object = res.data;
      });
    },
    editObject() {
      if (this.validateForm()) {
        editContract(this.object).then((res) => {
          this.$message.success("编辑成功了!");
          this.closeDialog();
        });
      } else {
        this.$message.error("信息填写异常，请检查后再提交！");
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>