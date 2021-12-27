<template>
  <div>
    <v-card>
      <v-card-title>省份管理</v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="4">
              <v-text-field
                label="名称"
                clearable
                v-model="queryObject.text"
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" @click="queryUnits"> 查询 </v-btn>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="success" @click="openAddDialog" v-if="nos.includes('08-05-02')">
                添加
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <dictionaryDataTable
          ref="dictionaryDataTable"
          :queryObject="queryObject"
          :refresh="queryUnits"
        />

        <v-dialog v-model="addDialog" width="800px" persistent v-if="addDialog">
          <dictionaryForms
            :closeDialog="closeAddDialog"
            :refresh="queryUnits"
            :typeName="queryObject.typeName"
          />
        </v-dialog>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import dictionaryDataTable from "@/components/dictionary/DataTable";
import dictionaryForms from "@/components/dictionary/Forms";
export default {
  components: {
    dictionaryDataTable,
    dictionaryForms,
  },
  data: () => ({
    nos: [],

    queryObject: {
      typeName: "Region",
      text: "",
    },
    addDialog: false,
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
  methods: {
    queryUnits() {
      this.$refs.dictionaryDataTable.getObject(this.queryObject);
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