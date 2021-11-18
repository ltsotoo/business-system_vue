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
                label="姓名"
                v-model.trim="queryObject.name"
                clearable
                counter
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="单位"
                v-model.trim="queryObject.companyName"
                clearable
                counter
                maxlength="50"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="课题组"
                v-model.trim="queryObject.researchGroup"
                clearable
                counter
                maxlength="50"
              ></v-text-field>
            </v-col>

            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="success" dark @click="openAddDialog">
                添加
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <div style="margin-top: 10px"></div>
        <customerDataTable :queryObject="queryObject" ref="customerDataTable" />
      </v-card-subtitle>
    </v-card>

    <v-dialog v-model="addDialog" v-if="addDialog" max-width="600px">
      <customerForms />
    </v-dialog>
  </v-container>
</template>

<script>
import customerDataTable from "@/components/customer/DataTable";
import customerForms from "@/components/customer/Forms";
import { queryAreas } from "@/api/oadrp";

export default {
  components: {
    customerDataTable,
    customerForms,
  },
  data: () => ({
    areaItems: [],
    queryObject: {
      areaUID: "",
      companyName: "",
      researchGroup: "",
      name: "",
    },
    addDialog: false,
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
    openAddDialog() {
      this.addDialog = true;
    },
    closAddDialog() {
      this.addDialog = false;
    },
  },
};
</script>