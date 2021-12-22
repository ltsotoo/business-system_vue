<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :server-items-length="options.total"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
      :loading="options.loading"
      :options.sync="options"
      @update:page="getObject"
      @update:items-per-page="getObject"
    >
      <template v-slot:[`item.estimatedDeliveryDate`]="{ item }">
        <div v-if="item.status != 3">
          <v-chip :color="compareColor(item.estimatedDeliveryDate)">
            {{ item.estimatedDeliveryDate }}
          </v-chip>
        </div>
        <div v-else>
          {{ item.estimatedDeliveryDate }}
        </div>
      </template>
      <template v-slot:[`item.isSpecial`]="{ item }">
        {{ item.isSpecial == true ? "是" : "否" }}
      </template>
      <template v-slot:[`item.payType`]="{ item }">
        {{ payTypeToText(item.payType) }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ stautsToText(item) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="success" @click="openViewDialog(item)">
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn
          text
          color="error"
          @click="openDeleteDialog(item.UID)"
          v-if="item.status == -1 || item.status == 1"
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="viewDialog"
      v-if="viewDialog"
      width="1440px"
      persistent
      @click:outside="closeViewDialog"
    >
      <contractViewForms
        :openUID="openUID"
        :isIndex="true"
        :statusItems="statusItems"
        :productionStatusItems="productionStatusItems"
        :collectionStatusItems="collectionStatusItems"
        :payTypeItems="payTypeItems"
      />
    </v-dialog>

    <v-dialog
      v-model="deleteDialog"
      v-if="deleteDialog"
      width="800px"
      persistent
      @click:outside="closeDeleteDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定删除该合同吗?</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="deleteItem">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeDeleteDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import contractViewForms from "@/components/contract/ViewForms";
import { delContract, queryContracts } from "@/api/contract";
import { queryContractPayTypes } from "@/api/dictionary";
export default {
  components: {
    contractViewForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
    statusItems: {
      type: Array,
      default: () => [],
    },
    productionStatusItems: {
      type: Array,
      default: () => [],
    },
    collectionStatusItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    payTypeItems: [],
    headers: [
      {
        text: "合同编号",
        align: "center",
        value: "no",
        sortable: false,
      },
      {
        text: "客户单位",
        align: "center",
        value: "customer.company.name",
        sortable: false,
      },
      {
        text: "客户",
        align: "center",
        value: "customer.name",
        sortable: false,
      },
      {
        text: "合同交货日期",
        align: "center",
        value: "estimatedDeliveryDate",
        sortable: false,
      },
      {
        text: "实际交货日期",
        align: "center",
        value: "endDeliveryDate",
        sortable: false,
      },
      {
        text: "付款类型",
        align: "center",
        value: "payType",
        sortable: false,
      },
      {
        text: "总金额",
        align: "center",
        value: "totalAmount",
        sortable: false,
      },
      {
        text: "总回款额(CNY)",
        align: "center",
        value: "paymentTotalAmount",
        sortable: false,
      },
      {
        text: "总回款额(USD)",
        align: "center",
        value: "paymentTotalAmountUSD",
        sortable: false,
      },
      {
        text: "特殊合同",
        align: "center",
        value: "isSpecial",
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
    options: {
      loading: false,
      total: 0,
      page: 1,
      itemsPerPage: 10,
    },
    object: [],

    openUID: "",
    deleteDialog: false,
    viewDialog: false,
  }),
  created() {
    this.getPayTypeItems();
    this.getObject();
  },
  methods: {
    getPayTypeItems() {
      queryContractPayTypes().then((res) => {
        this.payTypeItems = res.data;
      });
    },
    getObject() {
      var employeeUID = localStorage.getItem("uid");
      if (employeeUID && employeeUID != "") {
        this.queryObject.employeeUID = employeeUID;
        this.options.loading = true;
        queryContracts(
          this.queryObject,
          this.options.itemsPerPage,
          this.options.page
        ).then((res) => {
          this.options.loading = false;
          if (res.total < this.options.total) {
            this.options.page = 1;
          }
          this.options.total = res.total;
          if (this.options.total != 0) {
            this.object = res.data;
          }
        });
      }
    },
    stautsToText(e) {
      if (e.status == 2) {
        return (
          this.productionStatusToText(e.productionStatus) +
          "," +
          this.collectionStatusToText(e.collectionStatus)
        );
      } else {
        var temp = "";
        this.statusItems.some((item) => {
          if (item.value == e.status) {
            temp = item.text;
            return;
          }
        });
        return temp;
      }
    },
    productionStatusToText(status) {
      var temp = "";
      this.productionStatusItems.some((item) => {
        if (item.value == status) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
    collectionStatusToText(status) {
      var temp = "";
      this.collectionStatusItems.some((item) => {
        if (item.value == status) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
    compareColor(date) {
      //替换为‘/’转译为中国时间，‘-’转译为UTC
      date = date.replace(/-/g, "/");
      var nowDate = new Date().getTime();
      var parseDate = Date.parse(date);
      if (nowDate > parseDate) {
        return "red";
      }
      if (nowDate + 7 * 24 * 60 * 60 * 1000 > parseDate) {
        return "orange";
      }
      return "green";
    },
    payTypeToText(payType) {
      var temp = "";
      this.payTypeItems.some((item) => {
        if (item.value == payType) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
    openViewDialog(item) {
      this.openUID = item.UID;
      this.viewDialog = true;
    },
    closeViewDialog() {
      this.openUID = "";
      this.viewDialog = false;
    },
    openDeleteDialog(uid) {
      this.openUID = uid;
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.openUID = "";
      this.deleteDialog = false;
    },
    deleteItem() {
      delContract(this.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },
  },
};
</script>