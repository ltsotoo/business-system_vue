<template>
  <v-card>
    <v-card-title>备注信息</v-card-title>
    <v-card-subtitle>
      <v-row v-if="remarks && remarks != ''">
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
        <v-col cols="3">
          <v-text-field
            label="时间"
            readonly
            v-model.number="taskRemark.CreatedAt"
          ></v-text-field>
        </v-col>
        <v-col cols="9">
          <v-textarea
            :label="fromToText(taskRemark.from)"
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
export default {
  props: {
    remarks: "",
    taskRemarks: {},
  },
  methods: {
    fromToText(from) {
      switch (from) {
        case 1:
          return "技术负责人备注";
        case 2:
          return "采购负责人备注";
        case 3:
          return "仓库负责人备注";
        case 4:
          return "装配负责人备注";
        case 5:
          return "发货负责人备注";
      }
    },
  },
};
</script>