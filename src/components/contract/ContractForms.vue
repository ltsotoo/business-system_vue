<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <contractBaseForms ref="contractBase" />
    <v-card style="margin-top: 10px">
      <v-card-subtitle>
        <productDataTable />
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import contractBaseForms from "./ContractBaseForms";
import productDataTable from "../product/ProductDataTable";

export default {
  components: {
    contractBaseForms,
    productDataTable,
  },
  data: () => ({}),
};
</script>