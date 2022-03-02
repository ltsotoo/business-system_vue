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
  >
    <template v-slot:[`item.old`]="{ item }">
      <v-row>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col>业务费:{{ item.oldBusinessMoney }}</v-col>
      </v-row>
      <v-row>
        <v-col>可报销额度:{{ item.oldMoney }}</v-col>
      </v-row>
      <v-row>
        <v-col>冻结报销额度:{{ item.oldMoneyCold }}</v-col>
      </v-row>
      <v-row>
        <v-col>完成量:{{ item.oldTargetLoad }}</v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
      </v-row>
    </template>
    <template v-slot:[`item.change`]="{ item }">
      <v-row>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col>业务费:{{ item.changeBusinessMoney }}</v-col>
      </v-row>
      <v-row>
        <v-col>可报销额度:{{ item.changeMoney }}</v-col>
      </v-row>
      <v-row>
        <v-col>冻结报销额度:{{ item.changeMoneyCold }}</v-col>
      </v-row>
      <v-row>
        <v-col>完成量:{{ item.changeTargetLoad }}</v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
      </v-row>
    </template>
    <template v-slot:[`item.new`]="{ item }">
      <v-row>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col>业务费:{{ item.newBusinessMoney }}</v-col>
      </v-row>
      <v-row>
        <v-col>可报销额度:{{ item.newMoney }}</v-col>
      </v-row>
      <v-row>
        <v-col>冻结报销额度:{{ item.newMoneyCold }}</v-col>
      </v-row>
      <v-row>
        <v-col>完成量:{{ item.newTargetLoad }}</v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
      </v-row>
    </template>
  </v-data-table>
</template>

<script>
import { queryHistoryOffices } from "@/api/history";
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
        text: "办事处",
        align: "center",
        value: "office.name",
        sortable: false,
      },

      {
        text: "原值",
        align: "center",
        value: "old",
        sortable: false,
      },
      {
        text: "改变值",
        align: "center",
        value: "change",
        sortable: false,
      },
      {
        text: "新值",
        align: "center",
        value: "new",
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
      queryHistoryOffices(
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