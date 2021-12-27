<template>
  <v-container>
    <productManage v-if="nos.includes('05-01-01')"/>
    <settingProductType style="margin-top: 30px" v-if="nos.includes('05-02-01')"/>
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