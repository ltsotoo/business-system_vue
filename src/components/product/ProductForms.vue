<template>
  <v-form ref="form" lazy-validation>
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="4"
            ><v-text-field
              v-model="object.email"
              label="类别1"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4"
            ><v-text-field
              v-model="object.email"
              label="类别2"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4"></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="object.name"
              label="产品名称"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.address"
              label="产品品牌"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.companyName"
              label="产品规格"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="object.companyName"
              label="生产厂商"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.phone"
              label="库存数量"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.wxCode"
              label="单位"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="object.email"
              label="采购价格(元)"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.email"
              label="销售价格(元)"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.email"
              label="供货周期"
              required
            ></v-text-field
          ></v-col>
        </v-row>

        <v-textarea label="备注" v-model="object.email" hint="tips"></v-textarea>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
export default {
  props: ["openId"],
  data: () => ({
    object: {
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
  created() {
    this.object.id = this.openId;
  },
};
</script>