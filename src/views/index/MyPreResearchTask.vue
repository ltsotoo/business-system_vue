<template>
  <v-card>
    <v-card-title>我的预设计任务</v-card-title>
    <v-card-subtitle>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="4">
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
      <preResearchTasks
        style="margin-top: 10px"
        :queryObject="queryObject"
        :statusItems="statusItems"
        ref="preResearchTasks"
      />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryPreResearchTaskStatus } from "@/api/dictionary";
import preResearchTasks from "@/components/my/PreResearchTasks";
export default {
  components: {
    preResearchTasks,
  },
  data: () => ({
    statusItems: [],
    queryObject: {
      employeeUID: "",
      status: 0,
    },
  }),
  created() {
    this.queryObject.employeeUID = localStorage.getItem("uid");
    this.getStatusItems();
  },
  methods: {
    getStatusItems() {
      queryPreResearchTaskStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    query() {
      this.$refs.preResearchTasks.getObject();
    },
  },
};
</script>