<template>
  <v-container>
    <v-row align="baseline">
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-text-field
          label="区域名称"
          clearable
          v-model="searchObj.name"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          label="办事处名称"
          clearable
          v-model="searchObj.office.name"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn rounded color="primary" dark @click="getObject"> 查询 </v-btn>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="auto">
        <v-btn rounded color="success" dark @click="openAreaAddDialog"> 录入 </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="object"
          :footer-props="{
            itemsPerPageOptions: [5, 10, 20],
          }"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="openAreaEdiDialog(item)"> mdi-pencil </v-icon>
            <v-icon @click="openAreaDelDialog(item.ID)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="addDialog" max-width="500px" persistent>
      <areaForms
        :closeDialog="closeAreaAddDialog"
        :refresh="getObject"
      />
    </v-dialog>

    <v-dialog v-model="ediDialog" max-width="500px" persistent>
      <areaForms
        :closeDialog="closeAreaEdiDialog"
        :openType="2"
        :parentObj="ediObj"
        :refresh="getObject"
      />
    </v-dialog>

    <v-dialog v-model="delDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5">您确定要删除该区域吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteArea">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeAreaDelDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { queryAreas, delArea } from "@/api/oadrp";
import areaForms from "@/components/area/Forms";
export default {
  components: {
    areaForms,
  },
  data: () => ({
    headers: [
      {
        text: "区域",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "办事处",
        align: "center",
        value: "office.name",
        sortable: false,
      },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    searchObj: {
      name: "",
      office: {
        name: "",
      },
    },
    object: [],
    addDialog: false,
    ediDialog: false,
    ediObj: {},
    delDialog: false,
    deleteID: null,
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryAreas(this.searchObj).then((res) => {
        this.object = res.data;
      });
    },
    openAreaAddDialog() {
      this.addDialog = true;
    },
    closeAreaAddDialog() {
      this.addDialog = false;
    },
    openAreaEdiDialog(obj) {
      this.ediObj = obj;
      this.ediDialog = true;
    },
    closeAreaEdiDialog() {
      this.ediObj = {};
      this.ediDialog = false;
    },
    openAreaDelDialog(id) {
      this.deleteID = id;
      this.delDialog = true;
    },
    closeAreaDelDialog() {
      this.deleteID = null;
      this.delDialog = false;
    },
    deleteArea() {
      delArea(this.deleteID).then((res) => {
        this.getObject();
        this.closeAreaDelDialog();
      });
    },
  },
};
</script>