<template>
  <v-form ref="form" lazy-validation>
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.name"
              label="供应商名称"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.address"
              label="地址"
              required
            ></v-text-field
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.linkmanName"
              label="联系人姓名"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.phone"
              label="联系电话"
              required
            ></v-text-field
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.wxCode"
              label="微信号"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.email"
              label="电子邮箱"
              required
            ></v-text-field
          ></v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    object: {
      id: "",
      name: "",
      address: "",
      linkmanName: "",
      phone: "",
      wxCode: "",
      email: "",
    },
  }),
};
</script>