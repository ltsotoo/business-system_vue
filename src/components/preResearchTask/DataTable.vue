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
      <template v-slot:[`item.actions`]="{ item }" v-if="!(openType == 1)">
        <v-btn text color="success" @click="openViewDialog(item)">
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openApproveDialog(item.UID)"
          v-if="item.status == 2"
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          审批
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="approveDialog"
      width="600px"
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
      width="600px"
      v-if="viewDialog"
      persistent
      @click:outside="closeViewDialog"
    >
      <viewForms :parentObj="openItem" />
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
  },
  data: () => ({
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
        value: "statusText",
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
        this.updateObject();
      });
    },
    updateObject() {
      this.object.forEach(function (e) {
        if (e.status == 1) {
          e.realEndDate = "";
        }
        switch (e.status) {
          case 1:
            e.statusText = "未完成";
            break;
          case 2:
            e.statusText = "未审核";
            break;
          case 3:
            e.statusText = "未通过";
            break;
          case 4:
            e.statusText = "已通过";
            break;
        }
      });
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
  },
};
</script>