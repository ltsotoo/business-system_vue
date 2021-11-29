<template>
  <v-card>
    <v-card-title>客户管理</v-card-title>
    <v-card-subtitle>
      <v-form>
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-text-field
              label="公司"
              v-model.trim="queryObject.companyName"
              clearable
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="姓名"
              v-model.trim="queryObject.name"
              clearable
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="课题组"
              v-model.trim="queryObject.researchGroup"
              clearable
              maxlength="20"
            ></v-text-field>
          </v-col>

          <v-col cols="auto">
            <v-btn rounded color="primary" dark @click="queryCustomers">
              查询
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>

      <customerDataTable
        ref="customerDataTable"
        :queryObject="queryObject"
      ></customerDataTable>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import customerDataTable from "@/components/customer/DataTable";

export default {
  components: {
    customerDataTable,
  },
  data: () => ({
    queryObject: {
      companyName: "",
      researchGroup: "",
      name: "",
    },
    addDialog: false,
  }),
  created() {},
  methods: {
    queryCustomers() {
      this.$refs.customerDataTable.getObject();
    },
  },
};
</script>