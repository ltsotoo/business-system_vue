<template>
  <v-container>
    <topList />
    <myExpenseForms style="margin-top: 10px"/>
    <myContract style="margin-top: 10px" />
    <myTask style="margin-top: 10px" />
    <myPayment style="margin-top: 10px" />
    <myPreResearch style="margin-top: 10px" />
    <myPreResearchTask style="margin-top: 10px" />
  </v-container>
</template>

<script>
import topList from "./TopList.vue";
import myExpenseForms from "@/components/expense/MyExpenseForms";
import myContract from "./MyContract.vue";
import myPreResearch from "./MyPreResearch.vue";
import myTask from "./MyTask.vue";
import myPreResearchTask from "./MyPreResearchTask.vue";
import myPayment from "./MyPayment.vue";
export default {
  components: {
    topList,
    myExpenseForms,
    myContract,
    myPreResearch,
    myTask,
    myPreResearchTask,
    myPayment,
  },
  data: () => ({}),
  created() {},
};
</script>