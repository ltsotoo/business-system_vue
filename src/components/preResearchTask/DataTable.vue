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
      <template v-slot:[`item.startDate`]="{ item }">
        {{ subTime(item.startDate) }}
      </template>
      <template v-slot:[`item.endDate`]="{ item }">
        {{ subTime(item.endDate) }}
      </template>
      <template v-slot:[`item.realEndDate`]="{ item }">
        <div v-if="item.status != 1">
          {{ subTime(item.realEndDate) }}
        </div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ statusToText(item.status) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }" v-if="openType != 2">
        <v-btn
          rounded
          color="primary"
          @click="openApproveDialog(item)"
          class="mx-2"
          v-if="item.status == 2"
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          审批
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="approveDialog"
      max-width="800px"
      v-if="approveDialog"
      persistent
      @click:outside="closeApproveDialog"
    >
      <v-card>
        <v-card-title>是否通过该预设计方案?</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded class="mx-2" @click="pass">
            <v-icon> mdi-check-bold </v-icon>
            通过
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded class="mx-2" @click="fail">
            <v-icon> mdi-close-thick </v-icon>
            驳回
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryPreResearchTasks, editPreResearchTask } from "@/api/preResearch";
export default {
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
        text: "设计要求",
        align: "center",
        value: "requirement",
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

    openItem: {},
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
      });
    },
    editObject() {
      editPreResearchTask(this.openItem).then((res) => {
        this.$message.success("审批成功");
        this.getObject();
        if (this.openItem.status == 4) {
          this.refresh();
        }
        this.closeApproveDialog();
      });
    },
    statusToText(status) {
      switch (status) {
        case 1:
          return "未完成";
        case 2:
          return "未审核";
        case 3:
          return "未通过";
        case 4:
          return "已通过";
      }
    },
    subTime(time) {
      return time.substr(0, time.indexOf("T"));
    },
    openApproveDialog(item) {
      this.openItem = item;
      this.approveDialog = true;
    },
    closeApproveDialog() {
      this.openItem = {};
      this.approveDialog = false;
    },
    pass() {
      this.openItem.status = 4;
      this.editObject();
    },
    fail() {
      this.openItem.status = 3;
      this.editObject();
    },
  },
};
</script>