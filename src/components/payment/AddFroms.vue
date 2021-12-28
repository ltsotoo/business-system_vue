<template>
  <v-card>
    <v-card-title>回款记录添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="3">
            <v-select
              v-model="task"
              :items="taskItems"
              :item-text="
                (item) => {
                  return item.product.name + '/' + item.ID;
                }
              "
              label="产品"
              return-object
              @change="setTaskUID"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="task.totalPrice" label="总金额" disabled>
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="task.paymentTotalPrice"
              label="已回款金额(CNY)"
              disabled
            >
            </v-text-field>
          </v-col>
          <v-col cols="3" v-if="openItem.payType == 2">
            <v-text-field
              v-model="task.paymentTotalPriceUSD"
              label="已回款金额(USD)"
              disabled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="openItem.invoiceType > 1">
          <v-col cols="3">
            <v-select
              v-model="invoice"
              :items="invoiceItems"
              item-text="code"
              label="发票"
              return-object
              @change="setInvoiceUID"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="invoice.money" label="总金额" disabled>
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="invoice.paymentMoney"
              label="已回款金额"
              disabled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="openItem.payType == 2" cols="3">
            <v-text-field
              label="回款金额(美元)"
              v-model.number="object.moneyUSD"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="回款金额(人民币)"
              v-model.number="object.money"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
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
                  v-model="object.paymentDate"
                  label="回款完成日期"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="rules.must"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="zh-cn"
                scrollable
                no-title
                v-model="object.paymentDate"
                min="1900-01-01"
                @change="$refs.contractDateMenu.save(object.paymentDate)"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="submit" :disabled="submitDisabled">
        提交
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { addPayment } from "@/api/payment";
import { queryTasks } from "@/api/task";
import { queryInvoices } from "@/api/invoice";
export default {
  props: {
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
    taskItems: [],
    invoiceItems: [],
    task: {
      UID: "",
      totalPrice: 0,
      paymentTotalPrice: 0,
      paymentTotalPriceUSD: 0,
    },
    invoice: {
      UID: "",
      code: "",
      money: "",
      paymentMoney: 0,
    },
    contractDateMenu: false,
    rules: {
      must: [(v) => !!v || "必填项"],
      money: [
        (v) => /^\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },
    object: {
      contractUID: "",
      invoiceUID: "",
      taskUID: "",
      paymentDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      moneyUSD: "",
      money: 0,
    },
  }),
  created() {
    this.object.contractUID = this.openItem.UID;
    this.getTaskItems();
    this.getInvoiceItems();
  },
  methods: {
    getTaskItems() {
      queryTasks({ contractUID: this.object.contractUID }).then((res) => {
        this.taskItems = res.data;
      });
    },
    getInvoiceItems() {
      queryInvoices(this.object.contractUID).then((res) => {
        this.invoiceItems = res.data;
      });
    },
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        addPayment(this.object).then((res) => {
          this.$message.success("添加成功了!");
          this.refresh();
          this.closeDialog();
        });
      } else {
        this.submitDisabled = false;
      }
    },
    validateForm() {
      if (this.object.taskUID == "") {
        this.$message.error("产品任务必选");
        return false;
      }
      if (this.openItem.invoiceType > 1 && this.object.invoiceUID == "") {
        this.$message.error("发票还未选择");
        return false;
      }

      if (this.openItem.payType == 1) {
        var taskTemp = this.task.totalPrice - this.task.paymentTotalPrice;
        if (this.object.money > taskTemp) {
          this.$message.error("回款金额不能大于产品任务剩余回款金额！");
          return false;
        }
        var invoiceTemp = this.invoice.money - this.invoice.paymentMoney;
        if (this.openItem.invoiceType > 1 && this.object.money > invoiceTemp) {
          this.$message.error("回款金额不能大于发票剩余回款金额！");
          return false;
        }
      }

      return this.$refs.form.validate();
    },
    setTaskUID() {
      this.object.taskUID = this.task.UID;
      if (this.openItem.payType == 1) {
        var temp = this.task.totalPrice - this.task.paymentTotalPrice;
        if (this.object.money == "" || this.object.money > temp) {
          this.object.money = temp;
        }
      }
    },
    setInvoiceUID() {
      this.object.invoiceUID = this.invoice.UID;
      if (this.openItem.payType == 1) {
        var temp = this.invoice.money - this.invoice.paymentMoney;
        if (this.object.money == "" || this.object.money > temp) {
          this.object.money = temp;
        }
      }
    },
  },
};
</script>