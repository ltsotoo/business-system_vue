<template>
  <v-card>
    <v-card-title>业务员端</v-card-title>
    <v-card-subtitle>
      <v-form ref="queryForm">
        <v-row align="center">
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-text-field
              label="业务员"
              v-model.trim="queryObject.employeeName"
              clearable
              maxlength="20"
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
      <div style="margin-top: 10px"></div>
      <preResearchDataTable
        :queryObject="queryObject"
        ref="preResearchDataTable"
        :refresh="refresh"
        :statusItems="statusItems"
        :taskStatusItems="taskStatusItems"
      />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import {
  queryPreResearchStatus,
  queryPreResearchTaskStatus,
} from "@/api/dictionary";
import preResearchDataTable from "@/components/preResearch/DataTable";
export default {
  components: {
    preResearchDataTable,
  },
  props: {
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    statusItems: [],
    taskStatusItems: [],
    queryObject: {
      employeeName: "",
      status: 0,
    },
  }),
  created() {
    this.getStatusItems();
    this.getTaskStatusItems();
  },
  methods: {
    getStatusItems() {
      queryPreResearchStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    getTaskStatusItems() {
      queryPreResearchTaskStatus().then((res) => {
        this.taskStatusItems = res.data;
      });
    },
    query() {
      this.$refs.preResearchDataTable.getObject();
    },
  },
};
</script>