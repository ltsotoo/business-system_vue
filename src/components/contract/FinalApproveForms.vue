<template>
  <v-card>
    <v-card-title>提成确认</v-card-title>
    <v-card-subtitle>
      <v-radio-group v-model="useSystem" row>
        <v-radio
          label="系统计算"
          :value="true"
          :disabled="!(parentObj.payType == 1 && !parentObj.isSpecial)"
        ></v-radio>
        <v-radio label="手动输入" :value="false"></v-radio>
      </v-radio-group>
      <div v-if="useSystem">
        <v-row v-for="(task, i) in object.tasks" :key="i">
          <v-col cols="1"></v-col>
          <v-col cols="2">
            <v-text-field
              v-model="task.product.name"
              label="产品名称"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="task.number"
              label="产品销售数量"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="task.product.standardPrice"
              label="产品标准售价(元)"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="task.price"
              label="产品实际售价(元)"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="task.pushMoney"
              label="提成金额(元)"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>

        <v-row>
          <v-col cols="1"></v-col>
          <v-col cols="3">
            <v-text-field
              v-model="parentObj.paymentTotalAmount"
              label="回款总金额(元)"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.taskTotalMoney"
              label="产品提成总金额(元)"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-text-field
              v-model="object.paymentDays"
              label="回款延迟天数"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.paymentMoneys"
              label="回款延迟扣除金额(元)"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row>
          <v-col cols="8"></v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.totalMoney"
              label="最后提成金额(元)"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
      </div>
      <div v-else>
        <v-form ref="form">
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="3">
              <v-text-field
                v-model="parentObj.paymentTotalAmount"
                label="回款总金额(元)"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="userObject.taskTotalMoney"
                label="产品提成总金额(元)"
                :rules="rules.money"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field
                v-model="userObject.paymentDays"
                label="回款延迟天数"
                :rules="rules.number"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="userObject.paymentMoneys"
                label="回款延迟扣除金额(元)"
                :rules="rules.money"
              ></v-text-field>
            </v-col>
            <v-col cols="1"></v-col>
          </v-row>
          <v-row>
            <v-col cols="8"></v-col>
            <v-col cols="3">
              <v-text-field
                v-model="totalMoney"
                label="最后提成金额(元)"
                readonly
                :rules="rules.money"
              ></v-text-field>
            </v-col>
            <v-col cols="2"></v-col>
          </v-row>
        </v-form>
      </div>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" rounded @click="submit">确定</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { calculate, contractFinalApprove } from "@/api/contract_flow";
export default {
  props: {
    parentObj: {
      type: Object,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    rules: {
      number: [(v) => /^[0-9]*$/.test(v) || "格式错误"],
      money: [(v) => /^[0-9]*(\.[0-9]{1,3})?$/.test(v) || "金额的格式错误"],
    },
    object: {},
    userObject: {
      taskTotalMoney: 0,
      paymentMoneys: 0,
    },
    useSystem: true,
  }),
  created() {
    this.calculateM();
  },
  computed: {
    totalMoney: function () {
      return this.userObject.taskTotalMoney - this.userObject.paymentMoneys;
    },
  },
  methods: {
    calculateM() {
      calculate({ UID: this.parentObj.UID }).then((res) => {
        this.object = res.data;
        this.userObject = JSON.parse(JSON.stringify(this.object));
      });
    },
    submit() {
      if (this.useSystem || this.validateForm()) {
        var temp = {};
        temp.contractUID = this.parentObj.UID;

        if (this.useSystem) {
          temp.type = 1;
          temp.taskTotalMoney = this.object.taskTotalMoney;
          temp.paymentDays = this.object.paymentDays;
          temp.paymentMoneys = this.object.paymentMoneys;
          temp.totalMoney = this.object.totalMoney;
        } else {
          temp.type = 2;
          temp.taskTotalMoney = this.userObject.taskTotalMoney;
          temp.paymentDays = this.userObject.paymentDays;
          temp.paymentMoneys = this.userObject.paymentMoneys;
        }
        contractFinalApprove(temp).then((res) => {
          this.$message.success("合同最终审批成功！");
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