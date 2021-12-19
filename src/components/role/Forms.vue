<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-title v-if="openType == 0">职位添加</v-card-title>
      <v-card-title v-if="openType == 2">职位编辑</v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              counter
              :rules="rules.must"
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="object.permissions"
              :items="permissionItems"
              label="权限"
              multiple
              chips
              return-object
            >
              <template v-slot:prepend-item>
                <v-list-item ripple @click="toggle">
                  <v-list-item-action>
                    <v-icon
                      :color="
                        object.permissions.length > 0 ? 'indigo darken-4' : ''
                      "
                    >
                      {{ icon }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title> Select All </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-card-subtitle>
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
    </v-card>
  </v-form>
</template>

<script>
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
    refresh: {
      type: Function,
    },
    openUID: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    submitDisabled: false,
    departmentTypeItems: [],
    permissionItems: [],
    object: {
      name: "",
      departmentUID: "",
      permissions: [],
    },
    rules: {
      must: [(v) => !!v || "必填项"],
    },
  }),
  created() {
    this.getPermissionItems();
    if (this.openType == 2) {
      this.getRole();
    }
  },
  computed: {
    selectAllPer() {
      return this.object.permissions.length === this.permissionItems.length;
    },
    selectSomePer() {
      return this.object.permissions.length > 0 && !this.selectAllPer;
    },
    icon() {
      if (this.selectAllPer) return "mdi-close-box";
      if (this.selectSomePer) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  methods: {
    getRole() {
      queryRole(this.openUID).then((res) => {
        this.object = res.data;
      });
    },
    getPermissionItems() {
      queryPermissions().then((res) => {
        this.permissionItems = res.data;
      });
    },
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        if (this.openType == 0) {
          addRole(this.object).then((res) => {
            this.$message.success("添加成功");
            this.refresh();
            this.closeDialog();
          });
        } else if (this.openType == 2) {
          editRole(this.object).then((res) => {
            this.$message.success("编辑成功");
            this.closeDialog();
          });
        }
      } else {
        this.submitDisabled = false;
      }
    },
    toggle() {
      this.$nextTick(() => {
        if (this.selectAllPer) {
          this.object.permissions = [];
        } else {
          this.object.permissions = this.permissionItems.slice();
        }
      });
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>