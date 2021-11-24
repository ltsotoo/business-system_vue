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
              v-model="queryObject.officeUID"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处"
              :disabled="nos.indexOf('4') == -1"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="部门名称"
              v-model="queryObject.name"
              clearable
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn
              rounded
              color="primary"
              @click="queryDepartments"
              :disabled="queryObject.officeUID == ''"
            >
              查询
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn
              rounded
              color="success"
              @click="openAddDialog"
              v-if="this.nos.indexOf('4') != -1"
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

      <v-dialog
        v-model="addDialog"
        v-if="addDialog"
        width="600px"
        persistent
        @click:outside="closeAddDialog"
      >
        <departmentForms
          :officeItems="officeItems"
          :officeUID="queryObject.officeUID"
          :closeDialog="closeAddDialog"
          :refresh="queryDepartments"
        />
      </v-dialog>
    </v-expansion-panel-content>
  </v-expansion-panel>
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
    officeItems: [],
    queryObject: {
      officeUID: "",
      name: "",
    },
    addDialog: false,

    nos: [],
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );

    if (this.nos.indexOf("4") == -1 && this.nos.indexOf("7") != -1) {
      this.queryObject.officeUID = localStorage.getItem("office");
    }
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

    openAddDialog() {
      this.addDialog = true;
    },
    closeAddDialog() {
      this.addDialog = false;
    },
  },
};
</script>