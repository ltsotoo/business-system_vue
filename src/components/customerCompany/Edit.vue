<template>
  <v-card class="mx-auto">
    <v-card-title>客户公司编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="object.areaUID"
              :items="areaItems"
              item-text="name"
              item-value="UID"
              label="区域"
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
import { queryAreas } from "@/api/oadrp";
import { editCompany } from "@/api/customer";
export default {
  props: {
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
    areaItems: [],
    object: {
      areaUID: "",
      name: "",
      address: "",
    },
    rules: {
      must: [(v) => !!v || "必填项"],
    },
  }),
  created() {
    this.getAreaItems();
    this.object = JSON.parse(JSON.stringify(this.parentObj));
  },
  methods: {
    getAreaItems() {
      queryAreas().then((res) => {
        this.areaItems = res.data;
      });
    },
    submit() {
      if (this.validateForm()) {
        editCompany(this.object).then((res) => {
          this.$message.success("编辑成功了！");
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