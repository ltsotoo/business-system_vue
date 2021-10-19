<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-select
                v-model="queryObject.areaUID"
                :items="areaItems"
                item-text="name"
                item-value="UID"
                label="区域"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="单位"
                v-model.trim="queryObject.companyName"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="课题组"
                v-model.trim="queryObject.researchGroup"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="姓名"
                v-model.trim="queryObject.name"
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
              <v-btn
                rounded
                color="success"
                dark
                @click="goToEntry"
                v-if="nos.indexOf('05') > -1"
              >
                录入
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <div style="margin-top: 10px"></div>
    <customerDataTable :queryObject="queryObject" ref="customerDataTable" />
  </v-container>
</template>

<script>
import customerDataTable from "@/components/customer/DataTable";
import { queryAreas } from "@/api/oadrp";

export default {
  components: {
    customerDataTable,
  },
  data: () => ({
    nos: [],
    areaItems: [],
    queryObject: {
      areaUID: "",
      companyName: "",
      researchGroup: "",
      name: "",
    },
  }),
  created() {
    this.nos = localStorage.getItem("nos");
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
      this.$router.replace("/customer/entry");
    },
  },
};
</script>