<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-subtitle>
            <v-row align="baseline">
              <v-col cols="7">
                <v-text-field label="名称" v-model="office.text" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn rounded color="primary" dark @click="getOfficeItems">
                  查询
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <!-- <v-col cols="2">
                <v-btn rounded color="green" dark> 添加 </v-btn>
              </v-col> -->
            </v-row>
            <v-row>
              <v-data-table
                :headers="office.headers"
                :items="office.items"
                :items-per-page="10"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon> mdi-magnify </v-icon>
                  <v-icon> mdi-delete </v-icon>
                </template>
              </v-data-table>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="4"></v-col>
      <v-col cols="4"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { queryOffices } from "@/api/oadrp";
export default {
  data: () => ({
    office: {
      headers: [
        {
          text: "办事处",
          align: "center",
          value: "name",
          sortable: false,
        },
        { text: "操作", align: "center", value: "actions", sortable: false },
      ],
      text: [],
      items: [],
    },
  }),
  created() {
    this.getOfficeItems();
  },
  methods: {
    getOfficeItems() {
      queryOffices(this.office.text).then((res) => {
        this.office.items = res.data;
      });
    },
  },
};
</script>