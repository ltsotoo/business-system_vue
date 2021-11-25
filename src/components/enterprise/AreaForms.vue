<template>
  <v-card>
    <v-card-title v-if="openType == 0">区域添加</v-card-title>
    <v-card-title v-if="openType == 2">区域编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row align="center">
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.number"
              label="区域编号"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.name"
              label="区域名称"
              :rules="rules.must"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="object.officeUID"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处"
              clearable
            ></v-select>
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
import { queryOffices, entryArea, editArea } from "@/api/oadrp";
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
    officeItems: [],
    object: {
      name: "",
      officeUID: "",
      number: "",
    },
    rules: {
      muster: [(v) => !!v || "必填项"],
    },
  }),
  created() {
    if (this.openType == 2) {
      this.object = JSON.parse(JSON.stringify(this.parentObj));
    }
    this.getOfficeItems();
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    submit() {
      if (this.validateForm()) {
        if (this.openType == 0) {
          entryArea(this.object).then((res) => {
            this.$message.success("录入成功了！");
            this.refresh();
            this.closeDialog();
          });
        } else if (this.openType == 2) {
          editArea(this.object).then((res) => {
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