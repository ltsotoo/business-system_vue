<template>
  <div>
    <v-card>
      <v-card-title>合同回款详情</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <div v-if="openItem.invoiceType == 1">
            <v-card flat>
              <v-card-title>回款详情</v-card-title>
              <v-card-subtitle>
                <v-row v-for="(item, i) in objects.payments" :key="i">
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
              </v-card-subtitle>
            </v-card>
          </div>
          <div v-else>
            <v-card flat>
              <v-card-title>发票详情</v-card-title>
              <v-card-subtitle>
                <v-row v-for="(item, i) in objects" :key="i">
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
                    <v-text-field
                      label="回款总金额"
                      v-model="item.paymentMoney"
                    />
                  </v-col>
                  <v-col cols="2" v-if="item.status == 1">
                    <v-text-field label="状态" v-model="status1" />
                  </v-col>
                  <v-col cols="2" v-if="item.status == 2">
                    <v-text-field label="状态" v-model="status2" />
                  </v-col>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>发票回款详情</v-card-title>
                      <v-card-subtitle>
                        <v-row v-for="(payment, j) in item.payments" :key="j">
                          <v-col cols="2">
                            <v-text-field
                              label="录入时间"
                              v-model="payment.CreatedAt"
                            />
                          </v-col>
                          <v-col cols="10">
                            <v-row>
                              <v-col cols="2" v-if="openItem.payType == 2">
                                <v-text-field
                                  label="回款金额(美元)"
                                  v-model="payment.moneyUSD"
                                />
                              </v-col>
                              <v-col cols="2">
                                <v-text-field
                                  label="回款金额(人民币)"
                                  v-model="payment.money"
                                />
                              </v-col>
                              <v-col cols="2">
                                <v-text-field
                                  label="理论提成(元)"
                                  v-model="payment.theoreticalPushMoney"
                                />
                              </v-col>
                              <v-col cols="2">
                                <v-text-field
                                  label="回款延迟扣除(元)"
                                  v-model="payment.fine"
                                />
                              </v-col>
                              <v-col cols="2">
                                <v-text-field
                                  label="实际提成(元)"
                                  v-model="payment.pushMoney"
                                />
                              </v-col>
                              <v-col cols="2">
                                <v-text-field
                                  label="业务费用(元)"
                                  v-model="payment.businessMoney"
                                />
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-subtitle>
            </v-card>
          </div>
        </v-form>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { queryInvoicesAndPayments } from "@/api/invoice";
export default {
  props: {
    openItem: {
      type: Object,
    },
  },
  data: () => ({
    objects: [],
    status1: "未完成回款",
    status2: "完成回款",
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryInvoicesAndPayments({
        UID: this.openItem.UID,
        invoiceType: this.openItem.invoiceType,
      }).then((res) => {
        this.objects = res.data;
      });
    },
  },
};
</script>