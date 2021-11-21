<template>
  <div>
    <v-card>
      <v-card-title>审批</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row>
            <v-col cols="4">
              <v-text-field v-model="object.startDate" label="开始时间"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="object.days"
                label="分配工作天数"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="object.endDate"
                label="要求完成时间"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="object.employee.name"
                label="技术负责人"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="object.status"
                :items="statusItems"
                item-text="text"
                item-value="value"
                label="状态"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="object.realEndDate"
                label="实际完成时间"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="object.requirement"
                label="设计要求"
                rows="1"
                auto-grow
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="object.remarks"
                label="技术负责人回复"
                rows="1"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <v-card style="margin-top: 1px">
      <v-card-title></v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model.number="days" label="新工作天数（驳回填写）"></v-text-field>
          </v-col>
          <v-col cols="6"></v-col>
          <v-col cols="12">
            <v-textarea
              v-model="requirement"
              label="新设计要求（驳回填写）"
              rows="3"
              counter
              maxlength="500"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded class="mx-2" @click="pass">
          <v-icon left> mdi-check-bold </v-icon>
          通过
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" rounded class="mx-2" @click="fail">
          <v-icon left> mdi-close-thick </v-icon>
          驳回
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { queryPreResearchTask, editPreResearchTask } from "@/api/preResearch";
export default {
  props: {
    openUID: {
      type: String,
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
    refreshPre: {
      type: Function,
    },
  },
  data: () => ({
    statusItems: [
      { text: "未完成", value: 1 },
      { text: "未审核", value: 2 },
      { text: "未通过", value: 3 },
      { text: "已通过", value: 4 },
    ],
    object: {
      startDate: "",
      days: null,
      endDate: "",
      realEndDate: "",
      employee: { name: "" },
      statusText: "",
      requirement: "",
      remarks: "",
    },
    requirement: "",
    days: "",
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      var _this = this;
      queryPreResearchTask(this.openUID).then((res) => {
        this.object = res.data;
        if (e.status != 1) {
          _this.realEndDate = res.data.realEndDate.substr(
            0,
            res.data.startDate.indexOf("T")
          );
        }
      });
    },
    editObject() {
      editPreResearchTask(this.object).then((res) => {
        this.$message.success("审批成功");
        this.refresh();
        if (this.object.status == 4) {
          this.refreshPre();
        }
        this.closeDialog();
      });
    },
    pass() {
      this.object.status = 4;
      this.editObject();
    },
    fail() {
      this.object.status = 3;
      this.object.requirement = this.requirement;
      this.object.days = this.days;
      this.editObject();
    },
  },
};
</script>