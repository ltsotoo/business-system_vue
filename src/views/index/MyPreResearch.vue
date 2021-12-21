<template>
  <v-card>
    <v-card-title>我发起的预设计</v-card-title>
    <v-card-subtitle>
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
        :statusItems="statusItems"
        ref="preResearchs"
      />

      <v-dialog v-model="createDialog" width="1000px" persistent>
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
            <v-btn
              color="primary"
              rounded
              @click="create"
              :disabled="submitDisabled"
            >
              提交
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" rounded @click="closeCreateDialog">
              取消
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { createPreResearch } from "@/api/preResearch";
import { queryPreResearchStatus } from "@/api/dictionary";
import preResearchs from "@/components/my/PreResearchs";
export default {
  components: {
    preResearchs,
  },
  data: () => ({
    submitDisabled: false,
    rules: {
      must: [(v) => !!v || "必填项"],
    },
    statusItems: [],
    queryObject: {
      status: 0,
    },
    remarks: "",
    createDialog: false,
  }),
  created() {
    this.getStatusItems();
  },
  methods: {
    getStatusItems() {
      queryPreResearchStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    query() {
      this.$refs.preResearchs.getObject();
    },
    create() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        createPreResearch({ remarks: this.remarks }).then((res) => {
          this.$message.success("录入成功");
          this.query();
          this.closeCreateDialog();
        });
      } else {
        this.submitDisabled = false;
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