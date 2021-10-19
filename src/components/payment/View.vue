<template>
  <v-card>
    <v-card-title>合同回款详情</v-card-title>
    <v-card-subtitle>
      <v-row v-for="(item, i) in parentObject" :key="i" align="center">
        <v-col cols="2">
          <v-text-field
            label="时间"
            readonly
            v-model.number="item.CreatedAt"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            label="回款金额(元)"
            readonly
            v-model.number="item.money"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-textarea
            label="备注"
            readonly
            auto-grow
            rows="1"
            v-model="item.remarks"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    parentObject: {},
  },
};
</script>