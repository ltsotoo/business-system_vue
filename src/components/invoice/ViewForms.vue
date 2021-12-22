<template>
  <v-card>
    <v-card-title>开票记录</v-card-title>
    <v-card-subtitle>
      <v-form readonly>
        <v-row v-for="(item, i) in invoiceItems" :key="i">
          <v-col cols="2">
            <v-text-field label="录入时间" v-model="item.CreatedAt" />
          </v-col>
          <v-col cols="4">
            <v-text-field label="发票编号" v-model="item.code" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="总金额" v-model="item.money" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="回款总金额" v-model="item.paymentMoney" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="状态" v-model="item.statusText" />
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryInvoices } from "@/api/invoice";
import { queryInvoiceStatus } from "@/api/dictionary";
export default {
  props: {
    openItem: {
      type: Object,
    },
  },
  data: () => ({
    statusItems: [],
    invoiceItems: [],
  }),
  created() {
    this.getStatusItems();
    this.getInvoiceItems();
  },
  methods: {
    getStatusItems() {
      queryInvoiceStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    getInvoiceItems() {
      queryInvoices({ contractUID: this.openItem.UID }).then((res) => {
        this.invoiceItems = res.data;
        this.statusToText();
      });
    },
    statusToText() {
      this.invoiceItems.forEach((item) => {
        this.statusItems.some((status) => {
          if (item.status == status.value) {
            item.statusText = status.text;
            return;
          }
        });
      });
    },
  },
};
</script>