<template>
  <v-card>
    <v-card-title>回款记录</v-card-title>
    <v-card-subtitle>
      <v-form readonly>
        <v-row v-for="(item, i) in invoiceItems" :key="i">
          <v-col cols="2">
            <v-text-field label="录入时间" v-model="item.CreatedAt" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="回款时间" v-model="item.paymentDate" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="回款金额(元)" v-model="item.money" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="理论提成(元)" v-model="item.theoreticalPushMoney" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="回款延迟扣除(元)" v-model="item.fine" />
          </v-col>
          <v-col cols="2">
            <v-text-field label="实际提成(元)" v-model="item.pushMoney" />
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {};
</script>