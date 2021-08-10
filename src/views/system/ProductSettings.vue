<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <systemDataTable :queryObject="queryObject" />
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import systemDataTable from "@/components/system/DataTable";
import { queryDictionarieTypeGroup } from "@/api/dictionary";
export default {
  components: {
    systemDataTable,
  },
  data: () => ({
    object: [],
    queryObject: {
      parentID: -1,
      module: "product",
      name: "",
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryDictionarieTypeGroup(this.object.module).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>