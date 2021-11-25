<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="3">
              <v-text-field
                label="供应商名称"
                v-model.trim="queryObject.name"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="联系人"
                v-model.trim="queryObject.linkman"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="联系电话"
                v-model.trim="queryObject.phone"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="success" dark @click="openAddDialog">
                添加
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <div style="margin-top: 10px"></div>
        <supplierDataTable :queryObject="queryObject" ref="supplierDataTable" />
      </v-card-subtitle>
    </v-card>

    <v-dialog v-model="addDialog" v-if="addDialog" width="1000px" persistent>
      <supplierForms
        :refresh="query"
        :closeDialog="closAddDialog"
        openType="0"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import supplierDataTable from "@/components/supplier/DataTable";
import supplierForms from "@/components/supplier/Forms";
export default {
  components: {
    supplierDataTable,
    supplierForms,
  },
  data: () => ({
    queryObject: {
      name: "",
      linkman: "",
      phone: "",
    },
    addDialog: false,
  }),
  methods: {
    query() {
      this.$refs.supplierDataTable.getObject();
    },
    openAddDialog() {
      this.addDialog = true;
    },
    closAddDialog() {
      this.addDialog = false;
    },
  },
};
</script>