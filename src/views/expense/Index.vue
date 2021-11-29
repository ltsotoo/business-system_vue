<template>
  <v-container>
    <expensePanel />
    <bidBondPanel style="margin-top: 30px" />
  </v-container>
</template>

<script>
import expensePanel from "./ExpensePanel";
import bidBondPanel from "./BidBondPanel";
export default {
  components: {
    expensePanel,
    bidBondPanel,
  },
};
</script>