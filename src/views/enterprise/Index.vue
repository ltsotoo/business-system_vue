<template>
  <v-container>
    <v-expansion-panels multiple>
      <areaPanel v-if="nos.indexOf('1') != -1" />
      <officePanel v-if="nos.indexOf('2') != -1" />
      <departmentPanel />
      <employeePanel />
    </v-expansion-panels>

    <v-expansion-panels multiple style="margin-top: 30px">
      <settingUnit v-if="nos.indexOf('5') != -1" />
      <settingRole v-if="nos.indexOf('20') != -1" />
      <!-- <YearClearingPanel /> -->
    </v-expansion-panels>
  </v-container>
</template>

<script>
import areaPanel from "./AreaPanel.vue";
import officePanel from "./OfficePanel.vue";
import departmentPanel from "./DepartmentPanel.vue";
import employeePanel from "./EmployeePanel.vue";
import YearClearingPanel from "./YearClearingPanel.vue";

import settingUnit from "./SettingUnit.vue";
import settingRole from "./SettingRole.vue";
export default {
  components: {
    areaPanel,
    officePanel,
    departmentPanel,
    employeePanel,
    YearClearingPanel,

    settingUnit,
    settingRole,
  },
  data: () => ({
    nos: [],
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
};
</script>