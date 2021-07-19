<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-row align="baseline">
          <v-col cols="2">
            <v-text-field label="供应商名称"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="联系人姓名"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="联系电话"></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" dark> 查询 </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" dark> 重置 </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="green" dark @click="goToEntry"> 录入 </v-btn>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-row style="margin-top: 10px">
      <v-col>
        <supplierDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import supplierDataTable from "@/components/supplier/SupplierDataTable";
export default {
  components: {
    supplierDataTable,
  },
  data: () => ({}),
  methods: {
    goToEntry() {
      this.$router.replace("/supplier/entry");
    },
  },
};
</script>