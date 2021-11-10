<template>
  <v-card>
    <v-card-title>部门添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row align="center">
          <v-col cols="12">
            <v-select
              v-model="object.typeUID"
              :items="departmentTypeItems"
              item-text="text"
              item-value="UID"
              label="部门类型"
              :rules="rules.typeUID"
              clearable
            ></v-select>
          </v-col>
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
import { queryDepartmentType } from "@/api/dictionary";
import { entryDepartment } from "@/api/oadrp";
export default {
  props: {
    officeUID: {
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
    departmentTypeItems: [],
    object: {
      typeUID: "",
      officeUID: "",
      name: "",
    },
    rules: {
      typeUID: [
        (v) => !!v || "必选项！",
      ],
      name: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length < 20) || "名称的长度必须小于20个字符",
      ],
    },
  }),
  created() {
    this.getDepartmentTypeItems();
    this.object.officeUID = this.officeUID;
  },
  methods: {
    getDepartmentTypeItems() {
      queryDepartmentType().then((res) => {
        this.departmentTypeItems = res.data;
      });
    },
    add() {
      if (this.validateForm()) {
        entryDepartment(this.object).then((res) => {
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