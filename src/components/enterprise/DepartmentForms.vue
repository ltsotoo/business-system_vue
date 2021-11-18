<template>
  <v-card>
    <v-card-title v-if="openType == 0">部门添加</v-card-title>
    <v-card-title v-if="openType == 2">部门编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row align="center">
          <v-col cols="12">
            <v-select
              v-model="object.officeUID"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处"
              :disabled="openType == 2"
            ></v-select>
          </v-col>
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
          <v-col cols="12">
            <v-select
              v-model="object.roleUID"
              :items="roleItems"
              item-text="name"
              item-value="UID"
              label="默认职位"
              clearable
              :disabled="openType == 2"
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
import { queryRoles, entryDepartment, editDepartment } from "@/api/oadrp";
export default {
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    officeItems: {
      type: Object,
      default: [],
    },
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
    parentObj: {
      type: Object,
    },
  },
  data: () => ({
    roleItems: [],
    object: {
      roleUID: "",
      officeUID: "",
      name: "",
    },
    rules: {
      name: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 20) || "名称的长度必须不大于20个字符",
      ],
    },
  }),
  created() {
    this.getRoleItems();
    this.object.officeUID = this.officeUID;
    if (this.openType == 2) {
      this.object = this.parentObj;
    }
  },
  methods: {
    getRoleItems() {
      queryRoles().then((res) => {
        this.roleItems = res.data;
      });
    },
    submit() {
      if (this.validateForm()) {
        if (this.openType == 0) {
          entryDepartment(this.object).then((res) => {
            this.$message.success("添加成功了！");
            this.refresh();
            this.closeDialog();
          });
        } else if (this.openType == 2) {
          editDepartment(this.object).then((res) => {
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