<template>
  <div>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field v-model="titles[0]" readonly></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field v-model="titles[1]" readonly></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field v-model="titles[2]" readonly></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-for="(item, i) in object" :key="i">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field v-model="item.name" readonly></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field v-model="item.money" readonly></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field v-model="item.money"></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import { queryOffices } from "@/api/oadrp";
import Tasks from "../my/Tasks.vue";
export default {
  components: { Tasks },
  data: () => ({
    object: [],
    titles: ["名称", "余额", "下一年起始额度"],
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryOffices().then((res) => {
        this.object = res.data;
      });
    },
  },
};
</script>