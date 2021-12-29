<template>
  <v-card>
    <v-card-title>合同回款详情</v-card-title>
    <v-card-subtitle>
      <v-form readonly>
        <v-row v-for="(item, i) in object" :key="i">
          <v-col cols="2">
            <v-text-field label="录入时间" v-model="item.CreatedAt" />
          </v-col>
          <v-col cols="1">
            <v-text-field label="任务ID" v-model="item.ID" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="任务产品" v-model="item.task.product.name" />
          </v-col>
          <v-col cols="7">
            <v-row>
              <v-col cols="2">
                <v-text-field label="回款金额(CNY)" v-model="item.money" />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="理论提成(CNY)"
                  v-model="item.theoreticalPushMoney"
                />
              </v-col>
              <v-col cols="2">
                <v-text-field label="回款延迟扣除(CNY)" v-model="item.fine" />
              </v-col>
              <v-col cols="2">
                <v-text-field label="实际提成(CNY)" v-model="item.pushMoney" />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="业务费用(CNY)"
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
    object: [],
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryPayments(this.openItem.UID).then((res) => {
        this.object = res.data;
      });
    },
  },
};
</script>