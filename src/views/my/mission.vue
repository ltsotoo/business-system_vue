<template>
  <!-- 我的任务 -->
  <v-container>
    <tasksDataTable style="margin-top: 10px" />
    <contractsDataTable style="margin-top: 10px" />
    <expenseDataTable style="margin-top: 10px" />
  </v-container>
</template>

<script>
import tasksDataTable from "@/components/index/TasksDataTable";
import contractsDataTable from "@/components/index/ContractsDataTable";
import expenseDataTable from "@/components/expense/DataTable";
export default {
  components: {
    tasksDataTable,
    contractsDataTable,
    expenseDataTable,
  },
  data: () => ({}),
};
</script>