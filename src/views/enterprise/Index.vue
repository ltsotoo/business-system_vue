<template>
  <v-container>
    <officePanel v-if="nos.includes('08-01-01')" />
    <departmentPanel
      style="margin-top: 10px"
      v-if="nos.includes('08-02-01') || nos.includes('08-02-02')"
    />
    <employeePanel
      style="margin-top: 10px"
      v-if="nos.includes('08-03-01') || nos.includes('08-03-02')"
    />

    <settingRole style="margin-top: 30px" v-if="nos.includes('08-04-01')" />
    <settingRegion style="margin-top: 10px" v-if="nos.includes('08-05-01')" />
    <settingUnit style="margin-top: 10px" v-if="nos.includes('08-06-01')" />

    <settingMonthPlan
      style="margin-top: 10px"
      v-if="nos.includes('08-08-01')"
    />
  </v-container>
</template>

<script>
import officePanel from "./OfficePanel";
import departmentPanel from "./DepartmentPanel";
import employeePanel from "./EmployeePanel";

import settingRole from "./SettingRole";
import settingRegion from "./SettingRegion";
import settingUnit from "./SettingUnit";
import settingMonthPlan from "./SettingMonthPlan";
export default {
  components: {
    officePanel,
    departmentPanel,
    employeePanel,

    settingRole,
    settingRegion,
    settingUnit,
    settingMonthPlan,
  },
  data: () => ({
    nos: [],
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
  },
};
</script>