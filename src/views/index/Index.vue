<template>
  <v-container>
    <v-expansion-panels multiple>
      <myContract/>
      <myTask/>
      <myPayment/>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import myContract from "./MyContract.vue";
import myTask from "./MyTask.vue";
import myPayment from "./MyPayment.vue";
export default {
  components: {
    myContract,
    myTask,
    myPayment,
  },
};
</script>