<template>
  <v-container>
    <preResearch ref="preResearch" :refresh="refreshPreResearchTask" v-if="nos.includes('03-01-01')"/>
    <preResearchTask
      style="margin-top: 20px"
      ref="preResearchTask"
      :refresh="refreshPreResearch"
      v-if="nos.includes('03-02-01')"
    />
  </v-container>
</template>

<script>
import preResearch from "./preResearch.vue";
import preResearchTask from "./preResearchTask.vue";
export default {
  components: {
    preResearch,
    preResearchTask,
  },
  data: () => ({
    nos: [],
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
  methods: {
    refreshPreResearch() {
      this.$refs.preResearch.query();
    },
    refreshPreResearchTask() {
      this.$refs.preResearchTask.query();
    },
  },
};
</script>