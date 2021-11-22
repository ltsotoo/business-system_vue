<template>
  <v-card>
    <v-card-title>客户公司管理</v-card-title>
    <v-card-subtitle>
      <v-form>
        <v-row align="baseline">
          <v-spacer></v-spacer>
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
              label="公司名称"
              v-model="queryObject.name"
              clearable
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="queryCompanys"> 查询 </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" @click="openAddDialog"> 添加 </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>

      <customerCompanyDataTable
        ref="customerCompanyDataTable"
        :queryObject="queryObject"
      ></customerCompanyDataTable>

      <v-dialog
        v-model="addDialog"
        v-if="addDialog"
        width="600px"
        persistent
        @click:outside="closeAddDialog"
      >
        <customerCompanyForms
          :areaItems="areaItems"
          :closeDialog="closeAddDialog"
          :refresh="queryCompanys"
        />
      </v-dialog>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryAreas } from "@/api/oadrp";
import customerCompanyDataTable from "@/components/customerCompany/DataTable";
import customerCompanyForms from "@/components/customerCompany/Forms";
export default {
  components: {
    customerCompanyDataTable,
    customerCompanyForms,
  },
  data: () => ({
    areaItems: [],
    queryObject: {
      areaUID: "",
      name: "",
    },
    addDialog: false,
  }),
  created() {
    this.getAreaItems();
  },
  methods: {
    getAreaItems() {
      queryAreas().then((res) => {
        this.areaItems = res.data;
      });
    },

    queryCompanys() {
      this.$refs.customerCompanyDataTable.getObject();
    },

    openAddDialog() {
      this.addDialog = true;
    },
    closeAddDialog() {
      this.addDialog = false;
    },
  },
};
</script>