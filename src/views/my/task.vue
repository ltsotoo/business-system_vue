<template>
  <!-- 任务 -->
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="2">
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
      </v-card-subtitle>
    </v-card>
    <tasks style="margin-top: 10px" :queryObject="queryObject" ref="tasks" />
  </v-container>
</template>

<script>
import tasks from "@/components/my/Tasks";
export default {
  components: {
    tasks,
  },
  data: () => ({
    statusItems: [
      { text: "待设计", value: 1 },
      { text: "待采购", value: 2 },
      { text: "待入/出库", value: 3 },
      { text: "待装配", value: 4 },
      { text: "待发货", value: 5 },
      { text: "已发货", value: 6 },
    ],
    queryObject: {
      status: 0,
    },
  }),
  methods: {
    query() {
      this.$refs.tasks.getObject();
    },
  },
};
</script>