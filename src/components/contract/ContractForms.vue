<template>
  <div>
    <contractBaseForms :openId="openId" ref="contractBase" />
    <productDataTable style="margin-top: 1px"/>
  </div>
</template>

<script>
import contractBaseForms from "./ContractBaseForms";
import productDataTable from "../product/ProductDataTable";

export default {
  components: {
    contractBaseForms,
    productDataTable,
  },
  props: ['openId'],
  data: () => ({}),
};
</script>