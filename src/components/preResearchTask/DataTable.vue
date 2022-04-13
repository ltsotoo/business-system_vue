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
      <template v-slot:[`item.status`]="{ item }">
        {{ statusToText(item.status) }}
      </template>
      <template v-slot:[`item.startDate`]="{ item }">
        {{ item.startDate.substr(0, item.startDate.lastIndexOf(" ")) }}
      </template>
      <template v-slot:[`item.endDate`]="{ item }">
        <v-chip :color="endDateColor(item)">
          {{ item.endDate.substr(0, item.endDate.lastIndexOf(" ")) }}
        </v-chip>
      </template>
      <template v-slot:[`item.realEndDate`]="{ item }">
        {{ item.realEndDate.substr(0, item.realEndDate.lastIndexOf(" ")) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }" v-if="!(openType == 1)">
        <v-btn text color="success" @click="openViewDialog(item)">
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openApproveDialog(item.UID)"
          v-if="item.status == 2 && nos.includes('03-02-02')"
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          审批
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="approveDialog"
      width="800px"
      v-if="approveDialog"
      persistent
      @click:outside="closeApproveDialog"
    >
      <approvalForms
        :openUID="openUID"
        :closeDialog="closeApproveDialog"
        :refresh="getObject"
        :refreshPre="refresh"
      />
    </v-dialog>

    <v-dialog
      v-model="viewDialog"
      width="800px"
      v-if="viewDialog"
      persistent
      @click:outside="closeViewDialog"
    >
      <viewForms :parentObj="openItem" :statusItems="statusItems" />
    </v-dialog>
  </div>
</template>

<script>
import { queryPreResearchTasks } from "@/api/preResearch";
import viewForms from "./ViewForms";
import approvalForms from "./ApprovalForms";
export default {
  components: {
    viewForms,
    approvalForms,
  },
  props: {
    openType: {
      //0:录入 1:查看 2:编辑
      type: Number,
      default: 0,
    },
    queryObject: {
      type: Object,
    },
    refresh: {
      type: Function,
    },
    statusItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    nos: [],

    headers: [
      {
        text: "开始时间",
        align: "center",
        value: "startDate",
        sortable: false,
      },
      {
        text: "要求完成时间",
        align: "center",
        value: "endDate",
        sortable: false,
      },
      {
        text: "实际完成时间",
        align: "center",
        value: "realEndDate",
        sortable: false,
      },
      {
        text: "技术负责人",
        align: "center",
        value: "employee.name",
        sortable: false,
      },
      {
        text: "审批人",
        align: "center",
        value: "auditor.name",
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
    openItem: {},
    viewDialog: false,
    approveDialog: false,
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
      queryPreResearchTasks(
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
    openViewDialog(item) {
      this.openItem = item;
      this.viewDialog = true;
    },
    closeViewDialog() {
      this.openItem = {};
      this.viewDialog = false;
    },
    openApproveDialog(uid) {
      this.openUID = uid;
      this.approveDialog = true;
    },
    closeApproveDialog() {
      this.openUID = "";
      this.approveDialog = false;
    },
    endDateColor(item) {
      var endDate = Date.parse(item.endDate);
      var realEndDate;
      if (item.realEndDate != "") {
        realEndDate = Date.parse(item.realEndDate);
      } else {
        realEndDate = new Date().getTime();
      }
      if (realEndDate > endDate) {
        return "red";
      }
      if (realEndDate + 2 * 24 * 60 * 60 * 1000 > endDate) {
        return "orange";
      }
      return "green";
    },
  },
};
</script>