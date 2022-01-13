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
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="success" @click="openViewDialog(item)">
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn text color="primary" @click="openEditDialog(item)" v-if="nos.includes('05-03-03')">
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="viewDialog"
      v-if="viewDialog"
      width="1400px"
      @click:outside="closeViewDialog"
    >
      <procurementPlanForms
        :openType="1"
        :openItem="openItem"
        :closeDialog="closeViewDialog"
      />
    </v-dialog>

    <v-dialog
      v-model="editDialog"
      v-if="editDialog"
      width="1400px"
      @click:outside="closeEditDialog"
    >
      <procurementPlanForms
        :openType="2"
        :openItem="openItem"
        :refresh="getObject"
        :closeDialog="closeEditDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import procurementPlanForms from "./Forms.vue";
import { queryProcurementPlans } from "@/api/procurementPlan";

export default {
  components: {
    procurementPlanForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    nos: [],

    headers: [
      {
        text: "合同编号",
        align: "center",
        value: "no",
        sortable: false,
      },
      {
        text: "申请人",
        align: "center",
        value: "employee.name",
        sortable: false,
      },
      {
        text: "申请时间",
        align: "center",
        value: "startDate",
        sortable: false,
      },
      {
        text: "类别",
        align: "center",
        value: "type",
        sortable: false,
      },
      {
        text: "物品",
        align: "center",
        value: "product",
        sortable: false,
      },
      {
        text: "型号规格",
        align: "center",
        value: "specification",
        sortable: false,
      },
      {
        text: "采购数量",
        align: "center",
        value: "buyNumber",
        sortable: false,
      },
      {
        text: "单位",
        align: "center",
        value: "unit",
        sortable: false,
      },
      {
        text: "要求描述/链接",
        align: "center",
        value: "description",
        sortable: false,
      },
      {
        text: "技术备注",
        align: "center",
        value: "remarks",
        sortable: false,
      },
      {
        text: "采购/下单日期",
        align: "center",
        value: "buyDate",
        sortable: false,
      },
      {
        text: "到货日期",
        align: "center",
        value: "arriveDate",
        sortable: false,
      },
      {
        text: "采购备注",
        align: "center",
        value: "buyRemarks",
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
    openItem: {},
    editDialog: false,
    viewDialog: false,
    object: [],
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
    this.getObject();
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryProcurementPlans(
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
    openEditDialog(item) {
      this.openItem = item;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openItem = {};
      this.editDialog = false;
    },

    openViewDialog(item) {
      this.openItem = item;
      this.viewDialog = true;
    },
    closeViewDialog() {
      this.openItem = {};
      this.viewDialog = false;
    },
  },
};
</script>