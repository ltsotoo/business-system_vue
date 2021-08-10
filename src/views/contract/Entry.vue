<template>
  <v-container>
    <contractEntryForms ref="contractEntryForms" />
  </v-container>
</template>

<script>
import contractEntryForms from "@/components/contract/EntryForms";

export default {
  components: {
    contractEntryForms,
  },
  data: () => ({}),
};
</script>