<template>
  <v-container>
    <expensePanel v-if="nos.includes('07-01-01') || nos.includes('07-01-02')" />
    <bidBondPanel
      style="margin-top: 30px"
      v-if="nos.includes('07-02-01') || nos.includes('07-01-05')"
    />
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