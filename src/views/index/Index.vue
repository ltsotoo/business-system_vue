<template>
  <v-container>
    <topList v-if="nos.includes('00-01-01') || nos.includes('00-01-02')" />
    <myExpenseForms style="margin-top: 10px" />
    <myContract style="margin-top: 10px" v-if="nos.includes('00-02-01')" />
    <myTask
      style="margin-top: 10px"
      v-if="
        nos.includes('00-03-01') ||
        nos.includes('00-03-02') ||
        nos.includes('00-03-03') ||
        nos.includes('00-03-04')
      "
    />
    <myPayment
      style="margin-top: 10px"
      v-if="
        nos.includes('00-04-01') ||
        nos.includes('00-04-02') ||
        nos.includes('00-04-03')
      "
    />
    <myPreResearch style="margin-top: 10px" v-if="nos.includes('00-05-01')" />
    <myPreResearchTask
      style="margin-top: 10px"
      v-if="nos.includes('00-05-02')"
    />
    <myBidBond style="margin-top: 10px" v-if="nos.includes('00-02-01')" />
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
import myBidBond from "./MyBidBond.vue";
export default {
  components: {
    topList,
    myExpenseForms,
    myContract,
    myPreResearch,
    myTask,
    myPreResearchTask,
    myPayment,
    myBidBond,
  },
  data: () => ({
    nos: [],
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
  },
};
</script>