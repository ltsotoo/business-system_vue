<template>
  <v-card>
    <v-card-title v-if="openType == 0">公司添加</v-card-title>
    <v-card-title v-if="openType == 2">公司信息编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
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
          <v-col cols="12">
            <v-text-field
              v-model.number="object.money"
              label="初始金额(元)"
              :rules="rules.money"
              v-if="openType == 0"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.money"
              label="总金额(元)"
              :rules="rules.money"
              v-if="openType == 2"
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
import { entryOffice, editOffice } from "@/api/oadrp";
export default {
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
    parentObj: {
      type: Object,
    },
  },
  data: () => ({
    object: {
      name: "",
      money: 0,
    },
    rules: {
      must: [(v) => !!v || "必填项"],
      money: [(v) => /^[0-9]*(\.[0-9]{1,3})?$/.test(v) || "大于等于零"],
    },
  }),
  created() {
    if (this.openType == 2) {
      this.object = this.parentObj;
    }
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        if (this.openType == 0) {
          entryOffice(this.object).then((res) => {
            this.$message.success("录入成功了！");
            this.refresh();
            this.closeDialog();
          });
        } else if (this.openType == 2) {
          editOffice(this.object).then((res) => {
            this.$message.success("编辑成功了！");
            this.refresh();
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