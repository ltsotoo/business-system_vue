<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col>
            <v-text-field label="月份" v-model.trim="object.text" disabled>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="百分比(%)" v-model.number="object.value">
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="submit" :disabled="submitDisabled">
        提交
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { editMonthPlan } from "@/api/monthPlan";
export default {
  props: {
    openItem: {
      type: Object,
      default: {},
    },
    refresh: {
      type: Function,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    object: {
      id: "",
      no: "",
      text: "",
      value: "",
    },
  }),
  created() {
    this.object = JSON.parse(JSON.stringify(this.openItem));
  },
  methods: {
    submit() {
      this.submitDisabled = true;
      editMonthPlan(this.object).then((res) => {
        this.$message.success("编辑成功！");
        this.refresh();
        this.closeDialog();
      });
    },
  },
};
</script>