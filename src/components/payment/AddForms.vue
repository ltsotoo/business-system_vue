<template>
  <v-card>
    <v-card-title>回款记录添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="task"
              :items="taskItems"
              item-text="name"
              label="产品"
              return-object
              @change="setTaskUID"
            ></v-select>
          </v-col>
          <v-col cols="4" v-if="openItem.payType == 1">
            <v-text-field
              v-model="task.totalPrice"
              label="总金额(CNY)"
              disabled
            >
            </v-text-field>
          </v-col>
          <v-col cols="4" v-if="openItem.payType == 2">
            <v-text-field
              v-model="task.totalPrice"
              label="总金额(USD)"
              disabled
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="task.paymentTotalPrice"
              label="已回款金额(CNY)"
              disabled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="回款金额(人民币)"
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
                  label="回款日期"
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
    taskItems: [
      {
        ID: "",
        name: "",
        product: {
          name: "",
        },
      },
    ],
    task: {
      UID: "",
      totalPrice: 0,
      paymentTotalPrice: 0,
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
      taskUID: "",
      paymentDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      money: 0,
    },
  }),
  created() {
    this.object.contractUID = this.openItem.UID;
    this.getTaskItems();
  },
  methods: {
    getTaskItems() {
      queryTasks({ contractUID: this.object.contractUID }).then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].name = res.data[i].product.name + "/id:" + res.data[i].ID;
        }
        this.taskItems = res.data;
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

      if (this.openItem.payType == 1) {
        var taskTemp = this.task.totalPrice - this.task.paymentTotalPrice;
        if (this.object.money > taskTemp) {
          this.$message.error("回款金额不能大于产品任务剩余回款金额！");
          return false;
        }
      }

      return this.$refs.form.validate();
    },
    setTaskUID() {
      this.object.taskUID = this.task.UID;
      if (this.openItem.payType == 1) {
        this.object.money = this.task.totalPrice - this.task.paymentTotalPrice;
      }
    },
  },
};
</script>