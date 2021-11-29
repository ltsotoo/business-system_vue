<template>
  <v-card class="mx-auto">
    <v-card-title>客户公司添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="object.regionUID"
              :items="regionItems"
              item-text="text"
              item-value="UID"
              label="省份"
              :rules="rules.must"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="名称"
              v-model="object.name"
              clearable
              counter
              maxlength="100"
              :rules="rules.must"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="地址"
              v-model="object.address"
              clearable
              counter
              maxlength="100"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { addCompany } from "@/api/customer";
export default {
  props: {
    regionItems: {
      type: Array,
      default: () => [],
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    object: {
      regionUID: "",
      name: "",
      address: "",
    },
    rules: {
      must: [(v) => !!v || "必填项"],
    },
  }),
  methods: {
    submit() {
      if (this.validateForm()) {
        addCompany(this.object).then((res) => {
          this.$message.success("添加成功了！");
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