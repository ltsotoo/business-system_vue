<template>
  <v-card>
    <v-card-title v-if="openType == 0">添加</v-card-title>
    <v-card-title v-if="openType == 2">编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row align="center">
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.text"
              label="名称"
              :rules="rules.must"
              counter
              maxlength="50"
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
import { createDictionary, editDictionary } from "@/api/dictionary";
export default {
  props: {
    openType: {
      type: String,
      default: 0,
    },
    openItem: {
      type: Object,
    },
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
      must: [(v) => !!v || "必填项"],
    },
  }),
  created() {
    this.object.dictionaryTypeUID = this.typeName;
    if (this.openType == 2) {
      this.object = this.openItem;
    }
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        if (this.openType == 0) {
          createDictionary(this.object).then((res) => {
            this.$message.success("录入成功了！");
            this.refresh();
            this.closeDialog();
          });
        } else if (this.openType == 2) {
          editDictionary(this.object).then((res) => {
            this.$message.success("编辑成功了！");
            if (this.refresh()) {
              this.refresh();
            }
            this.closeDialog();
          });
        }
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>