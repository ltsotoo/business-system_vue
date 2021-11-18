<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      我发起的预设计
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form>
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="4">
            <v-select
              v-model="queryObject.status"
              :items="statusItems"
              item-text="text"
              item-value="value"
              label="状态"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" dark @click="openCreateDialog">
              发起
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <preResearchs
        style="margin-top: 10px"
        :queryObject="queryObject"
        ref="preResearchs"
      />

      <v-dialog v-model="createDialog" max-width="800px" persistent>
        <v-card>
          <v-card-title>发起预设计</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-textarea
                  label="设计需求"
                  auto-grow
                  rows="9"
                  v-model="remarks"
                  :rules="rules.must"
                  counter
                  maxlength="500"
                ></v-textarea>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="create"> 提交 </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeCreateDialog">
              取消
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { createPreResearch } from "@/api/preResearch";
import preResearchs from "@/components/my/PreResearchs";
export default {
  components: {
    preResearchs,
  },
  data: () => ({
    rules: {
      must: [(v) => !!v || "必填项！"],
    },
    statusItems: [
      { text: "驳回", value: -1 },
      { text: "未审批", value: 1 },
      { text: "未完成", value: 2 },
      { text: "已完成", value: 3 },
    ],
    queryObject: {
      status: 0,
    },
    remarks: "",
    createDialog: false,
  }),
  methods: {
    query() {
      this.$refs.preResearchs.getObject();
    },
    create() {
      var _this = this;
      if (this.validateForm()) {
        createPreResearch({ remarks: this.remarks }).then((res) => {
          this.$message.success("录入成功");
          _this.query();
          _this.closeCreateDialog();
        });
      }
    },
    openCreateDialog() {
      this.createDialog = true;
    },
    closeCreateDialog() {
      this.createDialog = false;
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>