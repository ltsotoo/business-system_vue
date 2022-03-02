<template>
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
  ></v-data-table>
</template>

<script>
import { queryHistoryEmployees } from "@/api/history";
export default {
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      {
        text: "时间",
        align: "center",
        value: "CreatedAt",
        sortable: false,
      },
      {
        text: "员工",
        align: "center",
        value: "user.name",
        sortable: false,
      },

      {
        text: "原补助额度",
        align: "center",
        value: "oldMoney",
        sortable: false,
      },
      {
        text: "改变值",
        align: "center",
        value: "changeMoney",
        sortable: false,
      },
      {
        text: "新补助额度",
        align: "center",
        value: "newMoney",
        sortable: false,
      },
      {
        text: "操作人",
        align: "center",
        value: "employee.name",
        sortable: false,
      },
      {
        text: "备注",
        align: "center",
        value: "remarks",
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
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryHistoryEmployees(
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
  },
};
</script>