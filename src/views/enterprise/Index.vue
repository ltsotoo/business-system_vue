<template>
  <v-container>
    <v-expansion-panels multiple>
      <areaPanel />
      <officePanel />
      <departmentPanel />
      <employeePanel />
    </v-expansion-panels>

    <v-expansion-panels multiple style="margin-top: 30px">
      <settingUnit />
      <!-- <settingDepartmentType /> -->
      <settingRole />
    </v-expansion-panels>
  </v-container>
</template>

<script>
import areaPanel from "./AreaPanel.vue";
import officePanel from "./OfficePanel.vue";
import departmentPanel from "./DepartmentPanel.vue";
import employeePanel from "./EmployeePanel.vue";

import settingUnit from "./SettingUnit.vue";
import settingDepartmentType from "./SettingDepartmentType.vue";
import settingRole from "./SettingRole.vue";
export default {
  components: {
    areaPanel,
    officePanel,
    departmentPanel,
    employeePanel,

    settingUnit,
    settingDepartmentType,
    settingRole,
  },
};
</script>