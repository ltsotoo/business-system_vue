<template>
  <div>
    <v-card>
      <v-card-title>投标保证金管理</v-card-title>
      <v-card-subtitle>
        <v-form ref="from">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-select
                v-model="queryObject.status"
                :items="statusItems"
                item-text="key"
                item-value="value"
                label="类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="success" dark @click="openAddDialog">
                添加
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
      </v-card-subtitle>
      <div style="margin-top: 10px"></div>
      <bidBondDataTable ref="bidBondDataTable" :queryObject="queryObject" />
    </v-card>

    <v-dialog v-model="addDialog" v-if="addDialog" width="1000px" persistent>
      <bidBondAddForms :refresh="query" :closeDialog="closAddDialog" />
    </v-dialog>
  </div>
</template>

<script>
import bidBondDataTable from "@/components/bidBond/DataTable";
import bidBondAddForms from "@/components/bidBond/AddForms";
export default {
  components: {
    bidBondDataTable,
    bidBondAddForms,
  },
  data: () => ({
    statusItems: [
      { key: "待退还", value: 1 },
      { key: "完成", value: 2 },
    ],
    officeItems: [],
    queryObject: {
      status: 1,
    },

    addDialog: false,
  }),
  created() {},
  methods: {
    query() {
      this.$refs.bidBondDataTable.getObject();
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