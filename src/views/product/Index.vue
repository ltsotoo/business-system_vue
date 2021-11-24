<template>
  <v-container>
    <productManage />
    <v-expansion-panels multiple style="margin-top: 30px">
      <settingProductType v-if="nos.indexOf('11') != -1" />
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
  data: () => ({
    nos: [],
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
};
</script>