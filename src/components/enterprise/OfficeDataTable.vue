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
        <v-btn text color="primary" @click="openEditNameDialog(item)">
          <v-icon left> mdi-pencil </v-icon>
          名称编辑
        </v-btn>
        <v-btn
          text
          color="error"
          @click="openDelDialog(item.UID)"
          dark
          disabled
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="editNameDialog"
      v-if="editNameDialog"
      width="600px"
      persistent
      @click:outside="closeEditNameDialog"
    >
      <officeForms
        :openType="2"
        :closeDialog="closeEditNameDialog"
        :refresh="getObject"
        :parentObj="openItem"
      />
    </v-dialog>

    <v-dialog
      v-model="delDialog"
      v-if="delDialog"
      width="500px"
      persistent
      @click:outside="closeDelDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定要删除该办事处吗?</v-card-title>
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
import { queryOffices, delOffice } from "@/api/oadrp";
import officeForms from "./OfficeForms";
export default {
  components: {
    officeForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      {
        text: "办事处名称",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "余额(元)",
        align: "center",
        value: "money",
        sortable: false,
      },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    object: [],
    openUID: "",
    openItem: "",
    delDialog: false,
    editNameDialog: false,
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryOffices(this.queryObj).then((res) => {
        this.object = res.data;
      });
    },
    delObject() {
      delOffice(this.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDelDialog();
      });
    },

    openDelDialog(uid) {
      this.openUID = uid;
      this.delDialog = true;
    },
    closeDelDialog() {
      this.openUID = "";
      this.delDialog = false;
    },

    openEditNameDialog(item) {
      this.openItem = JSON.parse(JSON.stringify(item));
      this.editNameDialog = true;
    },
    closeEditNameDialog() {
      this.openItem = {};
      this.editNameDialog = false;
    },
  },
};
</script>