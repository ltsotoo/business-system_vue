<template>
  <v-card>
    <v-card-title>合同开票记录</v-card-title>
    <v-card-subtitle>
      <v-form readonly>
        <v-row v-for="(item, i) in invoiceItems" :key="i">
          <v-col cols="3">
            <v-text-field label="录入时间" v-model="item.CreatedAt" />
          </v-col>
          <v-col cols="5">
            <v-text-field label="发票编号" v-model="item.code" />
          </v-col>
          <v-col cols="4">
            <v-text-field label="开票金额" v-model="item.money" />
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
    openItem: {
      type: Object,
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
      queryInvoices(this.openItem.UID).then((res) => {
        this.invoiceItems = res.data;
      });
    },
  },
};
</script>