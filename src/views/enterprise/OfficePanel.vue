<template>
  <div>
    <v-card>
      <v-card-title>公司(办事处)管理</v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="5">
              <v-text-field
                label="名称"
                v-model="queryObject.name"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" @click="queryOffices">
                查询
              </v-btn>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="success" @click="openAddDialog" v-if="nos.includes('08-01-02')">
                添加
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <officeDataTable
          ref="officeDataTable"
          :queryObject="queryObject"
        ></officeDataTable>

        <v-dialog
          v-model="addDialog"
          v-if="addDialog"
          width="800px"
          persistent
          @click:outside="closeAddDialog"
        >
          <officeFormsAdd
            :closeDialog="closeAddDialog"
            :refresh="queryOffices"
          />
        </v-dialog>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import officeDataTable from "@/components/enterprise/OfficeDataTable";
import officeFormsAdd from "@/components/enterprise/OfficeFormsAdd";
export default {
  components: {
    officeDataTable,
    officeFormsAdd,
  },
  data: () => ({
    nos: [],

    queryObject: {
      name: "",
    },
    addDialog: false,
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
  methods: {
    queryOffices() {
      this.$refs.officeDataTable.getObject();
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