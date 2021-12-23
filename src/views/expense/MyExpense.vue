<template>
  <!-- 报销 -->
  <v-container>
    <myExpenseForms />
    <v-card style="margin-top: 10px">
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="4">
              <v-select
                v-model="queryObject.type"
                :items="typeItems"
                item-text="text"
                item-value="UID"
                label="类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="4">
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
          :statusItems="statusItems"
          ref="myExpenses"
        />
      </v-card-subtitle>
    </v-card>

    <v-dialog v-model="addDialog" v-if="addDialog" width="1000px" persistent>
      <expenseForms :refresh="query" :closeDialog="closAddDialog" />
    </v-dialog>
  </v-container>
</template>

<script>
import myExpenseForms from "@/components/expense/MyExpenseForms";
import myExpenses from "@/components/my/Expenses";
import expenseForms from "@/components/expense/Forms";
import { queryExpenseTypes, queryExpenseStatus } from "@/api/dictionary";
export default {
  components: {
    myExpenseForms,
    myExpenses,
    expenseForms,
  },
  data: () => ({
    typeItems: [],
    statusItems: [],
    queryObject: {
      type: 0,
      status: 0,
    },
    addDialog: false,
  }),
  created() {
    this.getTypeItems();
    this.getStatusItems();
  },
  methods: {
    getTypeItems() {
      queryExpenseTypes().then((res) => {
        this.typeItems = res.data;
      });
    },
    getStatusItems() {
      queryExpenseStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
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