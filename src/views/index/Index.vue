<template>
  <v-container>
    <v-expansion-panels multiple>
      <myContract v-if="nos.indexOf('13') != -1"/>
      <myPreResearch v-if="nos.indexOf('17') != -1"/>
      <myTask />
      <myPreResearchTask />
      <myPayment v-if="nos.indexOf('15') != -1"/>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import myContract from "./MyContract.vue";
import myPreResearch from "./MyPreResearch.vue";
import myTask from "./MyTask.vue";
import myPreResearchTask from "./MyPreResearchTask.vue";
import myPayment from "./MyPayment.vue";
export default {
  components: {
    myContract,
    myPreResearch,
    myTask,
    myPreResearchTask,
    myPayment,
  },
  data: () => ({
    nos: [],
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
};
</script>