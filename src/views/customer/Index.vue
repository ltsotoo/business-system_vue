<template>
  <v-container>
    <v-expansion-panels multiple>
      <customerPanel />
      <companyPanel />
    </v-expansion-panels>
  </v-container>
</template>

<script>
import companyPanel from "./CompanyPanel";
import customerPanel from "./CustomerPanel";

export default {
  components: {
    customerPanel,
    companyPanel,
  },
};
</script>