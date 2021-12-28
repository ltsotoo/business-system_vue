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
          text
          color="primary"
          @click="openEditNameDialog(item)"
          v-if="nos.includes('08-01-03')"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
        <!-- <v-btn
          text
          color="error"
          @click="openDelDialog(item.UID)"
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn> -->
      </template>
    </v-data-table>

    <v-dialog
      v-model="editNameDialog"
      v-if="editNameDialog"
      width="600px"
      persistent
      @click:outside="closeEditNameDialog"
    >
      <officeFormsEdit
        :closeDialog="closeEditNameDialog"
        :refresh="getObject"
        :openUID="openUID"
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
        <v-card-title class="text-h5"
          >您确定要删除该公司(办事处)吗?</v-card-title
        >
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
import officeFormsEdit from "./OfficeFormsEdit";
export default {
  components: {
    officeFormsEdit,
  },
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    nos: [],

    headers: [
      {
        text: "公司(办事处)编号",
        align: "center",
        value: "number",
        sortable: false,
      },
      {
        text: "公司(办事处)名称",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "可用业务费用金额(元)",
        align: "center",
        value: "businessMoney",
        sortable: false,
      },
      {
        text: "可提成金额(元)",
        align: "center",
        value: "money",
        sortable: false,
      },
      {
        text: "年底提成金额(元)",
        align: "center",
        value: "moneyCold",
        sortable: false,
      },
      {
        text: "今年目标量(元)",
        align: "center",
        value: "taskLoad",
        sortable: false,
      },
      {
        text: "今年完成量(元)",
        align: "center",
        value: "targetLoad",
        sortable: false,
      },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    object: [],
    openUID: "",
    delDialog: false,
    editNameDialog: false,
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
    this.getObject();
  },
  methods: {
    getObject() {
      queryOffices(this.queryObject).then((res) => {
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
      this.openUID = item.UID;
      this.editNameDialog = true;
    },
    closeEditNameDialog() {
      this.openUID = "";
      this.editNameDialog = false;
    },
  },
};
</script>