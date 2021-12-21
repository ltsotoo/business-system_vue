<template>
  <v-card >
    <v-card-title>供应商查看</v-card-title>
    <v-card-subtitle>
      <v-form readonly>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="供应商名称"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model.trim="object.web" label="网址"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.address"
              label="地址"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.linkman"
              label="联系人姓名"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.phone"
              label="联系电话"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.wechatID"
              label="微信号"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.email"
              label="电子邮箱"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    parentObj: {
      type: Object,
    },
  },
  data: () => ({
    object: {
      name: "",
      address: "",
      linkman: "",
      phone: "",
      wechatID: "",
      email: "",
      web: "",
    },
  }),
  created() {
    this.object = this.parentObj;
  },
  methods: {},
};
</script>