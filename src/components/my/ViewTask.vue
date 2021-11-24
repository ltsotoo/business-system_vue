<template>
  <div>
    <v-card>
      <v-card-title>合同产品详情</v-card-title>
      <v-data-table
        :headers="headers"
        :items="parentObject"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:[`item.standardPrice`]="{ item }">
          <v-row>
            <v-col> 人民币：{{ item.standardPrice }} </v-col>
          </v-row>
          <v-row>
            <v-col> 美元：{{ item.standardPriceUSD }} </v-col>
          </v-row>
        </template>
        <template v-slot:[`item.startDate`]="{ item }">
          <v-row>
            <v-col v-if="item.type == 3">
              设计：{{ item.technicianStartDate }}
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="item.type > 1 && item.status > 1">
              采购：{{ item.purchaseStartDate }}
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="item.status > 2">
              仓库：{{ item.inventoryStartDate }}
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="item.status > 4">
              物流：{{ item.shipmentStartDate }}
            </v-col>
          </v-row>
        </template>
        <template v-slot:[`item.days`]="{ item }">
          <v-row v-if="item.type == 3">
            <v-col> 设计限时：{{ item.technicianDays }}天 </v-col>
          </v-row>
          <v-row v-if="item.type > 1">
            <v-col> 采购限时：{{ item.purchaseDays }}天 </v-col>
          </v-row>
        </template>
        <template v-slot:[`item.realEndDate`]="{ item }">
          <v-row>
            <v-col v-if="item.type == 3 && item.status > 1">
              设计：{{ item.technicianRealEndDate }}
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="item.type > 1 && item.status > 2">
              采购：{{ item.purchaseRealEndDate }}
            </v-col>
          </v-row>
        </template>
        <template v-slot:[`item.employees`]="{ item }">
          <v-row><v-col> </v-col></v-row>
          <v-row v-if="item.technicianMan.name">
            <v-col>技术：{{ item.technicianMan.name }}</v-col>
          </v-row>
          <v-row v-if="item.purchaseMan.name">
            <v-col>采购：{{ item.purchaseMan.name }}</v-col>
          </v-row>
          <v-row v-if="item.inventoryMan.name">
            <v-col>仓库：{{ item.inventoryMan.name }}</v-col>
          </v-row>
          <v-row v-if="item.shipmentMan.name">
            <v-col>物流：{{ item.shipmentMan.name }}</v-col>
          </v-row>
          <v-row><v-col> </v-col></v-row>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          {{ stautsToText(item.status) }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import approve from "@/components/task/Approve";
import viewTaskRemarks from "@/components/task/ViewTaskRemarks.vue";
export default {
  components: {
    approve,
    viewTaskRemarks,
  },
  props: {
    parentObject: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    headers: [
      {
        text: "产品",
        align: "center",
        sortable: false,
        value: "product.name",
      },
      { text: "数量", align: "center", value: "number", sortable: false },
      { text: "单位", align: "center", value: "unit", sortable: false },
      {
        text: "标准价格",
        align: "center",
        value: "standardPrice",
        sortable: false,
      },
      { text: "单价", value: "price", sortable: false },
      { text: "总价", value: "totalPrice", sortable: false },
      {
        text: "负责人",
        align: "center",
        value: "employees",
        sortable: false,
      },
      {
        text: "开始时间",
        align: "center",
        value: "startDate",
        sortable: false,
      },
      { text: "状态", align: "center", value: "status", sortable: false },
    ],
    options: {
      total: 1,
      page: 1,
      itemsPerPage: 10,
    },
    openItem: {},
    viewDialog: false,
    taskRemarks: [],
  }),
  methods: {
    stautsToText(status) {
      switch (status) {
        case 0:
          return "待审批";
        case 1:
          return "待设计";
        case 2:
          return "待采购";
        case 3:
          return "待入/出库";
        case 4:
          return "待装配";
        case 5:
          return "待发货";
        case 6:
          return "已发货";
      }
    },
  },
};
</script>