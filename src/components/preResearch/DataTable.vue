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
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="success" @click="openViewDialog(item.UID)">
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openApproveDialog(item)"
          v-if="item.status == 1 && nos.indexOf('18') != -1"
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          审批
        </v-btn>
        <!-- <v-btn
          rounded
          color="primary"
          @click="openEditDialog(item.UID)"
          class="mx-2"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn> -->
      </template>
    </v-data-table>

    <v-dialog
      v-model="viewDialog"
      width="1080px"
      v-if="viewDialog"
      persistent
      @click:outside="closeViewDialog"
    >
      <viewForms :uid="openUID" />
    </v-dialog>

    <v-dialog
      v-model="approveDialog"
      width="800px"
      v-if="approveDialog"
      persistent
      @click:outside="closeApproveDialog"
    >
      <approvalForms
        :preResearch="openItem"
        :closeDialog="closeApproveDialog"
        :refresh="getObject"
        :refreshTask="refresh"
      />
    </v-dialog>
  </div>
</template>

<script>
import { queryPreResearchs } from "@/api/preResearch";
import approvalForms from "./ApprovalForms";
import viewForms from "./ViewForms";
export default {
  components: {
    approvalForms,
    viewForms,
  },
  props: {
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
        text: "发起时间",
        align: "center",
        value: "CreatedAt",
        sortable: false,
      },
      {
        text: "办事处",
        align: "center",
        value: "employee.office.name",
        sortable: false,
      },
      {
        text: "业务员",
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

    openItem: null,
    viewDialog: false,
    approveDialog: false,

    nos: [],
  }),
  created() {
    this.getObject();

    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryPreResearchs(
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
          return "驳回";
        case 1:
          return "未审批";
        case 2:
          return "未完成";
        case 3:
          return "已完成";
      }
    },

    openViewDialog(uid) {
      this.openUID = uid;
      this.viewDialog = true;
    },
    closeViewDialog() {
      this.openUID = "";
      this.viewDialog = false;
    },
    openApproveDialog(item) {
      this.openItem = item;
      this.approveDialog = true;
    },
    closeApproveDialog() {
      this.openItem = null;
      this.approveDialog = false;
    },
  },
};
</script>