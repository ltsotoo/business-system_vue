<template>
  <v-expansion-panel @click="clickDepartmentPanel">
    <v-expansion-panel-header :class="[`text-h4`]">
      部门管理
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="departmentQueryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-select
              v-model="departmentQueryObject.officeUID"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处名称"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="部门名称"
              clearable
              v-model="departmentQueryObject.name"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" dark @click="queryDepartments">
              查询
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" dark >
              添加
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <departmentDataTable
        ref="departmentDataTable"
        :queryObject="departmentQueryObject"
      ></departmentDataTable>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { queryOffices } from "@/api/oadrp";
import departmentDataTable from "@/components/enterprise/DepartmentDataTable";
export default {
  components: {
    departmentDataTable,
  },
  data: () => ({
    officeItems: [],
    departmentQueryObject: {
      officeUID: "",
      name: "",
    },
    departmentAddDialog: false,
  }),
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    clickDepartmentPanel(event) {
      if (
        !event.currentTarget.classList.contains(
          "v-expansion-panel-header--active"
        ) &&
        this.officeItems.length == 0
      ) {
        this.getOfficeItems();
      }
    },
    queryDepartments() {
      this.$refs.departmentDataTable.getObject(this.departmentQueryObject);
    },
  },
};
</script>