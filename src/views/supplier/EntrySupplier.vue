<template>
  <v-container>
    <supplierForms />
    <v-row style="margin-top: 10px" justify="center">
      <v-btn x-large color="success" @click="submit"> 提交 </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import supplierForms from "@/components/supplier/SupplierForms";

export default {
  components: {
    supplierForms,
  },
  methods: {
    submit() {},
  },
};
</script>