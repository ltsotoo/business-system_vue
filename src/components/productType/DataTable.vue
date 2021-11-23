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
        <v-btn text color="error" @click="openDeleteDialog(item.UID)">
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="deleteDialog"
      v-if="deleteDialog"
      width="600px"
      persistent
      @click:outside="closeDeleteDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定删除该类型吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="deleteItem">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeDeleteDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryProductTypes, delProductType } from "@/api/productType";
export default {
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      {
        text: "名称",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "标准提成百分比",
        align: "center",
        value: "pushMoneyPercentages",
        sortable: false,
      },
      {
        text: "提成上涨百分比",
        align: "center",
        value: "pushMoneyPercentagesUp",
        sortable: false,
      },
      {
        text: "提成下降百分比",
        align: "center",
        value: "pushMoneyPercentagesDown",
        sortable: false,
      },
      {
        text: "操作",
        align: "center",
        value: "actions",
        sortable: false,
      },
    ],
    options: {
      loading: false,
      total: 0,
      page: 1,
      itemsPerPage: 10,
    },
    object: [],

    openUID: "",
    deleteDialog: false,
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryProductTypes(this.queryObject).then((res) => {
        this.object = res.data;
      });
    },

    deleteItem() {
      delProductType(this.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },

    openDeleteDialog(uid) {
      this.openUID = uid;
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.openUID = "";
      this.deleteDialog = false;
    },
  },
};
</script>