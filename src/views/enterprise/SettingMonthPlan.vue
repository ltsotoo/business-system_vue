<template>
  <div>
    <v-card>
      <v-card-title>每月任务百分比管理</v-card-title>
      <v-card-subtitle>
        <monthPlanDataTable ref="monthPlanDataTable" />
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import monthPlanDataTable from "@/components/monthPlan/DataTable";
export default {
  components: {
    monthPlanDataTable,
  },
  data: () => ({}),
  created() {},
  methods: {
    queryRoles() {
      this.$refs.monthPlanDataTable.getObject();
    },
  },
};
</script>