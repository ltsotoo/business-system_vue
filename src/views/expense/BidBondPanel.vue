<template>
  <div>
    <v-card>
      <v-card-title>投标保证金管理</v-card-title>
      <v-card-subtitle>
        <v-form ref="from">
          <v-row align="baseline">
            <v-spacer></v-spacer>
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
              <v-select
                v-model="queryObject.officeUID"
                :items="officeItems"
                item-text="name"
                item-value="UID"
                label="办事处"
                :clearable="nos.includes('07-02-01')"
                :disabled="!nos.includes('07-02-01')"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="业务员名称"
                v-model.trim="queryObject.salesmanName"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn
                rounded
                color="success"
                dark
                @click="openAddDialog"
                v-if="nos.includes('07-02-02')"
              >
                添加
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
      </v-card-subtitle>
      <div style="margin-top: 10px"></div>
      <bidBondDataTable
        ref="bidBondDataTable"
        :queryObject="queryObject"
        :statusItems="statusItems"
        :dataTableHeaders="dataTableHeaders"
      />
    </v-card>

    <v-dialog v-model="addDialog" v-if="addDialog" width="1000px" persistent>
      <bidBondAddForms :refresh="query" :closeDialog="closAddDialog" />
    </v-dialog>
  </div>
</template>

<script>
import bidBondDataTable from "@/components/bidBond/DataTable";
import bidBondAddForms from "@/components/bidBond/AddForms";
import { queryOffices } from "@/api/oadrp";
import { queryBidBondStatus } from "@/api/dictionary";
export default {
  components: {
    bidBondDataTable,
    bidBondAddForms,
  },
  data: () => ({
    nos: [],

    statusItems: [],
    officeItems: [],
    queryObject: {
      status: 1,
      officeUID: "",
      salesmanName: "",
    },

    addDialog: false,

    dataTableHeaders: [
      {
        text: "录入时间",
        align: "center",
        value: "CreatedAt",
        sortable: false,
      },
      {
        text: "办事处",
        align: "center",
        value: "salesman.office.name",
        sortable: false,
      },
      {
        text: "业务员",
        align: "center",
        value: "salesman.name",
        sortable: false,
      },
      {
        text: "录入人员",
        align: "center",
        value: "employee.name",
        sortable: false,
      },
      {
        text: "回款确认人",
        align: "center",
        value: "finalEmployee.name",
        sortable: false,
      },
      {
        text: "金额(元)",
        align: "center",
        value: "money",
        sortable: false,
      },
      {
        text: "备注",
        align: "center",
        value: "remarks",
        sortable: false,
      },
      {
        text: "状态",
        align: "center",
        value: "status",
        sortable: false,
      },
      {
        text: "操作",
        align: "center",
        value: "actions",
        sortable: false,
      },
    ],
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
    if (!this.nos.includes("07-02-01")) {
      this.queryObject.officeUID = localStorage.getItem("office");
    }
    this.getStatusItems();
    this.getOfficeItems();
  },
  methods: {
    getStatusItems() {
      queryBidBondStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    query() {
      this.$refs.bidBondDataTable.getObject();
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