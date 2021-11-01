<template>
  <v-card class="mx-auto">
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="object.typeUID"
              :items="expenseTypeItems"
              item-text="text"
              item-value="value"
              label="类型"
              :rules="rules.typeUID"
            ></v-select>
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="金额(元)"
              v-model.number="object.amount"
              :rules="rules.amount"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="申请理由"
              v-model.trim="object.text"
              :rules="rules.text"
              auto-grow
              rows="3"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { entryExpense } from "@/api/expense";
export default {
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    openUID: {
      type: String,
      default: "",
    },
    parentFun: {
      type: Function,
      default: null,
    },
  },
  data: () => ({
    expenseTypeItems: [
      { text: "个人", value: 1 },
      { text: "办事处", value: 2 },
    ],
    object: {
      typeUID: "",
      amount: 0,
      text: "",
    },
    rules: {
      typeUID: [(v) => !!v || "必填项！"],
      amount: [
        (v) => !!v || "必填项！",
        (v) => /[0-9]+$/.test(v) || "金额必须为数字",
      ],
      text: [(v) => !!v || "必填项！"],
    },
  }),
  methods: {
    entryObject() {
      var _this = this;
      if (this.validateForm()) {
        entryExpense(this.object).then((res) => {
          this.$message.success("录入成功了!");
          setTimeout(function () {
            _this.$router.replace("/expense");
          }, 1000);
        });
      } else {
        this.$message.error("信息填写异常，请检查后再提交！");
        if (this.parentFun) {
          this.parentFun(false);
        }
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>