<template>
  <v-card>
    <v-card-title>已开发票</v-card-title>
    <v-card-subtitle>
      <v-form readonly>
        <v-row v-for="(item, i) in invoiceItems" :key="i">
          <v-col cols="2">
            <v-text-field label="录入时间" v-model="item.CreatedAt" />
          </v-col>
          <v-col cols="5">
            <v-text-field label="发票编号" v-model="item.code" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="总金额" v-model="item.money" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="回款总金额" v-model="item.paymentMoney" />
          </v-col>
          <v-col cols="1">
            <v-text-field label="状态" v-model="item.status" />
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryInvoices } from "@/api/invoice";
export default {
  props: {
    openUID: {
      type: String,
    },
  },
  data: () => ({
    invoiceItems: [],
  }),
  created() {
    this.getInvoiceItems();
  },
  methods: {
    getInvoiceItems() {
      queryInvoices({ contractUID: this.openUID }).then((res) => {
        this.invoiceItems = res.data;
      });
    },
  },
};
</script>