<template>
  <v-card>
    <v-card-title>公司(办事处)信息编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.number"
              label="编号"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.name"
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
        <v-btn
          color="primary"
          rounded
          @click="submit"
          :disabled="submitDisabled"
        >
          提交
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryOffice, editOffice } from "@/api/oadrp";
export default {
  props: {
    openUID: {
      type: String,
      default: "",
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    object: {
      number: "",
      name: "",
    },
    rules: {
      must: [(v) => !!v || "必填项"],
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryOffice(this.openUID).then((res) => {
        this.object = res.data;
      });
    },
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        editOffice(this.object).then((res) => {
          this.$message.success("编辑成功了！");
          this.refresh();
          this.closeDialog();
        });
      } else {
        this.submitDisabled = false;
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>