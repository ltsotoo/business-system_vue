<template>
  <v-container>
    <productForms ref="productForms" />
    <v-row style="margin-top: 10px" justify="center">
      <v-btn x-large color="success" @click="submit"> 提交 </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import productForms from "@/components/product/ProductForms";

export default {
  components: {
    productForms,
  },
  methods: {
    submit() {
      this.$refs.productForms.entryObject();
    },
  },
};
</script>