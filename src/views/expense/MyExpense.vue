<template>
  <!-- 报销 -->
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-select
                v-model="queryObject.type"
                :items="typeItems"
                item-text="text"
                item-value="value"
                label="类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="queryObject.status"
                :items="statusItems"
                item-text="text"
                item-value="value"
                label="状态"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="success" dark @click="goToEntry">
                发起
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <expenses
          style="margin-top: 10px"
          :queryObject="queryObject"
          ref="expenses"
        />
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import expenses from "@/components/my/Expenses";
export default {
  components: {
    expenses,
  },
  data: () => ({
    typeItems: [
      { text: "个人", value: 1 },
      { text: "办事处", value: 2 },
    ],
    statusItems: [
      { text: "已驳回", value: -1 },
      { text: "待审批", value: 1 },
      { text: "已通过", value: 2 },
    ],
    queryObject: {
      type: 0,
      status: 0,
    },
  }),
  methods: {
    goToEntry() {
      this.$router.replace("/myExpense/entry");
    },
    query() {
      this.$refs.expenses.getObject();
    },
  },
};
</script>