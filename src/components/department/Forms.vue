<template>
  <v-card>
    <v-card-title>部门添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row align="center">
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              :rules="rules.name"
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
import { entryDepartment } from "@/api/oadrp";
export default {
  props: {
    officeID: {
      type: Number,
    },
    closeDialog: {
      type: Function,
    },
    parentFun: {
      type: Function,
    },
  },
  data: () => ({
    object: {
      officeID: null,
      name: "",
    },
    rules: {
      name: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length < 20) || "名称的长度必须小于20个字符",
      ],
    },
  }),
  created() {
    this.object.officeID = this.officeID;
  },
  methods: {
    add() {
      if (this.validateForm()) {
        entryDepartment(this.object).then((res) => {
          this.$message.success("录入成功了！");
          this.parentFun();
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