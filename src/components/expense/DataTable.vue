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
      <template v-slot:[`item.money`]="{ item }">
        <div v-if="item.type == 1">{{ item.employee.money }}</div>
        <div v-if="item.type == 2">{{ item.employee.office.money }}</div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          text
          color="primary"
          @click="openApprovalDialog(item)"
          v-if="item.status == 1"
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          审批
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openApprovalDialog(item)"
          v-if="item.status == 2"
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          审批
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.approvalDialog"
      v-if="options.approvalDialog"
      width="1000px"
    >
      <expenseApprovalForms
        :parentObj="openItem"
        :closeDialog="closeApprovalDialog"
        :refresh="getObject"
      />
    </v-dialog>
  </div>
</template>

<script>
import expenseApprovalForms from "@/components/expense/ApprovalForms";
import { queryExpenses } from "@/api/expense";
export default {
  components: {
    expenseApprovalForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      {
        text: "发起时间",
        align: "center",
        value: "CreatedAt",
        sortable: false,
      },
      {
        text: "类型",
        align: "center",
        value: "typeText",
        sortable: false,
      },
      {
        text: "办事处",
        align: "center",
        value: "employee.office.name",
        sortable: false,
      },
      {
        text: "员工",
        align: "center",
        value: "employee.name",
        sortable: false,
      },
      {
        text: "员工电话",
        align: "center",
        value: "employee.phone",
        sortable: false,
      },
      {
        text: "可用报销金额(元)",
        align: "center",
        value: "money",
        sortable: false,
      },
      {
        text: "报销金额(元)",
        align: "center",
        value: "amount",
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
    object: [],
    openItem: {},
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      this.options.loading = true;
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
        this.typeToText();
      });
    },
    openApprovalDialog(item) {
      this.openItem = JSON.parse(JSON.stringify(item));
      this.options.approvalDialog = true;
    },
    closeApprovalDialog() {
      this.openItem = {};
      this.options.approvalDialog = false;
    },
    typeToText() {
      this.object.forEach(function (e) {
        switch (e.type) {
          case 1:
            e.typeText = "个人";
            break;
          case 2:
            e.typeText = "办事处";
            break;
        }
      });
    },
    statusToText(status) {
      if (status == -1) {
        return "已驳回";
      }
      if (status == 1) {
        return "待办事处审批";
      }
      if (status == 2) {
        return "待财务审批";
      }
      if (status == 3) {
        return "已通过";
      }
    },
  },
};
</script>