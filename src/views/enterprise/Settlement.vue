<template>
  <v-container>
    <v-card>
      <v-card-title>年度审核</v-card-title>
      <v-card-subtitle>
        <v-form ref="form">
          <div v-for="(item, i) in object" :key="i">
            <v-row align="center">
              <v-col cols="1">
                <v-text-field
                  label="名称"
                  v-model="item.name"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-form disabled>
                  <v-row>
                    <v-col cols="2">
                      <v-text-field v-model="labelOld"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="业务费用"
                        v-model="item.businessMoney"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="办事处可报销额度"
                        v-model="item.money"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="办事处冻结报销额度"
                        v-model="item.moneyCold"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="今年目标量"
                        v-model="item.taskLoad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="今年完成量"
                        v-model="item.targetLoad"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>

                <v-row>
                  <v-col cols="2">
                    <v-text-field v-model="labelNew" disabled></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="业务费用"
                      v-model.number="item.newBusinessMoney"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="办事处可报销额度"
                      v-model.number="item.newMoney"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="办事处冻结报销额度"
                      v-model.number="item.newMoneyCold"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="今年目标量"
                      v-model.number="item.newTaskLoad"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="今年完成量"
                      v-model.number="item.newTargetLoad"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="1">
                <v-btn
                  :color="item.isSubmit ? 'primary' : 'error'"
                  rounded
                  @click="submitOffice(item)"
                >
                  提交
                </v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
          <v-row>
            <v-col></v-col>
          </v-row>
          <v-row align="center">
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-btn x-large color="primary" rounded @click="openYearPlanEndDialog"> 提交 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>

    <v-dialog
      v-model="yearPlanEndDialog"
      v-if="yearPlanEndDialog"
      width="800px"
      persistent
      @click:outside="closeYearPlanEndDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定要结束年度结算吗?</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="yearPlanEnd">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeYearPlanEndDialog"
            >取消</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { queryOffices } from "@/api/oadrp";
import { editYearOffice, end } from "@/api/yearPlan";
export default {
  data: () => ({
    nos: [],

    labelOld: "去年",
    labelNew: "今年",
    object: [],

    yearPlanEndDialog: false,
  }),
  created() {
    //权限检查
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }

    if (!this.nos.includes("08-07-01")) {
      this.$router.replace("index");
    }

    this.getObject();
  },
  methods: {
    getObject() {
      queryOffices(this.queryObject).then((res) => {
        this.object = res.data;
      });
    },
    submitOffice(item) {
      editYearOffice(item).then((res) => {
        this.$message.success("办事处提交成功！");
        this.getObject();
      });
    },

    openYearPlanEndDialog() {
      this.yearPlanEndDialog = true;
    },
    closeYearPlanEndDialog() {
      this.yearPlanEndDialog = false;
    },

    yearPlanEnd() {
      end().then((res) => {
        this.closeYearPlanEndDialog();
        this.$router.replace("index");
      });
    },
  },
};
</script>