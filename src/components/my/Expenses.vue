<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :items-per-page="5"
      :server-items-length="options.total"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
      :loading="options.loading"
      :options.sync="options"
      @update:page="getObject"
      @update:items-per-page="getObject"
    >
      <template v-slot:[`item.status`]="{ item }">
        {{ statusToText(item.status) }}
      </template>
      <template v-slot:[`item.text`]="{ item }">
        <v-textarea
          auto-grow
          readonly
          rows="1"
          v-model="item.text"
        ></v-textarea>
      </template>
      <template v-slot:[`item.UpdatedAt`]="{ item }">
        <div v-if="item.status != 1">{{ item.UpdatedAt }}</div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          text
          color="error"
          v-if="item.status == -1"
          @click="openDeleteDialog(item.UID)"
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="deleteDialog"
      v-if="deleteDialog"
      width="800px"
      persistent
      @click:outside="closeDeleteDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定删除该报销记录吗?</v-card-title>
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
import { delExpense, queryExpenses } from "@/api/expense";
export default {
  props: {
    queryObject: {
      type: Object,
    },
    statusItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    headers: [
      {
        text: "类型",
        align: "center",
        value: "expenseType.text",
        sortable: false,
      },
      {
        text: "金额(元)",
        align: "center",
        value: "amount",
        sortable: false,
      },
      {
        text: "审发理由",
        align: "center",
        value: "text",
        sortable: false,
      },
      {
        text: "发起时间",
        align: "center",
        value: "CreatedAt",
        sortable: false,
      },
      {
        text: "办事处审批人",
        align: "center",
        value: "approver1.name",
        sortable: false,
      },
      {
        text: "财务",
        align: "center",
        value: "approver2.name",
        sortable: false,
      },
      {
        text: "出纳",
        align: "center",
        value: "approver3.name",
        sortable: false,
      },
      {
        text: "最后审批时间",
        align: "center",
        value: "UpdatedAt",
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
      approvalDialog: false,
    },
    deleteDialog: false,
    object: [],
    openItem: {},
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      this.options.loading = true;
      this.queryObject.EmployeeUID = localStorage.getItem("uid");
      queryExpenses(
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
    },
    statusToText(status) {
      var temp = "";
      this.statusItems.some((item) => {
        if (item.value == status) {
          temp = item.text;
          return;
        }
      });
      return temp;
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
      delExpense(this.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },
  },
};
</script>