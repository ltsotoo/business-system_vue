<template>
  <v-card>
    <v-card-title>添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row align="center">
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.text"
              label="名称"
              :rules="rules.text"
              counter
              maxlength="20"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { createDictionary } from "@/api/dictionary";
export default {
  props: {
    typeName: {
      type: String,
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    object: {
      dictionaryTypeUID: "",
      text: "",
    },
    rules: {
      text: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 20) || "名称的长度必须小于20个字符",
      ],
    },
  }),
  created() {
    this.object.dictionaryTypeUID = this.typeName;
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        createDictionary(this.object).then((res) => {
          this.$message.success("录入成功了！");
          this.refresh();
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