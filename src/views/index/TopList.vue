<template>
  <v-card>
    <v-card-title>办事处排行榜</v-card-title>
    <v-card-subtitle>
      <v-form readonly>
        <div v-for="(item, i) in object" :key="i">
          <v-row v-if="i % 4 == 0">
            <v-col cols="3" v-if="object[i]">
              <v-card :color="compareColor(object[i])">
                <v-card-title>{{ i + 1 }}:{{ object[i].name }}</v-card-title>
                <v-card-subtitle>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        label="完成百分比"
                        v-model="object[i].finalPercentages"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="完成任务量"
                        v-model="object[i].targetLoad"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="目标任务量"
                        v-model="object[i].taskLoad"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="剩余回款量"
                        v-model="object[i].notPayment"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="3" v-if="object[i + 1]">
              <v-card :color="compareColor(object[i + 1])">
                <v-card-title
                  >{{ i + 2 }}:{{ object[i + 1].name }}</v-card-title
                >
                <v-card-subtitle>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        label="完成百分比"
                        v-model="object[i + 1].finalPercentages"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="完成任务量"
                        v-model="object[i + 1].targetLoad"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="目标任务量"
                        v-model="object[i + 1].taskLoad"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="剩余回款量"
                        v-model="object[i + 1].notPayment"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="3" v-if="object[i + 2]">
              <v-card :color="compareColor(object[i + 2])">
                <v-card-title
                  >{{ i + 3 }}:{{ object[i + 2].name }}</v-card-title
                >
                <v-card-subtitle>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        label="完成百分比"
                        v-model="object[i + 2].finalPercentages"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="完成任务量"
                        v-model="object[i + 2].targetLoad"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="目标任务量"
                        v-model="object[i + 2].taskLoad"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="剩余回款量"
                        v-model="object[i + 2].notPayment"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="3" v-if="object[i + 3]">
              <v-card :color="compareColor(object[i + 3])">
                <v-card-title
                  >{{ i + 4 }}:{{ object[i + 3].name }}</v-card-title
                >
                <v-card-subtitle>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        label="完成百分比"
                        v-model="object[i + 3].finalPercentages"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="完成任务量"
                        v-model="object[i + 3].targetLoad"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="目标任务量"
                        v-model="object[i + 3].taskLoad"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="剩余回款量"
                        v-model="object[i + 3].notPayment"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { topList } from "@/api/oadrp";
import { queryMonthPlans } from "@/api/monthPlan";
export default {
  data: () => ({
    object: [],
    month: 0,
    monthPlan: {
      no: 0,
      value: 0,
    },
  }),
  created() {
    this.month = new Date().getMonth() + 1;
    this.getMonthPlanItems();
    this.getObject();
  },
  methods: {
    getObject() {
      topList().then((res) => {
        this.object = res.data;
      });
    },
    getMonthPlanItems() {
      queryMonthPlans().then((res) => {
        res.data.forEach((item) => {
          if (item.no == this.month) {
            this.monthPlan = item;
            console.log(item);
          }
        });
      });
    },
    compareColor(office) {
      if (
        this.monthPlan.value == 0 ||
        office.finalPercentages >= this.monthPlan.value
      ) {
        return "green";
      } else {
        return "red";
      }
    },
  },
};
</script>