<template>
  <div>
    <v-card>
      <v-card-title>合同回款详情</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <div v-if="openItem.invoiceType == 1">
            <v-row v-for="(item, i) in openItem.payments" :key="i">
              <v-col cols="2">
                <v-text-field label="录入时间" v-model="item.CreatedAt" />
              </v-col>
              <v-col cols="10">
                <v-row>
                  <v-col cols="2" v-if="openItem.payType == 2">
                    <v-text-field
                      label="回款金额(美元)"
                      v-model="item.moneyUSD"
                    />
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="回款金额(人民币)"
                      v-model="item.money"
                    />
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="理论提成(元)"
                      v-model="item.theoreticalPushMoney"
                    />
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="回款延迟扣除(元)"
                      v-model="item.fine"
                    />
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="实际提成(元)"
                      v-model="item.pushMoney"
                    />
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
          </div>
          <div v-else>
            <v-row v-for="(item, i) in openItem.invoices" :key="i">
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
                <v-text-field label="状态" v-model="item.status" />
              </v-col>
            </v-row>
          </div>
        </v-form>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    openItem: {
      type: Object,
    },
  },
  data: () => ({}),
  created() {},
  methods: {
    getStatusItems() {
      queryInvoiceStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
  },
};
</script>