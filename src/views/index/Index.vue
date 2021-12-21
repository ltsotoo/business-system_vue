<template>
  <v-container>
    <index />
    <myContract />
    <myTask style="margin-top: 10px" />
    <myPayment style="margin-top: 10px" />
    <myPreResearch style="margin-top: 10px" />
    <myPreResearchTask style="margin-top: 10px" />
  </v-container>
</template>

<script>
import index from "../base/Index2.vue";
import myContract from "./MyContract.vue";
import myPreResearch from "./MyPreResearch.vue";
import myTask from "./MyTask.vue";
import myPreResearchTask from "./MyPreResearchTask.vue";
import myPayment from "./MyPayment.vue";
export default {
  components: {
    index,
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