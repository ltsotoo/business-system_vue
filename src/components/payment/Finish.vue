<template>
  <v-card>
    <v-card-title> 历史回款记录 </v-card-title>
    <v-card-subtitle>
      <v-form disabled>
        <v-row v-for="(item, i) in paymentItems" :key="i" align="center">
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
          <v-col cols="8">
            <v-textarea
              label="备注"
              auto-grow
              rows="1"
              v-model="item.remarks"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-title> 表格 </v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="总回款(元)"
              v-model.number="object.paymentTotalAmount"
              :rules="rules.money"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
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
                  v-model="object.endPaymentDate"
                  label="回款完成日期"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="rules.must"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="zh-cn"
                v-model="object.endPaymentDate"
                min="2000-01-01"
                @change="
                  $refs.contractDateMenu.save(object.estimatedDeliveryDate)
                "
              ></v-date-picker>
            </v-menu>
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
</template>

<script>
import { finishPayments } from "@/api/payment";
export default {
  props: {
    paymentItems: {
      type: Array,
      default: [],
    },
    openUID: {
      type: String,
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    rules: {
      money: [
        (v) => /^[1-9][0-9]*(\.[0-9]{1,3})?$/.test(v) || "金额必须大于零",
      ],
      must: [(v) => !!v || "必填项！"],
    },
    contractDateMenu: false,
    object: {
      UID: "",
      endPaymentDate: "",
      paymentTotalAmount: 0,
    },
    items: [],
  }),
  created() {
    this.object.UID = this.openUID;
    this.getTotalMoney();
  },
  methods: {
    getTotalMoney() {
      for (let j = 0; j < this.paymentItems.length; j++) {
        this.object.paymentTotalAmount =
          this.object.paymentTotalAmount + this.paymentItems[j].money;
      }
    },
    submit() {
      if (this.validateForm()) {
        finishPayments(this.object).then((res) => {
          this.$message.success("提交成功了！");
          this.refresh();
          this.closeDialog();
        });
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>