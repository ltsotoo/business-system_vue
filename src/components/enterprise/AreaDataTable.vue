<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :items-per-page="5"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          rounded
          color="primary"
          dark
          @click="openAreaEditDialog(item)"
          class="mx-2"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
        <v-btn
          rounded
          color="error"
          dark
          @click="openAreaDelDialog(item.UID)"
          class="mx-2"
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="editDialog" max-width="500px" persistent v-if="editDialog">
      <areaForms
        :closeDialog="closeAreaEditDialog"
        :openType="2"
        :parentObj="editObj"
        :refresh="getObject"
      />
    </v-dialog>

    <v-dialog v-model="delDialog" max-width="500px" persistent v-if="delDialog">
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
  </div>
</template>

<script>
import { queryAreas, delArea } from "@/api/oadrp";
import areaForms from "@/components/enterprise/AreaForms";
export default {
  components: {
    areaForms,
  },
  data: () => ({
    headers: [
      {
        text: "编号",
        align: "center",
        value: "number",
        sortable: false,
      },
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
    object: [],
    editDialog: false,
    editObj: {},
    delDialog: false,
    deleteUID: "",
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject(queryObj) {
      queryAreas(queryObj).then((res) => {
        this.object = res.data;
      });
    },
    openAreaEditDialog(obj) {
      this.editObj = obj;
      this.editDialog = true;
    },
    closeAreaEditDialog() {
      this.editObj = {};
      this.editDialog = false;
    },
    openAreaDelDialog(uid) {
      this.deleteUID = uid;
      this.delDialog = true;
    },
    closeAreaDelDialog() {
      this.deleteUID = "";
      this.delDialog = false;
    },
    deleteArea() {
      delArea(this.deleteUID).then((res) => {
        this.getObject();
        this.closeAreaDelDialog();
      });
    },
  },
};
</script>