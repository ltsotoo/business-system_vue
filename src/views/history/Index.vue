<template>
  <v-container>
    <historyOfficeDataTable
      v-if="nos.includes('09-01-01') || nos.includes('09-01-02')"
    ></historyOfficeDataTable>
    <historyEmployeeDataTable
      style="margin-top: 10px"
      v-if="nos.includes('09-02-01') || nos.includes('09-02-02')"
    ></historyEmployeeDataTable>
  </v-container>
</template>

<script>
import historyOfficeDataTable from "./Office";
import historyEmployeeDataTable from "./Employee";
export default {
  components: {
    historyOfficeDataTable,
    historyEmployeeDataTable,
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