<template>
  <v-form ref="form" :readonly="openType == 1">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="object.areaID"
              item-text="name"
              item-value="ID"
              :items="areaItems"
              label="区域"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.employeeID"
              item-text="name"
              item-value="ID"
              :items="employeeItems"
              label="业务员"
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

        <div v-if="openType == 1">
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="object.companyID"
                item-text="name"
                item-value="ID"
                :items="companyItems"
                label="客户公司"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="object.customer.name"
                label="客户名称"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <div v-else>
          <v-row align="center" v-if="object.isEntryCustomer == true">
            <v-col class="d-flex" cols="4">
              <v-select
                v-model="object.customer.companyID"
                item-text="name"
                item-value="ID"
                :items="companyItems"
                label="客户公司"
              ></v-select>
            </v-col>

            <v-col class="d-flex" cols="4">
              <v-select
                v-model="object.customerID"
                item-text="name"
                item-value="ID"
                :items="customerItems"
                label="客户名称"
              ></v-select>
            </v-col>
          </v-row>

          <v-row v-if="object.isEntryCustomer == false">
            <v-col cols="3">
              <v-select
                v-model="object.customer.companyID"
                item-text="name"
                item-value="ID"
                :items="companyItems"
                label="客户公司"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.customer.name"
                label="客户名称"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.customer.researchGroup"
                label="客户课题组"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.customer.phone"
                label="客户电话"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-row>
          <v-col cols="4">
            <v-select
              v-model="object.contractUnitID"
              :items="contractUnitItems"
              item-text="text"
              item-value="ID"
              label="签订单位"
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
                ></v-text-field>
              </template>
              <v-date-picker
                locale="zh-cn"
                v-model="object.contractDate"
                min="2000-01-01"
                @change="$refs.contractDateMenu.save(object.contractDate)"
                :readonly="openType == 1"
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
                :readonly="openType == 1"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-radio-group v-model.number="object.invoiceType" row>
          <template v-slot:label>
            <div>开票类型</div>
          </template>
          <v-radio label="不开发票" :value="1"></v-radio>
          <v-radio label="普票" :value="2"></v-radio>
          <v-radio label="专票" :value="3"></v-radio>
          <v-radio label="形式发票" :value="4"></v-radio>
        </v-radio-group>

        <v-textarea
          v-if="object.invoiceType != 1"
          label="开票内容"
          v-model.trim="object.invoiceContent"
        ></v-textarea>

        <v-radio-group v-model.number="object.isSpecial" row>
          <template v-slot:label>
            <div style="color: red">特殊合同</div>
          </template>
          <v-radio label="是" :value="true"></v-radio>
          <v-radio label="否" :value="false"></v-radio>
        </v-radio-group>

        <v-textarea label="备注" v-model.trim="object.remarks"></v-textarea>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import productDataTable from "../product/DataTable";
import { queryAreas } from "@/api/oadrp";
import { queryDictionaries } from "@/api/dictionary";
import { queryCompanysByAreaID, queryCustomers } from "@/api/customer";
import { queryEmployees } from "@/api/employee";

export default {
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
    parentObject: {},
  },
  components: {
    productDataTable,
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
      ID: null,
      no: "",
      areaID: null,
      employeeID: null,
      isEntryCustomer: true,
      customerID: null,
      contractDate: null,
      contractUnitID: null,
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
        companyID: null,
      },
      contractUnit: {},
    },
  }),
  created() {
    if (this.openType > 0) {
      this.object = this.parentObject;
      this.object.companyID = this.parentObject.customer.companyID;
    }
    this.getAreaItems();
    this.getEmployeeItems();
    this.getContractUnitItems();
  },
  methods: {
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
    getCompanyItemsByAreaID(areaID) {
      queryCompanysByAreaID(areaID).then((res) => {
        this.companyItems = res.data;
      });
    },
    getCustomerItemsByCompanyID(companyID) {
      queryCustomers(0, 0, { companyID }).then((res) => {
        this.customerItems = res.data;
      });
    },
    getContractUnitItems() {
      queryDictionaries("system_contract_unit").then((res) => {
        this.contractUnitItems = res.data;
      });
    },
  },
  watch: {
    "object.areaID": {
      handler: function (val) {
        this.companyItems = [];
        this.customerItems = [];
        this.object.customer.companyID = null;
        this.object.customerID = null;
        if (val != null) {
          this.getCompanyItemsByAreaID(val);
        }
      },
    },
    "object.customer.companyID": {
      handler: function (val) {
        this.customerItems = [];
        this.object.customerID = null;
        if (val != null) {
          this.getCustomerItemsByCompanyID(val);
        }
      },
    },
  },
};
</script>