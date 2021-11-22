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
        <v-btn text color="primary" @click="openEditDialog(item)">
          <v-icon left> mdi-pencil </v-icon>
          分配办事处
        </v-btn>
        <v-btn text color="error" @click="openDelDialog(item.UID)">
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="editDialog"
      v-if="editDialog"
      width="600px"
      persistent
      @click:outside="closeEditDialog"
    >
      <areaForms
        :closeDialog="closeEditDialog"
        :openType="2"
        :parentObj="openItem"
        :refresh="getObject"
      />
    </v-dialog>

    <v-dialog
      v-model="delDialog"
      v-if="delDialog"
      width="600px"
      persistent
      @click:outside="closeDelDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定要删除该区域吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="delObject">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeDelDialog">取消</v-btn>
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
  props: {
    queryObject: {
      type: Object,
    },
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
    openItem: {},
    editDialog: false,
    delDialog: false,
    deleteUID: "",
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryAreas(this.queryObj).then((res) => {
        this.object = res.data;
      });
    },
    delObject() {
      delArea(this.deleteUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDelDialog();
      });
    },
    openEditDialog(obj) {
      this.openItem = JSON.parse(JSON.stringify(obj));
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openItem = {};
      this.editDialog = false;
    },
    openDelDialog(uid) {
      this.deleteUID = uid;
      this.delDialog = true;
    },
    closeDelDialog() {
      this.deleteUID = "";
      this.delDialog = false;
    },
  },
};
</script>