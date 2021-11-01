<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :items-per-page="5"
      class="elevation-1"
      :server-items-length="options.total"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
      :loading="options.loading"
      :options.sync="options"
      @update:page="getObject"
      @update:items-per-page="getObject"
    >
      <template v-slot:[`item.type`]="{ item }">
        {{ typeToText(item.status) }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ statusToText(item.status) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          rounded
          color="primary"
          depressed
          @click="openApprovalDialog(item)"
          :disabled="item.status != 1"
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          审批
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.approvalDialog"
      v-if="options.approvalDialog"
      max-width="1080px"
    >
      <expenseApprovalForms
        :expense="openItem"
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
        text: "类型",
        align: "center",
        value: "type",
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
        text: "金额(元)",
        align: "center",
        value: "amount",
        sortable: false,
      },
      {
        text: "发起时间",
        align: "center",
        value: "CreatedAt",
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
      });
    },
    openApprovalDialog(item) {
      this.openItem = item;
      console.log(this.openItem);
      this.options.approvalDialog = true;
    },
    closeApprovalDialog() {
      this.openItem = {};
      this.options.approvalDialog = false;
    },
    typeToText(type) {
      switch (type) {
        case 1:
          return "个人";
        case 2:
          return "办事处";
      }
    },
    statusToText(status) {
      if (status == -1) {
        return "已驳回";
      }
      if (status == 1) {
        return "待审批";
      }
      if (status == 2) {
        return "已通过";
      }
    },
  },
};
</script>