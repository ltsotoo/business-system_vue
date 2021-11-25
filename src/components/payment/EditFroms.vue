<template>
  <div>
    <v-card>
      <v-card-title>开票明细</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="payTypeText" label="付款类型">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="invoiceTypeText" label="开票类型">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="invoiceText"
                label="开票备注"
                rows="1"
                auto-grow
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
      <v-card-title>合同回款详情</v-card-title>
      <v-card-subtitle>
        <v-form disabled>
          <v-row v-for="(item, i) in object" :key="i" align="center">
            <v-col cols="2">
              <v-text-field
                label="时间"
                v-model.number="item.CreatedAt"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="回款金额(元)"
                v-model.number="item.money"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-textarea
                label="备注"
                auto-grow
                rows="1"
                v-model="item.remarks"
              ></v-textarea>
            </v-col>
            <v-col cols="2">
              <v-btn x-large color="primary" @click="openEditDialog(item)">
                编辑
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
      <v-card-title> 新增回款记录 </v-card-title>
      <v-card-subtitle>
        <v-form ref="form">
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="回款金额(元)"
                v-model.number="payment.money"
                :rules="rules.money"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="备注"
                rows="3"
                v-model="payment.remarks"
                counter
                maxlength="500"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="closeDialog"> 关闭 </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="editDialog"
      v-if="editDialog"
      width="800px"
      persistent
      @click:outside="closeEditDialog"
    >
      <edit :parentObject="openItem" :closeDialog="closeEditDialog"></edit>
    </v-dialog>
  </div>
</template>

<script>
import edit from "./Edit.vue";
import { addPayment, queryPayments } from "@/api/payment";
export default {
  components: {
    edit,
  },
  props: {
    openItem: {
      type: Object,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    rules: {
      money: [
        (v) => /^[0-9]*(\.[0-9]{1,3})?$/.test(v) || "大于等于零",
      ],
    },
    payment: {
      contractUID: "",
      money: 0,
      remarks: "",
    },
    object: [],
    openItem: {},
    editDialog: false,
    payTypeText: "",
    invoiceTypeText: "",
    invoiceText: "",
  }),
  created() {
    this.payment.contractUID = this.openItem.UID;
    this.payTypeText = this.payTypeToText(this.openItem.payType);
    this.invoiceTypeText = this.invoiceTypeToText(this.openItem.invoiceType);
    this.invoiceText = this.openItem.invoiceContent;
    this.getObejct();
  },
  methods: {
    getObejct() {
      queryPayments(this.payment.contractUID).then((res) => {
        this.object = res.data;
      });
    },
    openEditDialog(item) {
      this.openItem = item;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openItem = {};
      this.editDialog = false;
    },

    submit() {
      if (this.validateForm()) {
        var _this = this;
        addPayment(this.payment).then((res) => {
          this.payment.money = 0;
          this.payment.remarks = "";
          _this.getObejct();
        });
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },

    invoiceTypeToText(invoiceType) {
      switch (invoiceType) {
        case 1:
          return "不开发票";
        case 2:
          return "普票";
        case 3:
          return "专票";
        case 4:
          return "形式发票";
      }
    },
    payTypeToText(payType) {
      switch (payType) {
        case 1:
          return "人民币";
        case 2:
          return "美元";
      }
    },
  },
};
</script>