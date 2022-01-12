<template>
  <div>
    <v-card>
      <v-card-title>审批</v-card-title>
    </v-card>
    <v-card style="margin-top: 1px">
      <v-card-title>可报销额度</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="员工补助金额(元)"
                v-model="object.employee.money"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="办事处提成金额(元)"
                v-model="object.employee.office.money"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="办事处业务费金额(元)"
                v-model="object.employee.office.businessMoney"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <v-card style="margin-top: 1px">
      <v-card-title>报销详情</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row>
            <v-col cols="6">
              <v-text-field label="类型" v-model="object.expenseType.text">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="发起时间" v-model="object.CreatedAt">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="办事处"
                v-model="object.employee.office.name"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="员工" v-model="object.employee.name">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="员工电话" v-model="object.employee.phone">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="金额(元)" v-model="object.amount">
              </v-text-field>
            </v-col>
            <v-col>
              <v-textarea
                label="申请理由"
                v-model="object.text"
                auto-grow
                rows="1"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="pass" :disabled="submitDisabled">
          通过
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" rounded @click="fail"> 驳回 </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { queryExpense, approvalExpense } from "@/api/expense";
export default {
  props: {
    openUID: {
      type: String,
      default: "",
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    object: {
      CreatedAt: "",
      amount: 0,
      text: "",

      expenseType: {
        text: "",
      },
      employee: {
        money: 0,
        name: "",
        phone: "",
        office: {
          name: "",
          money: 0,
          businessMoney: 0,
        },
      },

      isPass: false,
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryExpense(this.openUID).then((res) => {
        this.object = res.data;
      });
    },
    pass() {
      this.object.isPass = true;
      this.editObject();
    },
    fail() {
      this.object.isPass = false;
      this.editObject();
    },
    editObject() {
      this.submitDisabled = true;
      approvalExpense(this.object).then((res) => {
        this.$message.success("已完成！");
        this.refresh();
        this.closeDialog();
      });
    },
  },
};
</script>