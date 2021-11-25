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
      <template v-slot:[`item.remarks`]="{ item }">
        <v-textarea v-model="item.remarks" rows="1" auto-grow readonly>
        </v-textarea>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ statusToText(item.status) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          text
          color="error"
          @click="openDeleteDialog(item.UID)"
          v-if="item.status == -1 || item.status == 1"
          dark
          disabled
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="deleteDialog"
      v-if="deleteDialog"
      width="800px"
      persistent
      @click:outside="closeDeleteDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定删除该预设计吗?</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="delObject">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeDeleteDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryPreResearchs, delPreResearch } from "@/api/preResearch";
export default {
  props: {
    queryObject: {
      type: Object,
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
        text: "设计需求",
        align: "center",
        value: "remarks",
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
    deleteDialog: false,
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
    delObject() {
      delPreResearch(this.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },
    openDeleteDialog(uid) {
      this.openUID = uid;
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.openUID = "";
      this.deleteDialog = false;
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
  },
};
</script>