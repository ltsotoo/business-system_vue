<template>
  <div>
    <v-card>
      <v-card-title>补助额度变更历史记录</v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="3">
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
            <v-col cols="3">
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
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <div style="margin-top: 10px"></div>
        <historyEmployeeDataTable
          :queryObject="queryObject"
          ref="historyEmployeeDataTable"
        ></historyEmployeeDataTable>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import historyEmployeeDataTable from "@/components/history/DataTableEmployee";
export default {
  components: {
    historyEmployeeDataTable,
  },
  data: () => ({
    startMenu: false,
    endMenu: false,
    queryObject: {
      userUID: "",
      startDate: "",
      endDate: "",
    },
  }),
  created() {
    this.queryObject.userUID = localStorage.getItem("uid");
  },
  methods: {
    query() {
      this.$refs.historyEmployeeDataTable.getObject();
    },
  },
};
</script>