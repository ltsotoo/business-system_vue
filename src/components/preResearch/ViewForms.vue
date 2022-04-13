<template>
  <div>
    <v-card>
      <v-card-title>查看</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="object.employee.office.name"
                label="办事处"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="object.employee.name"
                label="业务员"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="object.CreatedAt"
                label="发起时间"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="object.status" label="状态"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="object.remarks"
                label="设计需求"
                auto-grow
                rows="1"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <v-card style="margin-top: 1px">
      <v-card-subtitle>
        <v-data-table
          :headers="headers"
          :items="object.preResearchTasks"
          :footer-props="{
            itemsPerPageOptions: [5, 10, 20],
          }"
        >
          <template v-slot:[`item.status`]="{ item }">
            {{ taskStatusToText(item.status) }}
          </template>
        </v-data-table>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { queryPreResearch } from "@/api/preResearch";
export default {
  props: {
    uid: {
      type: String,
    },
    statusItems: {
      type: Array,
      default: () => [],
    },
    taskStatusItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    headers: [
      {
        text: "开始时间",
        align: "center",
        value: "startDate",
        sortable: false,
      },
      {
        text: "要求完成时间",
        align: "center",
        value: "endDate",
        sortable: false,
      },
      {
        text: "实际完成时间",
        align: "center",
        value: "realEndDate",
        sortable: false,
      },
      {
        text: "技术负责人",
        align: "center",
        value: "employee.name",
        sortable: false,
      },
      {
        text: "审批人",
        align: "center",
        value: "auditor.name",
        sortable: false,
      },
      {
        text: "状态",
        align: "center",
        value: "status",
        sortable: false,
      },
    ],
    object: {
      employee: { office: {} },
      preResearchTasks: [],
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryPreResearch(this.uid).then((res) => {
        this.object = res.data;
        this.object.status = this.statusToText(this.object.status);
      });
    },
    statusToText(status) {
      var temp = "";
      this.statusItems.some((item) => {
        if (item.value == status) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
    taskStatusToText(status) {
      var temp = "";
      this.taskStatusItems.some((item) => {
        if (item.value == status) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
  },
};
</script>