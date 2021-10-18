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

          <v-row v-if="object.isEntryCustomer == false">
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
            <v-col cols="4">
              <v-text-field
                label="合同总金额(元)"
                v-model="object.totalAmount"
                disabled
              ></v-text-field>
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

    <v-card style="margin-top: 10px">
      <v-card-subtitle>
        <p :class="`text-h6`" class="text--primary">产品搜索条件：</p>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-col cols="3">
              <v-select
                v-model="queryObject.sourceTypeUID"
                :items="sourceTypeItems"
                item-text="text"
                item-value="UID"
                label="类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="queryObject.subtypeUID"
                :items="subtypeItems"
                item-text="text"
                item-value="UID"
                label="子类别"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="queryObject.name"
                label="产品名称"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="getProducts">
                查询
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="resetForm">
                重置
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <p :class="`text-h6`" class="text--primary">产品列表：查询结果</p>
        <productDataTable
          ref="productDataTable"
          :openType="3"
          :queryObject="queryObject"
          @child-event="openAddCartDialog"
        />
        <p :class="`text-h6`" class="text--primary" style="margin-top: 20px">
          已选择产品列表：
        </p>
        <div>
          <v-data-table
            :headers="cart.headers"
            :items.sync="cart.object"
            :items-per-page="10"
            class="elevation-1"
            :footer-props="{
              itemsPerPageOptions: [5, 10, 20],
            }"
          >
            <template v-slot:[`item.remarks`]="{ item }">
              <v-textarea
                readonly
                :value="item.remarks"
                v-if="item.remarks != undefined"
                rows="1"
                auto-grow
              ></v-textarea>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="openCartDeleteDialog(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </div>
      </v-card-subtitle>
    </v-card>
    <v-row style="margin-top: 10px" justify="center">
      <v-btn
        x-large
        color="success"
        @click="entryObject"
        :disabled="submitBtnDisable"
      >
        提交
      </v-btn>
    </v-row>

    <v-dialog v-model="cart.addDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ cart.product.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="数量"
                  v-model.number="cart.product.number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="价格"
                  v-model.number="cart.product.price"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-textarea
                label="非标备注"
                v-model.trim="cart.product.remarks"
                auto-grow
                rows="3"
              ></v-textarea>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addToCart"> 添加 </v-btn>
          <v-btn color="blue darken-1" text @click="closeAddCartDialog">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="cart.deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5">您确定移除该产品吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="deleteCartItem">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeCartDeleteDialog">
            取消
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import productDataTable from "../product/DataTable";
import { queryAreas } from "@/api/oadrp";
import {
  queryContractUnits,
  queryProductSourceType,
  queryProductSubtype,
} from "@/api/dictionary";
import { queryCompanys, queryCustomers } from "@/api/customer";
import { queryEmployees } from "@/api/employee";
import { entryContract } from "@/api/contract";
export default {
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
    sourceTypeItems: [],
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
      totalAmount: 0,
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
    queryObject: {
      sourceTypeUID: "",
      subtypeUID: "",
      name: "",
    },
    cart: {
      headers: [
        {
          text: "名称",
          align: "center",
          sortable: false,
          value: "name",
        },
        { text: "品牌", align: "center", value: "brand", sortable: false },
        {
          text: "规格",
          align: "center",
          value: "specification",
          sortable: false,
        },
        { text: "购买数量", align: "center", value: "number", sortable: false },
        { text: "单位", align: "center", value: "unit", sortable: false },
        { text: "单价(元)", align: "center", value: "price", sortable: false },
        {
          text: "总价格(元)",
          align: "center",
          value: "totalPrice",
          sortable: false,
        },
        {
          text: "非标备注",
          align: "center",
          value: "remarks",
          sortable: false,
        },
        {
          text: "操作",
          align: "center",
          value: "actions",
          sortable: false,
        },
      ],
      openUID: "",
      openRemarks: "",
      addDialog: false,
      deleteDialog: false,
      object: [],
      product: {},
    },
    submitBtnDisable: false,
  }),
  created() {
    this.getAreaItems();
    this.getEmployeeItems();
    this.getContractUnitItems();
    this.getProductSoureTypeItems();
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
    getProductSoureTypeItems() {
      queryProductSourceType().then((res) => {
        this.sourceTypeItems = res.data.dictionaries;
      });
    },
    getSubtypeItems(parentUID) {
      queryProductSubtype(parentUID).then((res) => {
        this.subtypeItems = res.data;
      });
    },
    getProducts() {
      this.$refs.productDataTable.getObject();
    },
    resetForm() {
      this.$refs.queryForm.reset();
      this.$refs.productDataTable.getObject();
    },
    openAddCartDialog(product) {
      this.cart.product.productUID = product.UID;
      this.cart.product.name = product.name;
      this.cart.product.brand = product.brand;
      this.cart.product.specification = product.specification;
      this.cart.product.number = 1;
      this.cart.product.total = product.number;
      this.cart.product.unit = product.unit;
      this.cart.product.price = product.standardPrice;

      this.cart.addDialog = true;
    },
    closeAddCartDialog() {
      this.$refs.productDataTable.changeTransferStatus();
      this.cart.product = {};
      this.cart.addDialog = false;
    },
    addToCart() {
      var isNew = true;
      this.cart.object.forEach((item) => {
        if (
          item.productUID == this.cart.product.productUID &&
          item.remarks == this.cart.product.remarks
        ) {
          this.$message.error("请勿重复添加！");
          isNew = false;
          return;
        }
      });
      if (isNew) {
        this.cart.product.totalPrice =
          this.cart.product.number * this.cart.product.price;
        this.object.totalAmount += this.cart.product.totalPrice;
        this.cart.object.push(this.cart.product);
      }
      this.closeAddCartDialog();
    },
    openCartDeleteDialog(item) {
      this.cart.openUID = item.productUID;
      this.cart.remarks = item.remarks;
      this.cart.deleteDialog = true;
    },
    closeCartDeleteDialog() {
      this.cart.openUID = "";
      this.cart.remarks = "";
      this.cart.deleteDialog = false;
    },
    deleteCartItem() {
      this.cart.object = this.cart.object.filter(
        (t) =>
          t.productUID != this.cart.openUID ||
          (t.productUID == this.cart.openUID && t.remarks != this.cart.remarks)
      );
      let temp = 0;
      this.cart.object.forEach((item) => {
        temp += item.totalPrice;
      });
      this.object.totalAmount = temp;
      this.closeCartDeleteDialog();
    },
    validateForm() {
      return this.$refs.form.validate();
    },
    entryObject() {
      var _this = this;
      this.updateSubmitBtnDisable(true);
      if (this.validateForm()) {
        this.object.tasks = this.cart.object;
        entryContract(this.object).then((res) => {
          this.$message.success("录入成功了!");
          setTimeout(function () {
            _this.$router.replace("/contract");
          }, 1000);
        });
      } else {
        this.$message.error("信息填写异常，请检查后再提交！");
        this.updateSubmitBtnDisable(false);
      }
    },
    updateSubmitBtnDisable(status) {
      this.submitBtnDisable = status;
    },
  },
  watch: {
    "object.areaUID": {
      handler: function (val) {
        this.companyItems = [];
        this.customerItems = [];
        this.object.customer.companyUID = "";
        this.object.customerUID = "";
        if (val != null) {
          this.getCompanyItems(val);
        }
      },
    },
    "object.customer.companyUID": {
      handler: function (val) {
        this.customerItems = [];
        this.object.customerUID = "";
        if (val != null) {
          this.getCustomerItems(val);
        }
      },
    },
    "queryObject.sourceTypeUID": {
      handler: function (val) {
        this.subtypeItems = [];
        this.queryObject.subtypeUID = "";
        if (val != null) {
          this.getSubtypeItems(val);
        }
      },
    },
  },
};
</script>