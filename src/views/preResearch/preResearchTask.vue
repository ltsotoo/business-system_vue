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
              counter
              maxlength="50"
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
        :refresh="refresh"
        ref="preResearchTaskDataTable"
      />
    </v-card-subtitle>
  </v-card>
</template>

<script>
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
    statusItems: [
      { text: "未完成", value: 1 },
      { text: "未审核", value: 2 },
      { text: "未通过", value: 3 },
      { text: "已通过", value: 4 },
    ],
    queryObject: {
      employeeUID: "",
      status: 0,
    },
  }),
  created() {},
  methods: {
    query() {
      this.$refs.preResearchTaskDataTable.getObject();
    },
  },
};
</script>