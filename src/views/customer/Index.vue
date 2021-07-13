<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-row align="baseline">
          <v-col cols="2">
            <v-select :items="items" label="区域"></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field label="客户单位"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="课题组"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="姓名"></v-text-field>
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
        <customerDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import customerDataTable from "@/components/customer/CustomerDataTable";
export default {
  components: {
    customerDataTable,
  },
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"],
  }),
  methods:{
    goToEntry(){
       this.$router.replace('/customer/entry')
    }
  }
};
</script>