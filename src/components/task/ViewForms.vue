<template>
  <div>
    <productViewForms :openUID="openObject.productUID" />
    <v-card v-if="openObject.remarks != ''">
      <v-card-title></v-card-title>
      <v-card-text>
        <v-textarea
          label="非标备注"
          v-model="openObject.remarks"
          readonly
          auto-grow
          rows="1"
        >
        </v-textarea>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import productViewForms from "../product/ViewForms";
export default {
  components: {
    productViewForms,
  },
  props: {
    openObject: {
      type: Object,
    },
  },
};
</script>