<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-row align="baseline">
          <v-col cols="3">
            <v-select :items="items" label="选择区域"></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field label="合同编号:"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="客户单位："></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" dark> 查询 </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" dark> 重置 </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="green" dark @click="goToEntry"> 录入 </v-btn>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-row style="margin-top: 10px">
      <v-col>
        <productDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import productDataTable from "@/components/product/ProductDataTable";
export default {
  components: {
    productDataTable,
  },
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"],
  }),
  methods:{
    goToEntry(){
       this.$router.replace('/product/entry')
    }
  }
};
</script>