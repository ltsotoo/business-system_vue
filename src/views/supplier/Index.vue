<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-col cols="3">
              <v-text-field
                label="名称"
                v-model.trim="queryObject.name"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="联系人"
                v-model.trim="queryObject.linkman"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="联系电话"
                v-model.trim="queryObject.phone"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="resetQueryForm">
                重置
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="green" dark @click="goToEntry">
                录入
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <v-row style="margin-top: 10px">
      <v-col>
        <supplierDataTable :queryObject="queryObject" ref="supplierDataTable" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import supplierDataTable from "@/components/supplier/DataTable";
export default {
  components: {
    supplierDataTable,
  },
  data: () => ({
    queryObject: {
      name: "",
      linkman: "",
      phone: "",
    },
  }),
  methods: {
    query() {
      this.$refs.supplierDataTable.getObject();
    },
    resetQueryForm() {
      this.$refs.queryForm.reset();
      this.$refs.supplierDataTable.getObject();
    },
    goToEntry() {
      this.$router.replace("/supplier/entry");
    },
  },
};
</script>