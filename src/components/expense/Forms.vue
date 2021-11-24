<template>
  <v-card class="mx-auto">
    <v-card-title>发起报销</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="object.type"
              :items="expenseTypeItems"
              item-text="text"
              item-value="value"
              label="类型"
              :rules="rules.must"
              :disabled="nos.indexOf('6') == -1"
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
      <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { entryExpense } from "@/api/expense";
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
    expenseTypeItems: [
      { text: "个人", value: 1 },
      { text: "办事处", value: 2 },
    ],
    object: {
      type: 1,
      amount: 0,
      text: "",
    },
    rules: {
      must: [(v) => !!v || "必填项！"],
      money: [
        (v) => /^[1-9][0-9]*(\.[0-9]{1,3})?$/.test(v) || "金额的格式错误",
      ],
    },

    nos: [],
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        entryExpense(this.object).then((res) => {
          this.$message.success("发起成功了!");
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