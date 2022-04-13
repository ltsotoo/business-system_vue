<template>
  <div>
    <v-card>
      <v-card-title></v-card-title>
      <v-card-subtitle>
        <v-form disabled>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="contract.customer.company.name"
                label="客户公司"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="contract.customer.name"
                label="客户名称"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="contract.customer.phone"
                label="联系电话"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="contract.remarks"
                label="业务员备注（发货地址等）"
                rows="1"
                auto-grow
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="task.product.specification"
                label="产品规格"
                rows="1"
                auto-grow
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="task.product.remarks"
                label="产品备注（产品库）"
                rows="1"
                auto-grow
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="task.remarks"
                label="产品备注（销售）"
                rows="1"
                auto-grow
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <viewTaskRemarks :taskRemarks="taskRemarks" style="margin-top: 3px" />
    <taskViewContractDataTable
      :contractUID="task.contractUID"
      :statusItems="statusItems"
      style="margin-top: 3px"
    ></taskViewContractDataTable>
  </div>
</template>

<script>
import { querySimpleContract } from "@/api/contract";
import { queryTaskRemarks } from "@/api/task";
import taskViewContractDataTable from "@/components/task/ViewContractDataTable";
import viewTaskRemarks from "@/components/task/ViewTaskRemarks";
export default {
  props: {
    task: {
      type: Object,
      default: null,
    },
    statusItems: {
      type: Array,
      default: () => {},
    },
  },
  components: {
    taskViewContractDataTable,
    viewTaskRemarks,
  },
  created() {
    if (this.task) {
      this.getContract();
      this.getTaskRemarks();
    }
  },
  data: () => ({
    contract: {},
    taskRemarks: [],
  }),
  methods: {
    getTaskRemarks() {
      queryTaskRemarks(this.task.UID).then((res) => {
        this.taskRemarks = res.data;
      });
    },
    getContract() {
      querySimpleContract(this.task.contractUID).then((res) => {
        this.contract = res.data;
      });
    },
  },
};
</script>