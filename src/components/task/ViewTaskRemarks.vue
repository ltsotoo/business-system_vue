<template>
  <v-card>
    <v-card-title>备注信息</v-card-title>
    <v-card-subtitle>
      <v-row v-if="remarks != ''">
        <v-col cols="12">
          <v-textarea
            label="业务员备注"
            readonly
            auto-grow
            rows="1"
            v-model="remarks"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row v-for="(taskRemark, i) in taskRemarks" :key="i" align="center">
        <v-col cols="12">
          <v-textarea
            :label="statusToLabel(taskRemark.status)"
            readonly
            auto-grow
            rows="1"
            v-model="taskRemark.text"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryTaskRemarksStatus } from "@/api/dictionary";
export default {
  props: {
    taskRemarks: {
      type: Array,
      default: () => [],
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    statusItems: [],
  }),
  created() {
    this.getStatusItems();
  },
  methods: {
    getStatusItems() {
      queryTaskRemarksStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    statusToLabel(status) {
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