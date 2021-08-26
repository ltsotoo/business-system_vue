<template>
  <v-card>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row align="center">
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.text"
              label="名称"
              :rules="rules.text"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="add"> 添加 </v-btn>
        <v-btn color="blue darken-1" text @click="closeDialog"> 取消 </v-btn>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { createDictionary } from "@/api/dictionary";
export default {
  props: {
    parentObj: {
      type: Object,
    },
    parentFun: {
      type: Function,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    object: {
      parentUID: "",
      dictionaryTypeID: 0,
      text: "",
    },
    rules: {
      text: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 9) || "名称的长度必须小于10个字符",
      ],
    },
  }),
  created() {
    this.object = this.parentObj;
  },
  methods: {
    add() {
      if (this.validateForm()) {
        createDictionary(this.object).then((res) => {
          this.$message.success("录入成功了！");
          this.closeDialog();
        });
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>