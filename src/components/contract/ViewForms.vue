<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-subtitle>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="object.no"
                  label="合同编号"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="object.area.name"
                  label="区域"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="object.employee.name"
                  label="办事处"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="object.employee.name"
                  label="业务员"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="object.customer.name"
                  label="客户公司"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="object.customer.name"
                  label="客户名称"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="object.contractUnit.text"
                  label="签订单位"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="object.contractDate"
                  label="签订日期"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="object.estimatedDeliveryDate"
                  label="合同交货日期"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="object.endDeliveryDate"
                  label="实际交货日期"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="object.invoiceType"
                  label="开票类型"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="object.invoiceType"
                  label="特殊合同"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="object.totalAmount"
                  label="总金额(元)"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="object.status"
                  label="当前状态"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="object.invoiceType != 1">
                <v-textarea
                  v-model="object.invoiceContent"
                  label="开票内容"
                  readonly
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="object.remarks"
                  label="备注"
                  readonly
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <taskDataTable
      style="margin-top: 1px"
      ref="taskDataTable"
      :openType="1"
      :openID="openID"
      :parentObject="object.tasks"
      v-if="object.tasks"
    />
  </div>
</template>

<script>
import taskDataTable from "../task/TaskDataTable";
import { queryContract } from "@/api/contract";
export default {
  components: {
    taskDataTable,
  },
  props: {
    openID: {
      type: Number,
    },
  },
  data: () => ({
    object: {
      contractUnit: {},
      area: {},
      employee: {},
      customer: {},
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryContract(this.openID).then((res) => {
        this.object = res.data;
      });
    },
  },
};
</script>