<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.name"
              label="供应商名称"
              :disabled="openType == 2"
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field v-model="object.address" label="地址"></v-text-field
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.linkman"
              label="联系人姓名"
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field v-model="object.phone" label="联系电话"></v-text-field
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.wechatID"
              label="微信号"
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field v-model="object.email" label="电子邮箱"></v-text-field
          ></v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import { querySupplier, entrySupplier, editSupplier } from "@/api/supplier";
export default {
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    openID: {
      type: Number,
    },
    parentFun: {
      type: Function,
      default: null,
    },
  },
  data: () => ({
    object: {
      id: "",
      name: "",
      address: "",
      linkman: "",
      phone: "",
      wechatID: "",
      email: "",
    },
  }),
  created() {
    if (this.openID != null) {
      this.getObject();
    }
  },
  methods: {
    getObject() {
      querySupplier(this.openID).then((res) => {
        this.object = res.data;
      });
    },
    entryObject() {
      entrySupplier(this.object).then((res) => {
        this.$message.success("录入成功了！");
        if (this.parentFun) {
          this.parentFun(false);
        }
      });
    },
    editObject() {
      editSupplier(this.object).then((res) => {
        this.$message.success("编辑成功了！");
        if (this.parentFun) {
          this.parentFun();
        }
      });
    },
  },
  computed: {},
};
</script>