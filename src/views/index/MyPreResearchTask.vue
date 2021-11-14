<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      我的预设计任务
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
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
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <preResearchTasks
        style="margin-top: 10px"
        :queryObject="queryObject"
        ref="preResearchTasks"
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import preResearchTasks from "@/components/my/PreResearchTasks";
export default {
  components: {
    preResearchTasks,
  },
  data: () => ({
    statusItems: [
      { text: "未完成", value: 1 },
      { text: "未审核", value: 2 },
      { text: "未通过", value: 3 },
      { text: "已通过", value: 4 },
    ],
    queryObject: {
      status: 0,
    },
  }),
  methods: {
    query() {
      this.$refs.preResearchTasks.getObject();
    },
  },
};
</script>