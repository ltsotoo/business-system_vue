<template>
  <v-container>
    <productManage />
    <v-expansion-panels multiple style="margin-top: 30px">
      <settingProductType />
    </v-expansion-panels>
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