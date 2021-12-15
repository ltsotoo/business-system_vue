<template>
  <v-card>
    <v-card-title>回款记录添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <div v-if="this.openItem.payType == 1">
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="task"
                :items="taskItems"
                item-text="product.name"
                label="产品"
                return-object
                @change="setTaskUID"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="task.totalPrice"
                label="总金额(元)"
                disabled
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="task.paymentTotalPrice"
                label="已回款金额(元)"
                disabled
              >
              </v-text-field>
            </v-col>
            <v-col cols="4"></v-col>
          </v-row>
        </div>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="object.invoiceUID"
              item-text="code"
              item-value="UID"
              :items="invoiceItems"
              label="发票"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="回款金额(元)"
              v-model.number="object.money"
              :rules="rules.money"
            ></v-text-field>
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
      <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
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
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    taskItems: [],
    task: {
      UID: "",
      totalPrice: 0,
      paymentTotalPrice: 0,
    },
    invoiceItems: [],
    contractDateMenu: false,
    rules: {
      must: [(v) => !!v || "必填项"],
      money: [(v) => /^[0-9]*(\.[0-9]{1,3})?$/.test(v) || "大于等于零"],
    },
    object: {
      contractUID: "",
      invoiceUID: "",
      taskUID: "",
      paymentDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      money: "",
    },
  }),
  created() {
    this.getInvoiceItems();
    this.object.contractUID = this.openItem.UID;
    if (this.openItem.payType == 1) {
      this.getTaskItems();
    }
  },
  methods: {
    getTaskItems() {
      queryTasks({ contractUID: this.object.contractUID }).then((res) => {
        this.taskItems = res.data;
      });
    },
    getInvoiceItems() {
      queryInvoices({ contractUID: this.object.contractUID }).then((res) => {
        this.invoiceItems = res.data;
      });
    },
    submit() {
      if (this.validateForm()) {
        addPayment(this.object).then((res) => {
          this.$message.success("添加成功了!");
          this.closeDialog();
        });
      }
    },
    validateForm() {
      if (this.openItem.payType == 1) {
        if (this.object.taskUID == "") {
          this.$message.error("任务必选");
          return false;
        }
        if (
          this.object.money >
          this.task.totalPrice - this.task.paymentTotalPrice
        ) {
          this.$message.error("回款金额必须不大于该任务剩余回款量");
          return false;
        }
      }
      return this.$refs.form.validate();
    },
    setTaskUID() {
      this.object.taskUID = this.task.UID;
      this.object.money = this.task.totalPrice - this.task.paymentTotalPrice;
    },
  },
};
</script>