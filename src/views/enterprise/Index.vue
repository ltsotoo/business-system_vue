<template>
  <v-container>
    <v-expansion-panels multiple>
      <officePanel />
      <departmentPanel />
      <employeePanel />
    </v-expansion-panels>

    <v-expansion-panels multiple style="margin-top: 30px">
      <settingRole />
      <settingRegion />
      <settingUnit />
      <!-- <YearClearingPanel /> -->
    </v-expansion-panels>
  </v-container>
</template>

<script>
import officePanel from "./OfficePanel";
import departmentPanel from "./DepartmentPanel";
import employeePanel from "./EmployeePanel";
import YearClearingPanel from "./YearClearingPanel";

import settingRole from "./SettingRole";
import settingRegion from "./SettingRegion";
import settingUnit from "./SettingUnit";
export default {
  components: {
    officePanel,
    departmentPanel,
    employeePanel,
    YearClearingPanel,

    settingRole,
    settingRegion,
    settingUnit,
  },
  data: () => ({}),
  created() {},
};
</script>