<template>
  <v-card class="mx-auto">
    <v-card-title></v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="类型"
              v-model="object.type.text"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="办事处"
              v-model="object.employee.office.name"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="员工"
              v-model="object.employee.name"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="员工电话"
              v-model="object.employee.phone"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="金额(元)"
              v-model="object.amount"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="发起时间"
              v-model="object.CreatedAt"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="申请理由"
              v-model="object.text"
              readonly
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn color="primary" depressed>
              <v-icon left> mdi-check-bold </v-icon>
              通过
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="error" depressed @click="fail">
              <v-icon left> mdi-close-thick </v-icon>
              驳回
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { editExpense } from "@/api/expense";
export default {
  props: {
    expense: {
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
    if (this.expense) {
      this.object = this.expense;
    }
  },
  methods: {
    pass() {
      this.object.status = 1;
      this.editObject();
    },
    fail() {
      this.object.status = -1;
      this.editObject();
    },
    editObject() {
      editExpense(this.object).then((res) => {
        this.$message.success("审批完成");
        this.refresh();
        this.closeDialog();
      });
    },
  },
};
</script>