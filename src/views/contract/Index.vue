<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="center">
            <v-col cols="10">
              <v-row>
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
                <v-col cols="3">
                  <v-text-field
                    label="客户单位"
                    v-model.trim="queryObject.companyName"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="客户名称"
                    v-model.trim="queryObject.companyName"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="合同编号"
                    v-model.trim="queryObject.no"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-select
                    v-model="queryObject.areaUID"
                    :items="areaItems"
                    item-text="name"
                    item-value="UID"
                    label="特殊合同"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="合同状态"
                    v-model.trim="queryObject.companyName"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="生产状态"
                    v-model.trim="queryObject.companyName"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="回款状态"
                    v-model.trim="queryObject.no"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
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
              <v-btn
                rounded
                color="success"
                dark
                @click="goToEntry"
                v-if="nos.indexOf('02') > -1"
              >
                录入
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <div style="margin-top: 10px"></div>
    <contractDataTable :queryObject="queryObject" ref="contractDataTable" />
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
    nos: [],
    areaItems: [],
    queryObject: {
      areaUID: "",
      no: "",
      companyName: "",
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