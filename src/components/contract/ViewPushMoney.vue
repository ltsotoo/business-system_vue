<template>
  <v-card>
    <v-card-title>提成明细</v-card-title>
    <v-card-subtitle>
      <v-form readonly>
        <div v-if="parentObj.pushMoney.type == 1">
          <v-row v-for="(task, i) in parentObj.tasks" :key="i">
            <v-col cols="4">
              <v-text-field
                v-model="task.product.name"
                label="产品名称"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="task.number"
                label="产品销售数量"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="task.product.standardPrice"
                label="产品标准售价(元)"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="task.price"
                label="产品实际售价(元)"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="task.pushMoney"
                label="提成金额(元)"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="parentObj.paymentTotalAmount"
              label="回款总金额(元)"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="parentObj.pushMoney.taskTotalMoney"
              label="产品提成总金额(元)"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-text-field
              v-model="parentObj.pushMoney.paymentDays"
              label="回款延迟天数"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="parentObj.pushMoney.paymentMoneys"
              label="回款延迟扣除金额(元)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="9"></v-col>
          <v-col cols="3">
            <v-text-field
              v-model="parentObj.pushMoney.totalMoney"
              label="最后提成金额(元)"
            ></v-text-field>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    parentObj: {
      type: Object,
    },
  },
};
</script>