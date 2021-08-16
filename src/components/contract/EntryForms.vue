<template>
  <div>
    <v-row>
      <v-col>
        <v-form ref="form">
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
                    :rules="rules.areaID"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="object.employeeID"
                    item-text="name"
                    item-value="ID"
                    :items="employeeItems"
                    label="业务员"
                    :rules="rules.employeeID"
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
                    v-model="object.customer.companyID"
                    item-text="name"
                    item-value="ID"
                    :items="companyItems"
                    label="客户公司"
                    :rules="rules.companyID"
                  ></v-select>
                </v-col>

                <v-col class="d-flex" cols="4">
                  <v-select
                    v-model="object.customerID"
                    item-text="name"
                    item-value="ID"
                    :items="customerItems"
                    label="客户名称"
                    :rules="rules.customerID"
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
                    :rules="rules.companyID"
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
                    v-model="object.contractUnitID"
                    item-text="text"
                    item-value="ID"
                    :items="contractUnitItems"
                    label="签订单位"
                    :rules="rules.contractUnitID"
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
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-subtitle>
          </v-card>
        </v-form>
      </v-col>
    </v-row>

    <v-card style="margin-top: 10px">
      <v-card-subtitle>
        <p :class="`text-h6`" class="text--primary">产品搜索条件：</p>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-col cols="3">
              <v-select
                v-model="queryObject.sourceTypeID"
                :items="sourceTypeItems"
                item-text="text"
                item-value="ID"
                label="类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="queryObject.subtypeID"
                :items="subtypeItems"
                item-text="text"
                item-value="ID"
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
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="openCartDeleteDialog(item.productID)">
                mdi-delete
              </v-icon>
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

    <v-dialog v-model="cart.addDialog" max-width="400px" persistent>
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
import { queryContractUnits,queryProductSourceType,queryProductSubtype } from "@/api/dictionary";
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
    rules: {
      areaID: [(v) => !!v || "必填项！"],
      employeeID: [(v) => !!v || "必填项！"],
      companyID: [(v) => !!v || "必填项！"],
      customerID: [(v) => !!v || "必填项！"],
      contractUnitID: [(v) => !!v || "必填项！"],
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
      sourceTypeID: null,
      subtypeID: null,
      name: "",
    },
    cart: {
      headers: [
        {
          text: "名称",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "品牌", value: "brand", sortable: false },
        { text: "规格", value: "specification", sortable: false },
        { text: "购买数量", value: "number", sortable: false },
        { text: "单位", value: "unit", sortable: false },
        { text: "单价(元)", value: "price", sortable: false },
        { text: "总价格(元)", value: "totalPrice", sortable: false },
        { text: "操作", value: "actions", sortable: false },
      ],
      openID: null,
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
    getCompanyItemsByAreaID(areaID) {
      queryCompanys({areaID:areaID}).then((res) => {
        this.companyItems = res.data;
      });
    },
    getCustomerItemsByCompanyID(companyID) {
      queryCustomers(0, 0, { companyID }).then((res) => {
        this.customerItems = res.data;
      });
    },
    getContractUnitItems() {
      queryContractUnits().then((res) => {
        this.contractUnitItems = res.data;
      });
    },
    getProductSoureTypeItems() {
      queryProductSourceType().then((res) => {
        this.sourceTypeItems = res.data;
      });
    },
    getSubtypeItems(parentID) {
      queryProductSubtype(parentID).then((res) => {
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
      this.cart.product.productID = product.ID;
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
        if (item.productID == this.cart.product.productID) {
          this.$message.error("请勿重复添加！");
          isNew = false;
          return;
        }
      });
      if (isNew) {
        this.cart.product.totalPrice =
          this.cart.product.number * this.cart.product.price;
        this.cart.object.push(this.cart.product);
      }
      this.closeAddCartDialog();
    },
    openCartDeleteDialog(id) {
      this.cart.openID = id;
      this.cart.deleteDialog = true;
    },
    closeCartDeleteDialog() {
      this.cart.openID = null;
      this.cart.deleteDialog = false;
    },
    deleteCartItem() {
      this.cart.object = this.cart.object.filter(
        (t) => t.productID != this.cart.openID
      );
      this.closeCartDeleteDialog();
    },
    validateForm() {
      return this.$refs.form.validate();
    },
    entryObject() {
      this.updateSubmitBtnDisable(true);
      if (this.validateForm()) {
        this.object.tasks = this.cart.object;
        entryContract(this.object).then((res) => {
          this.$message.success("录入成功了!");
          this.updateSubmitBtnDisable(false);
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
    "queryObject.sourceTypeID": {
      handler: function (val) {
        this.subtypeItems = [];
        this.queryObject.subtypeID = null;
        if (val != null) {
          this.getSubtypeItems(val);
        }
      },
    },
  },
};
</script>