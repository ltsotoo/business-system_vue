<template>
  <v-card>
    <v-card-title>我的投标保证金</v-card-title>
    <v-card-subtitle>
      <v-form ref="from">
        <v-row align="baseline">
          <v-spacer></v-spacer>
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
</template>

<script>
import bidBondDataTable from "@/components/bidBond/DataTable";
import { queryBidBondStatus } from "@/api/dictionary";
export default {
  components: {
    bidBondDataTable,
  },
  data: () => ({
    statusItems: [],
    queryObject: {
      status: 1,
    },


    dataTableHeaders: [
      {
        text: "录入时间",
        align: "center",
        value: "CreatedAt",
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
    ],
  }),
  created() {
    this.getStatusItems();
  },
  methods: {
    getStatusItems() {
      queryBidBondStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    query() {
      this.$refs.bidBondDataTable.getObject();
    },
  },
};
</script>