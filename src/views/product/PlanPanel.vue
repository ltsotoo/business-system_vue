<template>
  <div>
    <v-card>
      <v-card-title>采购计划</v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="center">
            <v-spacer></v-spacer>
            <v-col cols="10">
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    label="合同编号"
                    v-model="queryObject.no"
                    maxlength="40"
                    clearable
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="类别"
                    v-model="queryObject.type"
                    maxlength="20"
                    clearable
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="物品名称"
                    v-model="queryObject.product"
                    maxlength="20"
                    clearable
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="规格型号"
                    v-model="queryObject.specification"
                    maxlength="20"
                    clearable
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    label="采购数量"
                    v-model.number="queryObject.buyNumber"
                    clearable
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="单位"
                    v-model="queryObject.unit"
                    maxlength="20"
                    clearable
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="要求描述（或链接）"
                    v-model="queryObject.description"
                    maxlength="50"
                    clearable
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-col cols="auto" v-if="nos.includes('05-03-02')">
              <v-btn rounded color="success" dark @click="openAddDialog">
                添加
              </v-btn>
            </v-col>
            <v-col cols="auto" v-if="nos.includes('05-03-02')">
              <v-btn rounded color="success" dark @click="openExcelDialog">
                上传
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <procurementPlanDataTable
          :queryObject="queryObject"
          ref="procurementPlanDataTable"
        />
      </v-card-subtitle>
    </v-card>

    <v-dialog v-model="addDialog" v-if="addDialog" width="1400px" persistent>
      <procurementPlanForms :refresh="query" :closeDialog="closAddDialog" />
    </v-dialog>
    <v-dialog v-model="excelDialog" v-if="excelDialog" width="800px" persistent>
      <v-card>
        <v-card-title />
        <v-card-subtitle>
          <v-row>
            <v-col cols="4">
              <v-text-field
                label="合同编号"
                v-model="object.no"
                counter
                maxlength="50"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="客户"
                v-model="object.customer"
                counter
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-menu
                ref="startDateMenu"
                v-model="startDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="object.startDate"
                    label="申请日期"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="zh-cn"
                  scrollable
                  no-title
                  v-model="object.startDate"
                  min="1900-01-01"
                  @change="$refs.startDateMenu.save(object.startDate)"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-file-input
                accept=".xlsx,.xls"
                label="点击选择文件，文件格后缀为：.xls、.xlsx"
                v-model="excel"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            rounded
            @click="uploadExcel"
            :disabled="submitDisabled"
          >
            提交
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeExcelDialog">
            取消
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { uploadExcelToProcurementPlan } from "@/api/excel";
import procurementPlanDataTable from "@/components/procurementPlan/DataTable";
import procurementPlanForms from "@/components/procurementPlan/Forms";
export default {
  components: {
    procurementPlanDataTable,
    procurementPlanForms,
  },
  data: () => ({
    submitDisabled: false,
    nos: [],

    startDateMenu: false,

    queryObject: {
      no: "",
      type: "",
      product: "",
      specification: "",
      buyNumber: null,
      unit: "",
      description: "",
    },

    object: {
      no: null,
      customer: "",
      employeeName: "",
      startDate: "",
    },

    addDialog: false,
    excelDialog: false,

    excel: null,
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
  },
  methods: {
    getTypeItems() {
      queryProductTypes().then((res) => {
        this.typeItems = res.data;
      });
    },
    query() {
      this.$refs.procurementPlanDataTable.getObject();
    },

    openAddDialog() {
      this.addDialog = true;
    },
    closAddDialog() {
      this.addDialog = false;
    },
    openExcelDialog() {
      this.excelDialog = true;
    },
    closeExcelDialog() {
      this.submitDisabled = false;
      this.object = {};
      this.excel = null;
      this.excelDialog = false;
    },

    uploadExcel() {
      var _this = this;
      if (this.excel && this.excel != null) {
        var fromData = new FormData();
        fromData.append("file", this.excel);
        uploadExcelToProcurementPlan(fromData, this.object).then((res) => {
          _this.$message.success("上传成功！");
          _this.closeExcelDialog();
        });
      } else {
        this.$message.error("请选择文件！");
      }
    },
  },
};
</script>