<template>
  <v-card>
    <v-card-title>发起报销</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="object.type"
              :items="expenseTypeItems"
              item-text="text"
              item-value="UID"
              label="类型"
              :rules="rules.must"
            ></v-select>
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="金额(元)"
              v-model.number="object.amount"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="申请理由"
              v-model.trim="object.text"
              :rules="rules.must"
              auto-grow
              rows="3"
              counter
              maxlength="500"
            ></v-textarea>
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
import { entryExpense } from "@/api/expense";
import { queryExpenseTypes } from "@/api/dictionary";
export default {
  props: {
    refresh: {
      type: Function,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    nos: [],

    submitDisabled: false,
    expenseTypeItems: [],
    object: {
      type: "",
      amount: 0,
      text: "",
    },
    rules: {
      must: [(v) => !!v || "必填项"],
      money: [
        (v) => /^\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },
  }),
  created() {
    this.getExpenseTypeItems();
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
  methods: {
    getExpenseTypeItems() {
      queryExpenseTypes().then((res) => {
        if (this.nos.includes("01-01-01")) {
          this.expenseTypeItems.push(res.data[0]);
        }
        if (this.nos.includes("01-01-02")) {
          this.expenseTypeItems.push(res.data[1]);
        }
        if (this.nos.includes("01-01-03")) {
          this.expenseTypeItems.push(res.data[2]);
        }
        if (this.nos.includes("01-01-04")) {
          this.expenseTypeItems.push(res.data[3]);
        }
      });
    },
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        entryExpense(this.object).then((res) => {
          this.$message.success("发起成功了!");
          this.refresh();
          this.closeDialog();
        });
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