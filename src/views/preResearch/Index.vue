<template>
  <v-container>
    <preResearch ref="preResearch" :refresh="refreshPreResearchTask"/>
    <preResearchTask
      style="margin-top: 20px"
      ref="preResearchTask"
      :refresh="refreshPreResearch"
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