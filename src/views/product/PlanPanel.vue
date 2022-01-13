<template>
  <div>
    <v-card>
      <v-card-title>采购计划</v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="4">
              <v-text-field
                label="合同编号"
                v-model="queryObject.no"
                maxlength="40"
                clearable
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="物品名称"
                v-model="queryObject.product"
                maxlength="20"
                clearable
              >
              </v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-col cols="auto" v-if="nos.includes('05-03-02')">
              <v-btn rounded color="success" dark @click="openAddDialog">
                添加
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <procurementPlanDataTable
          :queryObject="queryObject"
          ref="procurementPlanDataTable"
        />
      </v-card-subtitle>
    </v-card>

    <v-dialog v-model="addDialog" v-if="addDialog" width="1400px" persistent>
      <procurementPlanForms :refresh="query" :closeDialog="closAddDialog" />
    </v-dialog>
  </div>
</template>

<script>
import procurementPlanDataTable from "@/components/procurementPlan/DataTable";
import procurementPlanForms from "@/components/procurementPlan/Forms";
export default {
  components: {
    procurementPlanDataTable,
    procurementPlanForms,
  },
  data: () => ({
    nos: [],

    queryObject: {
      no: "",
      product: "",
    },

    addDialog: false,
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
  },
  methods: {
    getTypeItems() {
      queryProductTypes().then((res) => {
        this.typeItems = res.data;
      });
    },
    query() {
      this.$refs.procurementPlanDataTable.getObject();
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