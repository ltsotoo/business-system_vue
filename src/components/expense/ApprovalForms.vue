<template>
  <v-card class="mx-auto">
    <v-card-title>审批</v-card-title>
    <v-card-subtitle>
      <v-form ref="form" readonly>
        <v-row>
          <v-col cols="6">
            <v-text-field label="类型" v-model="object.typeText">
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="发起时间" v-model="object.CreatedAt">
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="办事处" v-model="object.employee.office.name">
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
        <v-row justify="center">
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="pass">
              <v-icon left> mdi-check-bold </v-icon>
              通过
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn rounded color="error" @click="fail">
              <v-icon left> mdi-close-thick </v-icon>
              驳回
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { approvalExpense } from "@/api/expense";
export default {
  props: {
    parentObj: {
      type: Object,
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    object: {},
  }),
  created() {
    this.object = this.parentObj;
  },
  methods: {
    pass() {
      this.object.status = this.object.status + 1;
      this.editObject();
    },
    fail() {
      this.object.status = -1;
      this.editObject();
    },
    editObject() {
      approvalExpense(this.object).then((res) => {
        this.$message.success("审批完成");
        this.refresh();
        this.closeDialog();
      });
    },
  },
};
</script>