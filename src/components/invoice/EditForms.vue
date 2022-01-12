<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col>
          <v-text-field label="发票编号" v-model="object.code"> </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="开票金额" v-model="object.money"> </v-text-field>
        </v-col>
      </v-row>
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
import { editInvoice } from "@/api/invoice";
export default {
  props: {
    openItem: {
      type: Object,
      default: {},
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    object: {
      code: "",
      money: 0,
    },
  }),
  created() {
    this.object = JSON.parse(JSON.stringify(this.openItem));
  },
  methods: {
    submit() {
      this.submitDisabled = true;
      editInvoice(this.object).then((res) => {
        this.$message.success("编辑成功！");
        this.openItem.code = this.object.code;
        this.openItem.money = this.object.money;
        this.closeDialog();
      });
    },
  },
};
</script>