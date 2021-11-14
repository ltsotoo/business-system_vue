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
        <v-btn
          rounded
          color="primary"
          @click="openApproveDialog(item)"
          class="mx-2"
          v-if="item.status == 1"
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          审批
        </v-btn>
        <v-btn
          rounded
          color="primary"
          @click="openEditDialog(item.UID)"
          class="mx-2"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="approveDialog" max-width="800px" v-if="approveDialog">
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
export default {
  components: {
    approvalForms,
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
    approveDialog: false,
  }),
  created() {
    this.getObject();
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