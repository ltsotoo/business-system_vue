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
    </v-data-table>
  </div>
</template>

<script>
import { queryExpenses } from "@/api/expense";
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
      this.queryObject.EmployeeUID = localStorage.getItem("uid") 
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
  },
};
</script>