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
      <template v-slot:[`item.requirement`]="{ item }">
        <v-textarea v-model="item.requirement" rows="1" auto-grow readonly>
        </v-textarea>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ statusToText(item.status) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          text
          color="primary"
          v-if="item.status == 1"
          @click="openSubmitDialog(item)"
        >
          <v-icon left> mdi-chevron-right-circle-outline </v-icon>
          提交
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="submitDialog"
      width="800px"
      v-if="submitDialog"
      persistent
      @click:outside="closeSubmitDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定提交吗?</v-card-title>
        <v-card-subtitle>
          <v-textarea
            label="备注"
            v-model="remarks"
            rows="6"
            auto-grow
            counter
            maxlength="500"
          >
          </v-textarea>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            rounded
            @click="submit"
            :disabled="submitDisabled"
            >提交</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeSubmitDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryPreResearchTasks, approveTask } from "@/api/preResearch";
export default {
  props: {
    queryObject: {
      type: Object,
    },
    statusItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    submitDisabled: false,
    headers: [
      {
        text: "要求完成时间",
        align: "center",
        value: "endDate",
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
        text: "实际完成时间",
        align: "center",
        value: "realEndDate",
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
    remarks: "",
    openItem: {},
    submitDialog: false,
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
    submit() {
      this.submitDisabled = true;
      this.openItem.remarks = this.remarks;
      this.openItem.status = 2;
      approveTask(this.openItem).then((res) => {
        this.$message.success("提交成功！");
        this.getObject();
        this.closeSubmitDialog();
      });
    },
    openSubmitDialog(item) {
      this.openItem = item;
      this.submitDialog = true;
    },
    closeSubmitDialog() {
      this.openItem = {};
      this.remarks = "";
      this.submitDialog = false;
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
  },
};
</script>