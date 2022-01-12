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
      <template v-slot:[`item.no`]="{ item }">
        <v-chip :color="noColor(item)">
          {{ item.no }}
        </v-chip>
      </template>
      <template v-slot:[`item.totalAmount`]="{ item }">
        <div v-if="item.payType == 1">{{ item.totalAmount }}元</div>
        <div v-if="item.payType == 2">{{ item.totalAmount }}美元</div>
      </template>
      <template v-slot:[`item.estimatedDeliveryDate`]="{ item }">
        <div v-if="item.status != 3">
          <v-chip :color="estimatedDeliveryDateColor(item)">
            {{ item.estimatedDeliveryDate }}
          </v-chip>
        </div>
        <div v-else>
          {{ item.estimatedDeliveryDate }}
        </div>
      </template>
      <template v-slot:[`item.preDeposit`]="{ item }">
        <div v-if="item.isPreDeposit">
          {{ item.preDeposit }}
        </div>
      </template>
      <template v-slot:[`item.notPaymentTotalAmount`]="{ item }">
        <div v-if="item.payType == 1 && !item.isPreDeposit">
          {{ item.totalAmount - item.paymentTotalAmount }}
        </div>
        <div v-if="item.payType == 1 && item.isPreDeposit">
          {{ item.preDepositRecord - item.paymentTotalAmount }}
        </div>
      </template>
      <template v-slot:[`item.isSpecial`]="{ item }">
        {{ item.isSpecial == true ? "是" : "否" }}
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
          color="primary"
          @click="openEditDialog(item)"
          v-if="item.status == 0"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openAddTaskDialog(item)"
          v-if="
            item.isPreDeposit && item.status == 2 && item.productionStatus == 1
          "
        >
          <v-icon left> mdi-plus-thick </v-icon>
          预存款采购
        </v-btn>
        <v-btn
          text
          color="error"
          @click="openDeleteDialog(item.UID)"
          v-if="item.status == -1"
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="editDialog"
      v-if="editDialog"
      width="100%"
      persistent
      @click:outside="closeEditDialog"
    >
      <v-card>
        <contractEditMyForms
          :parentObj="openItem"
          :refresh="getObject"
          :closeDialog="closeEditDialog"
        />
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="viewDialog"
      v-if="viewDialog"
      width="1440px"
      persistent
      @click:outside="closeViewDialog"
    >
      <contractViewForms
        :openItem="openItem"
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

    <v-dialog
      v-model="addTaskDialog"
      v-if="addTaskDialog"
      width="90%"
      persistent
      @click:outside="closeAddTaskDialog"
    >
      <taskAdd :contract="openItem" />
    </v-dialog>
  </div>
</template>

<script>
import contractViewForms from "@/components/contract/ViewForms";
import contractEditMyForms from "@/components/contract/EditMyForms";
import taskAdd from "@/components/task/Add";
import { delContract, queryContracts } from "@/api/contract";
export default {
  components: {
    contractViewForms,
    contractEditMyForms,
    taskAdd,
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
    payTypeItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
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
        text: "预存款金额",
        align: "center",
        value: "preDeposit",
        sortable: false,
      },
      {
        text: "总金额",
        align: "center",
        value: "totalAmount",
        sortable: false,
      },
      {
        text: "未回款额(CNY)",
        align: "center",
        value: "notPaymentTotalAmount",
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
    editDialog: false,
    deleteDialog: false,
    viewDialog: false,
    addTaskDialog: false,
  }),
  created() {
    this.getObject();
  },
  methods: {
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
    noColor(item) {
      if (item.endDeliveryDate != "") {
        var endDeliveryDate = Date.parse(item.endDeliveryDate);
        var endDate;
        if (item.collectionStatus == 1) {
          endDate = Date.parse(item.endDeliveryDate);
        } else if (item.collectionStatus == 2) {
          endDate = Date.parse(item.endPaymentDate);
        }
        if (endDeliveryDate + 60 * 24 * 60 * 60 * 1000 < endDate) {
          return "red";
        }
      }
      return "green";
    },
    estimatedDeliveryDateColor(item) {
      var estimatedDeliveryDate = Date.parse(item.estimatedDeliveryDate);
      var endDate;
      if (item.endDeliveryDate != "") {
        endDate = Date.parse(item.endDeliveryDate);
      } else {
        endDate = new Date().getTime();
      }
      if (endDate > estimatedDeliveryDate) {
        return "red";
      }
      if (endDate + 7 * 24 * 60 * 60 * 1000 > estimatedDeliveryDate) {
        return "orange";
      }
      return "green";
    },
    openAddTaskDialog(item) {
      this.openItem = item;
      this.addTaskDialog = true;
    },
    closeAddTaskDialog() {
      this.openItem = {};
      this.addTaskDialog = false;
    },
    openViewDialog(item) {
      this.openItem = item;
      this.viewDialog = true;
    },
    closeViewDialog() {
      this.openItem = {};
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
    openEditDialog(item) {
      this.openItem = JSON.parse(JSON.stringify(item));
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openItem = {};
      this.editDialog = false;
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