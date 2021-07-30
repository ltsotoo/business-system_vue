<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-col cols="3">
              <v-select
                v-model="queryObject.areaID"
                :items="areaItems"
                item-text="name"
                item-value="ID"
                label="区域"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="合同编号:"
                v-model="queryObject.no"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="客户单位："
                v-model="queryObject.companyName"
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
        <contractDataTable :queryObject="queryObject" ref="customerDataTable" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import contractDataTable from "@/components/contract/ContractDataTable";
import { queryAreas } from "@/api/base";
export default {
  components: {
    contractDataTable,
  },
  data: () => ({
    areaItems: [],
    queryObject: {
      areaID: null,
      no: "",
      companyName: "",
    },
  }),
  created() {
    this.getAreas();
  },
  methods: {
    getAreas() {
      queryAreas().then((res) => {
        this.areaItems = res.data;
      });
    },
    query() {
      this.$refs.customerDataTable.getObject();
    },
    resetQueryForm() {
      this.$refs.queryForm.reset();
      this.$refs.customerDataTable.getObject();
    },
    goToEntry() {
      this.$router.replace("/contract/entry");
    },
  },
};
</script>