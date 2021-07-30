<template>
  <v-container>
    <contractForms />
    <v-row style="margin-top: 10px" justify="center">
      <v-btn x-large color="success" @click="submit"> 提交 </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import contractForms from "@/components/contract/ContractForms";

export default {
  components: {
    contractForms,
  },
  data: () => ({}),

  methods: {
    submit() {},
  },

  computed: {},
};
</script>