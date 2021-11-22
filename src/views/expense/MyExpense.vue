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
              <v-btn rounded color="success" dark @click="openAddDialog">
                发起
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <myExpenses
          style="margin-top: 10px"
          :queryObject="queryObject"
          ref="myExpenses"
        />
      </v-card-subtitle>
    </v-card>

    <v-dialog v-model="addDialog" v-if="addDialog" width="800px" persistent>
      <expenseForms :refresh="query" :closeDialog="closAddDialog" />
    </v-dialog>
  </v-container>
</template>

<script>
import myExpenses from "@/components/my/Expenses";
import expenseForms from "@/components/expense/Forms";
export default {
  components: {
    myExpenses,
    expenseForms,
  },
  data: () => ({
    typeItems: [
      { text: "个人", value: 1 },
      { text: "办事处", value: 2 },
    ],
    statusItems: [
      { text: "已驳回", value: -1 },
      { text: "待办事处审批", value: 1 },
      { text: "待财务审批", value: 2 },
      { text: "已通过", value: 3 },
    ],
    queryObject: {
      type: 0,
      status: 0,
    },
    addDialog: false,
  }),
  methods: {
    query() {
      this.$refs.myExpenses.getObject();
    },
    openAddDialog() {
      this.addDialog = true;
    },
    closAddDialog() {
      this.addDialog = false;
    },
  },
};
</script>