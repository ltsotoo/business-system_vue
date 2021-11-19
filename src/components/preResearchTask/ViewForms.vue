<template>
  <div>
    <v-card>
      <v-card-title>查看</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="object.startDate"
                label="开始时间"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="object.days"
                label="分配工作天数"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="object.endDate"
                label="要求完成时间"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="object.employee.name"
                label="技术负责人"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="object.statusText"
                label="状态"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="object.realEndDate"
                label="实际完成时间"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="object.requirement"
                label="设计要求"
                rows="1"
                auto-grow
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="object.remarks"
                label="技术负责人回复"
                rows="1"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    parentObj: {
      type: Object,
    },
  },
  data: () => ({
    object: {
      startDate: "",
      days: null,
      endDate: "",
      realEndDate: "",
      employee: { name: "" },
      statusText: "",
      requirement: "",
      remarks: "",
    },
  }),
  created() {
    this.object = this.parentObj;
  },
};
</script>