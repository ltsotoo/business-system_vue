<template>
  <v-container>
    <productManage />
    <settingProductType style="margin-top: 30px" />
  </v-container>
</template>

<script>
import productManage from "./ProductManage.vue";
import settingProductType from "./SettingProductType.vue";
export default {
  components: {
    productManage,

    settingProductType,
  },
  data: () => ({}),
  created() {},
};
</script>