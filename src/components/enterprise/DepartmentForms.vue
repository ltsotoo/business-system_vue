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
              :rules="rules.must"
            ></v-select>
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
          <v-col cols="12">
            <v-select
              v-model="object.roleUID"
              :items="roleItems"
              item-text="name"
              item-value="UID"
              label="默认职位"
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
import {
  queryOffices,
  queryRoles,
  entryDepartment,
  editDepartment,
} from "@/api/oadrp";
export default {
  props: {
    openType: {
      type: Number,
      default: 0,
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
    officeItem: [],
    roleItems: [],
    object: {
      roleUID: "",
      officeUID: "",
      name: "",
    },
    rules: {
      must: [(v) => !!v || "必填项"],
    },
  }),
  created() {
    this.getOfficeItems();
    this.getRoleItems();
    this.object.officeUID = this.officeUID;
    if (this.openType == 2) {
      this.object = this.parentObj;
    }
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
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