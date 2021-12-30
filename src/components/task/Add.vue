<template>
  <div>
    <v-card>
      <v-card-title>预存款合同添加任务</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="4">
              <v-text-field
                label="合同编号"
                v-model="contract.no"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="剩余预存款金额"
                v-model="contract.preDeposit"
              ></v-text-field>
            </v-col>
            <v-col cols="2"></v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <v-card style="margin-top: 3px">
      <v-card-title></v-card-title>
      <v-card-subtitle>
        <v-form>
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-select
                v-model="queryObject.typeUID"
                :items="typeItems"
                item-text="name"
                item-value="UID"
                label="类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="产品名称"
                v-model.trim="queryObject.name"
                clearable
                counter
                maxlength="50"
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
        <productDataTable
          :queryObject="queryObject"
          @child-event="openP2CDialog"
          :isCart="true"
          ref="productDataTable"
        />
      </v-card-subtitle>

      <v-dialog v-model="p2cDialog" v-if="p2cDialog" width="800px" persistent>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ openItem.name }}</span>
          </v-card-title>
          <v-card-subtitle>
            <v-form ref="form">
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
                    v-if="contract.payType == 1"
                    label="价格(CNY)"
                    v-model.number="openItem.price"
                    :rules="rules.money"
                  ></v-text-field>
                  <v-text-field
                    v-if="contract.payType == 2"
                    label="价格(USD)"
                    v-model.number="openItem.price"
                    :rules="rules.money"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="备注(阐述定价原因和客户定制要求)"
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
            <v-btn
              color="primary"
              rounded
              @click="addTaskToContract"
              :disabled="submitDisabled"
            >
              添加
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" rounded @click="closeP2CDialog">
              取消
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import productDataTable from "@/components/product/DataTable";
import { queryProductTypes } from "@/api/productType";
import { addTask } from "@/api/task";
export default {
  components: {
    productDataTable,
  },
  props: {
    contract: {
      type: Object,
    },
  },
  data: () => ({
    submitDisabled: false,
    typeItems: [],
    queryObject: {
      typeUID: "",
      name: "",
      specification: "",
    },
    rules: {
      number: [(v) => /^((0)|([1-9]\d*))$/.test(v) || "大于等于零的整数"],
      money: [
        (v) => /^\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },

    openItem: {},
    p2cDialog: false,
  }),
  created() {
    this.getTypeItems();
  },
  methods: {
    getTypeItems() {
      queryProductTypes().then((res) => {
        this.typeItems = res.data;
      });
    },
    queryProducts() {
      this.$refs.productDataTable.getObject();
    },
    openP2CDialog(product) {
      this.openItem.productUID = product.UID;
      this.openItem.name = product.name;
      this.openItem.brand = product.brand;
      this.openItem.specification = product.specification;
      this.openItem.number = 1;
      this.openItem.total = product.number;
      this.openItem.unit = product.unit;
      this.openItem.standardPrice = product.standardPrice;
      this.openItem.standardPriceUSD = product.standardPriceUSD;
      if (this.contract.payType == 1) {
        this.openItem.price = this.openItem.standardPrice;
      }
      if (this.contract.payType == 2) {
        this.openItem.price = this.openItem.standardPriceUSD;
      }

      this.p2cDialog = true;
    },
    closeP2CDialog() {
      this.openItem = {};
      this.p2cDialog = false;
    },

    addTaskToContract() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        this.openItem.contractUID = this.contract.UID;
        this.openItem.totalPrice = this.openItem.number * this.openItem.price;
        if (this.contract.preDeposit < this.openItem.totalPrice) {
          this.$message.error("预存款余额不足！");
          this.submitDisabled = false;
        } else {
          addTask(this.openItem).then((res) => {
            this.contract.preDeposit =
              this.contract.preDeposit - this.openItem.totalPrice;
            this.$message.success("合同产品添加成功！");
            this.closeP2CDialog();
            this.submitDisabled = false;
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