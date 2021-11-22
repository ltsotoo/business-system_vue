<template>
  <div>
    <v-card>
      <v-card-title>录入合同</v-card-title>
    </v-card>

    <v-card style="margin-top: 10px">
      <v-card-title></v-card-title>
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
                :rules="rules.must"
                @change="getCompanyItems"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="object.employeeUID"
                item-text="name"
                item-value="UID"
                :items="employeeItems"
                label="业务员"
                :rules="rules.must"
              ></v-select>
            </v-col>
            <v-col cols="4"></v-col>
            <v-col cols="12">
              <v-radio-group v-model="object.isEntryCustomer" row>
                <template v-slot:label>
                  <div>客户类型</div>
                </template>
                <v-radio label="已录入客户" :value="true"></v-radio>
                <v-radio label="未录入客户" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row v-if="object.isEntryCustomer == true">
            <v-col cols="4">
              <v-select
                v-model="object.customer.companyUID"
                item-text="name"
                item-value="UID"
                :items="companyItems"
                label="客户公司"
                :rules="rules.must"
                @change="getCustomerItems"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="object.customerUID"
                item-text="name"
                item-value="UID"
                :items="customerItems"
                label="客户名称"
                :rules="rules.must"
              ></v-select>
            </v-col>
          </v-row>

          <v-row v-if="object.isEntryCustomer == false">
            <v-col cols="3">
              <v-select
                v-model="object.customer.companyUID"
                item-text="name"
                item-value="UID"
                :items="companyItems"
                label="客户公司"
                :rules="rules.must"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="客户名称"
                v-model="object.customer.name"
                :rules="rules.must"
                counter
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="客户电话"
                v-model="object.customer.phone"
                :rules="rules.must"
                counter
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="客户课题组"
                v-model="object.customer.researchGroup"
                counter
                maxlength="20"
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
                :rules="rules.must"
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
                    :rules="rules.must"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="zh-cn"
                  v-model="object.contractDate"
                  min="1900-01-01"
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
                    :rules="rules.must"
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
            <v-col cols="12">
              <v-radio-group v-model.number="object.payType" row>
                <template v-slot:label>
                  <div>付款类型</div>
                </template>
                <v-radio label="人民币" :value="1"></v-radio>
                <v-radio label="美元" :value="2"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="合同总金额(CNY)"
                v-model="object.totalAmount"
                disabled
                v-if="object.payType == 1"
              ></v-text-field>
              <v-text-field
                label="合同总金额(USD)"
                v-model="object.totalAmount"
                disabled
                v-if="object.payType == 2"
              ></v-text-field>
            </v-col>
            <v-col cols="8"></v-col>
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
                counter
                maxlength="500"
              ></v-textarea>
            </v-col>
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
                rows="3"
                counter
                maxlength="500"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>

    <v-card style="margin-top: 10px">
      <v-card-title>产品库：</v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-select
                v-model="sourceType"
                :items="sourceTypeItems"
                item-text="text"
                label="类型"
                return-object
                clearable
                @change="getSubtypeItems"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="queryObject.subtypeUID"
                :items="subtypeItems"
                item-text="text"
                item-value="UID"
                label="子类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="产品名称"
                v-model.trim="queryObject.name"
                clearable
                counter
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="规格"
                v-model.trim="queryObject.specification"
                clearable
                counter
                maxlength="50"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="queryProducts">
                查询
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
      </v-card-subtitle>
      <entryProductDT
        :queryObject="queryObject"
        @child-event="openP2CDialog"
        ref="entryProductDT"
      />
      <v-card-title>已选择产品列表：</v-card-title>
      <entryCartDT
        :payType="object.payType"
        :objItems="cartItems"
        @child-event="openRemoveDialog"
      />
    </v-card>

    <v-row style="margin: 10px" justify="center">
      <v-btn
        x-large
        color="success"
        @click="submit"
        :disabled="submitBtnDisable"
      >
        提交
      </v-btn>
    </v-row>

    <v-dialog v-model="p2cDialog" v-if="p2cDialog" max-width="800px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ openItem.name }}</span>
        </v-card-title>
        <v-card-subtitle>
          <v-form ref="cartForm">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="数量"
                  v-model.number="openItem.number"
                  :rules="rules.number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-if="object.payType == 1"
                  label="价格(CNY)"
                  v-model.number="openItem.standardPrice"
                  :rules="rules.money"
                ></v-text-field>
                <v-text-field
                  v-if="object.payType == 2"
                  label="价格(USD)"
                  v-model.number="openItem.standardPriceUSD"
                  :rules="rules.money"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="备注(阐述售价价格和定制要求)"
                  v-model="openItem.remarks"
                  rows="6"
                  counter
                  maxlength="500"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="p2c"> 添加 </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeP2CDialog"> 取消 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="removeDialog"
      v-if="removeDialog"
      max-width="500px"
      persistent
      @click:outside="closeRemoveDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定移除该产品吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="remove">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeRemoveDialog">
            取消
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import entryProductDT from "./EntryProductDT";
import entryCartDT from "./EntryCartDT";
import { queryAreas } from "@/api/oadrp";
import { queryEmployees } from "@/api/employee";
import { queryCompanys, queryCustomers } from "@/api/customer";
import {
  queryContractUnits,
  queryProductTypes,
  queryDictionaries,
} from "@/api/dictionary";
import { entryContract } from "@/api/contract";
export default {
  components: {
    entryProductDT,
    entryCartDT,
  },
  data: () => ({
    rules: {
      must: [(v) => !!v || "必填项！"],
      number: [(v) => /^[0-9]*$/.test(v) || "库存数量必须为大于零的整数"],
      money: [(v) => /^[0-9]*(\.[0-9]{1,3})?$/.test(v) || "金额的格式错误"],
    },
    contractDateMenu: false,
    estimatedDeliveryDateMenu: false,
    areaItems: [],
    employeeItems: [],
    companyItems: [],
    customerItems: [],
    contractUnitItems: [],
    sourceTypeItems: [],
    sourceType: {},
    subtypeItems: [],
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
      payType: 1,
      totalAmount: 0,
      invoiceType: 1,
      invoiceContent: "",
      isSpecial: false,
      remarks: "",
      status: null,

      customer: {
        companyUID: "",
        name: "",
        researchGroup: "",
        phone: "",
      },
    },
    queryObject: {
      sourceTypeUID: "",
      subtypeUID: "",
      name: "",
      specification: "",
    },

    cartItems: [],
    openItem: {},
    p2cDialog: false,
    removeDialog: false,
    submitBtnDisable: false,
  }),
  created() {
    this.getAreaItems();
    this.getContractUnitItems();
    this.getProductSoureTypeItems();

    this.getEmployeeItems();
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
    getCompanyItems() {
      queryCompanys({ areaUID: this.object.areaUID }).then((res) => {
        this.companyItems = res.data;
      });
    },
    getCustomerItems() {
      queryCustomers({ companyUID: this.object.customer.companyUID }).then(
        (res) => {
          this.customerItems = res.data;
        }
      );
    },
    getContractUnitItems() {
      queryContractUnits().then((res) => {
        this.contractUnitItems = res.data;
      });
    },
    getProductSoureTypeItems() {
      queryProductTypes().then((res) => {
        this.sourceTypeItems = res.data;
      });
    },
    getSubtypeItems() {
      this.queryObject.subtypeUID = "";
      this.subtypeItems = [];
      if (this.sourceType) {
        this.queryObject.sourceTypeUID = this.sourceType.UID;
        queryDictionaries(this.sourceType.name).then((res) => {
          this.subtypeItems = res.data;
        });
      } else {
        this.queryObject.sourceTypeUID = "";
      }
    },
    queryProducts() {
      this.$refs.entryProductDT.getObject();
    },

    openP2CDialog(product) {
      this.openItem = JSON.parse(JSON.stringify(product));

      this.openItem.remarks = "";
      this.openItem.productUID = product.UID;
      this.openItem.number = 1;
      this.openItem.ID = null;
      this.openItem.UID = null;
      this.openItem.CreatedAt = null;
      this.openItem.UpdatedAt = null;
      this.openItem.DeletedAt = null;

      this.p2cDialog = true;
    },
    closeP2CDialog() {
      this.openItem = {};
      this.p2cDialog = false;
    },

    p2c() {
      if (this.validateCartForm()) {
        var isNew = true;
        this.cartItems.forEach((item) => {
          if (
            item.productUID == this.openItem.productUID &&
            item.remarks == this.openItem.remarks
          ) {
            this.$message.error("请勿重复添加！");
            isNew = false;
            return;
          }
        });
        if (this.object.payType == 1) {
          this.openItem.price = this.openItem.standardPrice;
        }
        if (this.object.payType == 2) {
          this.openItem.price = this.openItem.standardPriceUSD;
        }
        if (isNew) {
          this.openItem.totalPrice = this.openItem.number * this.openItem.price;
          this.object.totalAmount += this.openItem.totalPrice;
          this.cartItems.push(this.openItem);
        }
        this.closeP2CDialog();
      }
    },

    openRemoveDialog(item) {
      this.openItem = item;
      this.removeDialog = true;
    },
    closeRemoveDialog() {
      this.openItem = {};
      this.removeDialog = false;
    },

    remove() {
      this.cartItems = this.cartItems.filter(
        (t) =>
          t.productUID != this.openItem.productUID ||
          (t.productUID == this.openItem.productUID &&
            t.remarks != this.openItem.remarks)
      );
      let temp = 0;
      this.cartItems.forEach((item) => {
        temp += item.totalPrice;
      });
      this.object.totalAmount = temp;
      this.closeRemoveDialog();
    },

    validateForm() {
      return this.$refs.form.validate();
    },
    validateCartForm() {
      return this.$refs.cartForm.validate();
    },
    submit() {
      var _this = this;
      if (this.validateForm()) {
        this.submitBtnDisable = true;
        this.object.tasks = this.cartItems;
        entryContract(this.object).then((res) => {
          this.$message.success("录入成功了!");
          setTimeout(function () {
            _this.$router.replace("/index");
          }, 1000);
        });
      }
    },
  },
};
</script>