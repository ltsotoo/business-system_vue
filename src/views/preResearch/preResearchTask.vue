<template>
  <v-card>
    <v-card-title>技术负责人端</v-card-title>
    <v-card-subtitle>
      <v-form ref="queryForm">
        <v-row align="center">
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-text-field
              label="技术负责人"
              v-model.trim="queryObject.employeeUID"
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
      <preResearchTaskDataTable
        :queryObject="queryObject"
        :statusItems="statusItems"
        :refresh="refresh"
        ref="preResearchTaskDataTable"
      />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryPreResearchTaskStatus } from "@/api/dictionary";
import preResearchTaskDataTable from "@/components/preResearchTask/DataTable";
export default {
  components: {
    preResearchTaskDataTable,
  },
  props: {
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    statusItems: [],
    queryObject: {
      employeeUID: "",
      status: 0,
    },
  }),
  created() {
    this.getStatusItems();
  },
  methods: {
    getStatusItems() {
      queryPreResearchTaskStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    query() {
      this.$refs.preResearchTaskDataTable.getObject();
    },
  },
};
</script>