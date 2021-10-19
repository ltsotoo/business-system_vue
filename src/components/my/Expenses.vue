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
      <template v-slot:[`item.status`]="{ item }">
        {{ statusToText(item.status) }}
      </template>
      <template v-slot:[`item.UpdatedAt`]="{ item }">
        <div v-if="item.approverUID">{{ item.UpdatedAt }}</div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { queryMyExpenses } from "@/api/expense";
export default {
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
        value: "type.text",
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
        text: "审批人",
        align: "center",
        value: "approver.name",
        sortable: false,
      },
      {
        text: "审批时间",
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
      queryMyExpenses(
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
      switch (status) {
        case -1:
          return "已驳回";
        case 1:
          return "待审批";
        case 2:
          return "已通过";
      }
    },
  },
};
</script>