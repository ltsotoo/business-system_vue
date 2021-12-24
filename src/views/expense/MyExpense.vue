<template>
  <!-- 报销 -->
  <v-container>
    <myExpenseForms />
    <v-card style="margin-top: 10px">
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-select
                v-model="queryObject.type"
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
            <v-col cols="2">
              <v-menu
                ref="startMenu"
                v-model="startMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="queryObject.startDate"
                    label="开始时间"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="zh-cn"
                  scrollable
                  no-title
                  v-model="queryObject.startDate"
                  @change="$refs.yearMenu.save(queryObject.startDate)"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="2">
              <v-menu
                ref="endMenu"
                v-model="endMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="queryObject.endDate"
                    label="结束时间"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="zh-cn"
                  scrollable
                  no-title
                  v-model="queryObject.endDate"
                  @change="$refs.yearMenu.save(queryObject.endDate)"
                >
                </v-date-picker>
              </v-menu>
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
    startMenu: false,
    endMenu: false,
    queryObject: {
      type: 0,
      status: 0,
      startDate: "",
      endDate: "",
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