<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-text-field v-model="data.name" label="姓名" required></v-text-field>

        <v-text-field
          v-model="data.address"
          label="办公地址"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.companyName"
          label="公司"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.companyName"
          label="课题组"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.phone"
          label="联系电话"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.wxCode"
          label="微信号"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.email"
          :rules="emailRules"
          label="电子邮箱"
          required
        ></v-text-field>

        <v-select
          v-model="data.areaId"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="所属区域"
          required
        ></v-select>
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