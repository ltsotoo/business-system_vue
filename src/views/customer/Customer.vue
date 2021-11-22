<template>
  <v-card>
    <v-card-title>客户管理</v-card-title>
    <v-card-subtitle>
      <v-form>
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
              maxlength="20"
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
            <v-btn rounded color="primary" dark @click="queryCustomers">
              查询
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" dark @click="openAddDialog">
              添加
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>

      <customerDataTable
        ref="customerDataTable"
        :queryObject="queryObject"
      ></customerDataTable>

      <v-dialog
        v-model="addDialog"
        v-if="addDialog"
        width="600px"
        persistent
        @click:outside="closeAddDialog"
      >
        <customerAddForms
          :closeDialog="closeAddDialog"
          :refresh="queryCustomers"
        />
      </v-dialog>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import customerDataTable from "@/components/customer/DataTable";
import customerAddForms from "@/components/customer/AddForms";
import { queryAreas } from "@/api/oadrp";

export default {
  components: {
    customerDataTable,
    customerAddForms,
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
    queryCustomers() {
      this.$refs.customerDataTable.getObject();
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