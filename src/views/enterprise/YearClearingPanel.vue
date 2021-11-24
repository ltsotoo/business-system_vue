<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      年底结算
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <yearClearing />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import yearClearing from "@/components/enterprise/YearClearing";
export default {
  components: {
    yearClearing,
  },
};
</script>