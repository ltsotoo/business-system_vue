<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col>
          <v-text-field
            label="回款金额(人民币)"
            v-model.number="object.money"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-menu
            ref="contractDateMenu"
            v-model="contractDateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="object.paymentDate"
                label="回款日期"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="zh-cn"
              scrollable
              no-title
              v-model="object.paymentDate"
              min="1900-01-01"
              @change="$refs.contractDateMenu.save(object.paymentDate)"
            ></v-date-picker>
          </v-menu>
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
import { editPayment } from "@/api/payment";
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
    closeAllDialog: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    contractDateMenu: false,
    object: {
      paymentDate: "",
      money: 0,
    },
  }),
  created() {
    this.object = JSON.parse(JSON.stringify(this.openItem));
  },
  methods: {
    submit() {
      this.submitDisabled = true;
      editPayment(this.object).then((res) => {
        this.$message.success("编辑成功！");
        this.refresh();
        this.closeAllDialog();
      });
    },
  },
};
</script>