<template>
  <div>
    <v-card>
      <v-card-title>办事处金额变更历史记录</v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-select
                v-model="queryObject.officeUID"
                :items="officeItems"
                item-text="name"
                item-value="UID"
                label="办事处"
                :clearable="nos.includes('09-01-02')"
                :disabled="!nos.includes('09-01-02')"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-menu
                ref="startMenu"
                v-model="startMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="queryObject.startDate"
                    label="开始时间"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="zh-cn"
                  scrollable
                  no-title
                  v-model="queryObject.startDate"
                  @change="$refs.yearMenu.save(queryObject.startDate)"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="2">
              <v-menu
                ref="endMenu"
                v-model="endMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="queryObject.endDate"
                    label="结束时间"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="zh-cn"
                  scrollable
                  no-title
                  v-model="queryObject.endDate"
                  @change="$refs.yearMenu.save(queryObject.endDate)"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="备注"
                v-model="queryObject.remarks"
                clearable
                maxlength="50"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <div style="margin-top: 10px"></div>
        <historyOfficeDataTable
          :queryObject="queryObject"
          ref="historyOfficeDataTable"
        ></historyOfficeDataTable>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { queryOffices } from "@/api/oadrp";
import historyOfficeDataTable from "@/components/history/DataTableOffice";
export default {
  components: {
    historyOfficeDataTable,
  },
  data: () => ({
    nos: [],

    startMenu: false,
    endMenu: false,
    officeItems: [],
    queryObject: {
      officeUID: "",
      startDate: "",
      endDate: "",
      remarks: "",
    },
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
    if (this.nos.includes("09-01-01") && !this.nos.includes("09-01-02")) {
      this.queryObject.officeUID = localStorage.getItem("office");
    }
    this.getOfficeItems();
  },
  methods: {
    query() {
      this.$refs.historyOfficeDataTable.getObject();
    },
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
  },
};
</script>