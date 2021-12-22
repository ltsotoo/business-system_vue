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
        <preResearchTaskDataTable :openType="1" />
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { queryPreResearch } from "@/api/preResearch";
import preResearchTaskDataTable from "@/components/preResearchTask/DataTable";
export default {
  components: {
    preResearchTaskDataTable,
  },
  props: {
    uid: {
      type: String,
    },
    statusItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    object: {
      employee: { office: {} },
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      var _this = this;
      queryPreResearch(this.uid).then((res) => {
        this.object = res.data;
        this.object.status = _this.statusToText(this.object.status);
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
  },
};
</script>