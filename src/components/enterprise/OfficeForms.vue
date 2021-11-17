<template>
  <v-card>
    <v-card-title v-if="openType == 0">办事处添加</v-card-title>
    <v-card-title v-if="openType == 2">办事处编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              :rules="rules.name"
              counter
              maxlength="20"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.money"
              label="初始金额(元)"
              :rules="rules.money"
              v-if="openType == 0"
            >
            </v-text-field>
            <v-text-field
              v-model.number="object.money"
              label="总金额(元)"
              :rules="rules.money"
              v-if="openType == 2"
              disabled
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="submit"> 提交 </v-btn>
        <v-btn color="blue darken-1" text @click="closeDialog"> 取消 </v-btn>
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
      name: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length < 20) || "名称的长度必须小于20个字符",
      ],
      money: [(v) => /^[1-9][0-9]*(\.[0-9]{1,3})?$/.test(v) || "金额的格式错误"],
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