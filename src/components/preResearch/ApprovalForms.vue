<template>
  <div>
    <v-card>
      <v-card-title>审批</v-card-title>
    </v-card>
    <v-card style="margin-top: 1px">
      <v-card-title>基础信息</v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="preResearch.CreatedAt"
              label="发起时间"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="preResearch.employee.office.name"
              label="办事处"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="preResearch.employee.name"
              label="业务员"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="设计需求"
              v-model="preResearch.remarks"
              auto-grow
              readonly
              rows="1"
            >
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-card style="margin-top: 1px">
      <v-card-title>分配</v-card-title>
      <v-card-subtitle>
        <v-form ref="form">
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="officeUID"
                :items="officeItems"
                item-text="name"
                item-value="UID"
                label="办事处"
                @change="getEmployeeItems"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="object.employeeUID"
                :items="employeeItems"
                item-text="name"
                item-value="UID"
                label="技术"
                :rules="rules.must"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model.number="object.days"
                label="工作天数"
                :rules="rules.day"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="设计要求"
                v-model="object.requirement"
                rows="3"
                counter
                maxlength="500"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <v-card style="margin-top: 1px">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          rounded
          class="mx-2"
          @click="pass"
          :disabled="submitDisabled"
        >
          <v-icon left> mdi-check-bold </v-icon>
          通过
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          rounded
          class="mx-2"
          @click="fail"
          :disabled="submitDisabled"
        >
          <v-icon left> mdi-close-thick </v-icon>
          驳回
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { queryOffices } from "@/api/oadrp";
import { querySPEmployees } from "@/api/employee";
import { approve } from "@/api/preResearch";
export default {
  props: {
    preResearch: {
      type: Object,
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
    refreshTask: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    object: {
      UID: "",
      employeeUID: "",
      status: 0,
      days: 1,
      requirement: "",
    },
    rules: {
      must: [(v) => !!v || "必填项"],
      day: [(v) => /^((0)|([1-9]\d*))$/.test(v) || "大于等于零的整数"],
    },

    officeItems: [],
    employeeItems: [],

    officeUID: "",
  }),
  created() {
    this.object = this.preResearch;
    this.getOfficeItems();
  },
  methods: {
    editObject() {
      approve(this.object).then((res) => {
        this.$message.success("审批完成");
        this.refresh();
        if (this.object.status == 2) {
          this.refreshTask();
        }
        this.closeDialog();
      });
    },
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getEmployeeItems() {
      this.employeeItems = [];
      this.object.employeeUID = "";
      querySPEmployees({
        officeUID: this.officeUID,
        permissionUID: "630ebd957a89435baeb5cb1a06228e9c",
      }).then((res) => {
        this.employeeItems = res.data;
      });
    },
    pass() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        this.object.status = 2;
        this.editObject();
      } else {
        this.submitDisabled = false;
      }
    },
    fail() {
      this.submitDisabled = true;
      this.object.status = -1;
      this.editObject();
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>