<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      职位设置
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="7">
            <v-text-field
              label="职位名称"
              clearable
              v-model="queryObject.name"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="queryRoles">
              查询
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" @click="openAddDialog" disabled>
              添加
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <roleDataTable ref="roleDataTable" :queryObject="queryObject"/>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import roleDataTable from "@/components/role/DataTable";
import roleForms from "@/components/role/Forms";
export default {
  components: {
    roleDataTable,
    roleForms,
  },
  data: () => ({
    queryObject: {
      name: "",
    },
  }),
  methods: {
    queryRoles() {
      this.$refs.roleDataTable.getRoles();
    },
  },
};
</script>