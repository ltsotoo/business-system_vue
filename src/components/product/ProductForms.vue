<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-text-field
          v-model="data.name"
          label="产品名称"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.address"
          label="产品品牌"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.companyName"
          label="产品规格"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.companyName"
          label="生产厂商"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.phone"
          label="库存数量"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.wxCode"
          label="单位"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.email"
          label="采购/生产价格(元)"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.email"
          label="标准价格(元)"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.email"
          label="标准价格(元)"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.email"
          label="供货周期"
          required
        ></v-text-field>

        <v-text-field v-model="data.email" label="类别" required></v-text-field>

        <v-text-field v-model="data.email" label="备注" required></v-text-field>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    data: {
      id: "",
      name: "",
      address: "",
      companyName: "",
      researchGroup: "",
      phone: "",
      wxCode: "",
      email: "",
      areaId: "",
    },
  }),
};
</script>