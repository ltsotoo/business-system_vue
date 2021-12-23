<template>
  <v-card>
    <v-card-title>办事处排行榜</v-card-title>
    <v-card-subtitle>
      <v-form readonly>
        <div v-for="(item, i) in object" :key="i">
          <v-row v-if="i % 4 == 0">
            <v-col cols="3" v-if="object[i]">
              <v-card :color="object[i].finalPercentages > 1 ? 'red' : null">
                <v-card-title>{{ i + 1 }}:{{ object[i].name }}</v-card-title>
                <v-card-subtitle>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="完成百分比(%)"
                        v-model="object[i].finalPercentages"
                      >
                      </v-text-field>
                      <v-text-field
                        label="完成任务量(元)"
                        v-model="object[i].targetLoad"
                      >
                      </v-text-field>
                      <v-text-field
                        label="目标任务量(元)"
                        v-model="object[i].taskLoad"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="3" v-if="object[i + 1]">
              <v-card
                :color="object[i + 1].finalPercentages > 1 ? 'red' : null"
              >
                <v-card-title
                  >{{ i + 2 }}:{{ object[i + 1].name }}</v-card-title
                >
                <v-card-subtitle>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="完成百分比(%)"
                        v-model="object[i + 1].finalPercentages"
                      >
                      </v-text-field>
                      <v-text-field
                        label="目标任务量(元)"
                        v-model="object[i + 1].taskLoad"
                      >
                      </v-text-field>
                      <v-text-field
                        label="完成任务量(元)"
                        v-model="object[i + 1].targetLoad"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="3" v-if="object[i + 2]">
              <v-card
                :color="object[i + 2].finalPercentages > 1 ? 'red' : null"
              >
                <v-card-title
                  >{{ i + 3 }}:{{ object[i + 2].name }}</v-card-title
                >
                <v-card-subtitle>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="完成百分比(%)"
                        v-model="object[i + 2].finalPercentages"
                      >
                      </v-text-field>
                      <v-text-field
                        label="目标任务量(元)"
                        v-model="object[i + 2].taskLoad"
                      >
                      </v-text-field>
                      <v-text-field
                        label="完成任务量(元)"
                        v-model="object[i + 2].targetLoad"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="3" v-if="object[i + 3]">
              <v-card
                :color="object[i + 3].finalPercentages > 1 ? 'red' : null"
              >
                <v-card-title
                  >{{ i + 4 }}:{{ object[i + 3].name }}</v-card-title
                >
                <v-card-subtitle>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="完成百分比(%)"
                        v-model="object[i + 3].finalPercentages"
                      >
                      </v-text-field>
                      <v-text-field
                        label="目标任务量(元)"
                        v-model="object[i + 3].taskLoad"
                      >
                      </v-text-field>
                      <v-text-field
                        label="完成任务量(元)"
                        v-model="object[i + 3].targetLoad"
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
export default {
  data: () => ({
    object: [],
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      topList().then((res) => {
        this.object = res.data;
      });
    },
  },
};
</script>