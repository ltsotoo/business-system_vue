<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.name"
              label="姓名"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.address"
              label="办公地址"
              required
            ></v-text-field
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.companyName"
              label="公司"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.companyName"
              label="课题组"
              required
            ></v-text-field
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.phone"
              label="联系电话"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.wxCode"
              label="微信号"
              required
            ></v-text-field
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.email"
              label="电子邮箱"
              required
            ></v-text-field
          ></v-col>
          <!-- <v-col cols="6">
            <v-select
              v-model="object.areaId"
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              label="所属区域"
              required
            ></v-select
          ></v-col> -->
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
export default {
  props: ['openId'],
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
  created(){
    this.object.id = this.openId
  }
};
</script>