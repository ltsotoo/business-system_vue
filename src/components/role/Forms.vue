<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-title v-if="openType == 0">职位添加</v-card-title>
      <v-card-title v-if="openType == 2">职位编辑</v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              :disabled="openType != 0"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="object.departmentUID"
              :items="departmentTypeItems"
              item-text="text"
              item-value="UID"
              label="部门类型默认"
              :disabled="openType != 0"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="object.permissions"
              :items="permissionItems"
              label="权限"
              multiple
              chips
              return-object
            ></v-select>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="submit"> 确定 </v-btn>
        <v-btn color="blue darken-1" text @click="closeDialog"> 取消 </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { queryDepartmentType } from "@/api/dictionary";
import { queryRole, addRole, editRole, queryPermissions } from "@/api/oadrp";
export default {
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    closeDialog: {
      type: Function,
    },
    openUID: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    departmentTypeItems: [],
    permissionItems: [],
    object: {
      name: "",
      departmentUID: "",
      permissions: [],
    },
  }),
  created() {
    this.getDepartmentTypeItems();
    this.getPermissionItems();
    if (this.openType == 2) {
      this.getRole();
    }
  },
  methods: {
    getRole() {
      queryRole(this.openUID).then((res) => {
        this.object = res.data;
      });
    },
    getDepartmentTypeItems() {
      queryDepartmentType().then((res) => {
        this.departmentTypeItems = res.data.dictionaries;
      });
    },
    getPermissionItems() {
      queryPermissions().then((res) => {
        this.permissionItems = res.data;
      });
    },
    entryRole() {
      addRole(this.object).then((res) => {
        this.$message.success("添加成功");
        this.closeDialog();
      });
    },
    updateRole() {
      editRole(this.object).then((res) => {
        this.$message.success("编辑成功");
        this.closeDialog();
      });
    },
    submit() {
      if (this.openType == 0) {
        this.entryRole();
      }
      if (this.openType == 2) {
        this.updateRole();
      }
    },
  },
};
</script>