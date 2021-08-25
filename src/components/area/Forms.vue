<template>
  <v-card>
    <v-card-title v-if="openType == 0">区域添加</v-card-title>
    <v-card-title v-else>区域编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row align="center">
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="区域名称"
              :rules="rules.name"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="object.officeUID"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="submit"> 确定 </v-btn>
        <v-btn color="blue darken-1" text @click="closeDialog"> 取消 </v-btn>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryOffices, entryArea, editArea } from "@/api/oadrp";
export default {
  props: {
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
    openType: {
      type: Number,
      default: 0,
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
    },
    rules: {
      name: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length < 20) || "名称的长度必须小于20个字符",
      ],
    },
  }),
  created() {
    if (this.openType == 2) {
      this.object = this.parentObj;
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
      if (this.openType == 0) {
        entryArea(this.object).then((res) => {
          if (this.refresh) {
            this.refresh();
          }
          this.closeDialog();
        });
      } else if (this.openType == 2) {
        editArea(this.object).then((res) => {
          if (this.refresh) {
            this.refresh();
          }
          this.closeDialog();
        });
      }
    },
  },
};
</script>