<template>
  <v-card>
    <v-card-title>我的工作任务</v-card-title>
    <v-card-subtitle>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-text-field
              label="合同编号"
              v-model.trim="queryObject.contractNo"
              clearable
              maxlength="30"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="queryObject.status"
              :items="statusItems"
              item-text="text"
              item-value="value"
              label="状态"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <tasks
        style="margin-top: 10px"
        :queryObject="queryObject"
        :statusItems="statusItems"
        ref="tasks"
      />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryTaskStatus } from "@/api/dictionary";
import tasks from "@/components/my/Tasks";
export default {
  components: {
    tasks,
  },
  data: () => ({
    statusItems: [],
    queryObject: {
      contractNo: "",
      status: null,
    },
  }),
  created() {
    this.getStatusItems();
  },
  methods: {
    query() {
      this.$refs.tasks.getObject();
    },
    getStatusItems() {
      queryTaskStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
  },
};
</script>