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
                v-model="queryObject.typeUID"
                :items="typeItems"
                item-text="text"
                item-value="UID"
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
      </v-card-subtitle>
    </v-card>
    <expenses
      style="margin-top: 10px"
      :queryObject="queryObject"
      ref="expenses"
    />
  </v-container>
</template>

<script>
import expenses from "@/components/my/Expenses";
import { queryExpenseType } from "@/api/dictionary";
export default {
  components: {
    expenses,
  },
  data: () => ({
    typeItems: [],
    statusItems: [
      { text: "已驳回", value: -1 },
      { text: "待审批", value: 1 },
      { text: "已通过", value: 2 },
    ],
    queryObject: {
      typeUID: "",
      status: 0,
    },
  }),
  created() {
    this.getTypeItems();
  },
  methods: {
    goToEntry() {
      this.$router.replace("/expense/entry");
    },
    getTypeItems() {
      queryExpenseType().then((res) => {
        this.typeItems = res.data.dictionaries;
      });
    },
    query() {
      this.$refs.expenses.getObject();
    },
  },
};
</script>