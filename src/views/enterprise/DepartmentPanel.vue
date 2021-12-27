<template>
  <div>
    <v-card>
      <v-card-title>部门管理</v-card-title>
      <v-card-subtitle>
        <v-form ref="departmentQueryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="3">
              <v-select
                v-model="queryObject.officeUID"
                :items="officeItems"
                item-text="name"
                item-value="UID"
                label="办事处"
                :readonly="nos.includes('02-01-01')"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="部门名称"
                v-model="queryObject.name"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" @click="queryDepartments">
                查询
              </v-btn>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn
                rounded
                color="success"
                @click="openAddDialog"
                v-if="nos.includes('08-02-03')"
              >
                添加
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <departmentDataTable
          ref="departmentDataTable"
          :queryObject="queryObject"
          :officeItems="officeItems"
        ></departmentDataTable>

        <v-dialog v-model="addDialog" v-if="addDialog" width="800px" persistent>
          <departmentForms
            :officeItems="officeItems"
            :officeUID="queryObject.officeUID"
            :closeDialog="closeAddDialog"
            :refresh="queryDepartments"
          />
        </v-dialog>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { queryOffices } from "@/api/oadrp";
import departmentDataTable from "@/components/enterprise/DepartmentDataTable";
import departmentForms from "@/components/enterprise/DepartmentForms";
export default {
  components: {
    departmentDataTable,
    departmentForms,
  },
  data: () => ({
    nos: [],

    officeItems: [],
    queryObject: {
      officeUID: "",
      name: "",
    },
    addDialog: false,
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
    if (this.nos.includes("08-02-01")) {
      this.queryObject.officeUID = localStorage.getItem("office");
    }
    this.getOfficeItems();
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    queryDepartments() {
      this.$refs.departmentDataTable.getObject();
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