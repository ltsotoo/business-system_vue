<template>
  <v-card>
    <v-card-title>回款记录</v-card-title>
    <v-card-subtitle>
      <v-form readonly>
        <v-row v-for="(item, i) in paymentItems" :key="i">
          <v-col cols="2">
            <v-text-field label="录入时间" v-model="item.CreatedAt" />
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="2" v-if="openItem.payType == 2">
                <v-text-field label="回款金额(美元)" v-model="item.moneyUSD" />
              </v-col>
              <v-col cols="2">
                <v-text-field label="回款金额(人民币)" v-model="item.money" />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="理论提成(元)"
                  v-model="item.theoreticalPushMoney"
                />
              </v-col>
              <v-col cols="2">
                <v-text-field label="回款延迟扣除(元)" v-model="item.fine" />
              </v-col>
              <v-col cols="2">
                <v-text-field label="实际提成(元)" v-model="item.pushMoney" />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="业务费用(元)"
                  v-model="item.businessMoney"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryPayments } from "@/api/payment";
export default {
  props: {
    openItem: {
      type: Object,
    },
  },
  data: () => ({
    paymentItems: [],
  }),
  created() {
    this.getPaymentItems();
  },
  methods: {
    getPaymentItems() {
      queryPayments(this.openItem.UID).then((res) => {
        this.paymentItems = res.data;
      });
    },
  },
};
</script>