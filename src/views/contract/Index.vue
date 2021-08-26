<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-col cols="3">
              <v-select
                v-model="queryObject.areaUID"
                :items="areaItems"
                item-text="name"
                item-value="UID"
                label="区域"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="合同编号:"
                v-model.trim="queryObject.no"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="客户单位："
                v-model.trim="queryObject.companyName"
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
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="success" dark @click="goToEntry">
                录入
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <v-row style="margin-top: 10px">
      <v-col>
        <contractDataTable :queryObject="queryObject" ref="contractDataTable" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import contractDataTable from "@/components/contract/DataTable";
import { queryAreas } from "@/api/oadrp";
export default {
  components: {
    contractDataTable,
  },
  data: () => ({
    areaItems: [],
    queryObject: {
      areaUID: "",
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
      this.$refs.contractDataTable.getObject();
    },
    resetQueryForm() {
      this.$refs.queryForm.reset();
      this.$refs.contractDataTable.getObject();
    },
    goToEntry() {
      this.$router.replace("/contract/entry");
    },
  },
};
</script>