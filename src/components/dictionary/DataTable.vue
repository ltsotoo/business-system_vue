<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      hide-default-header
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="openDeleteDialog(item.UID)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5">您确定删除该产品吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteItem">确定</v-btn>
          <v-btn color="primary" text @click="closeDeleteDialog">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryDictionaries, delDictionary } from "@/api/dictionary";
export default {
  data: () => ({
    headers: [
      { text: "值", align: "center", value: "text", sortable: false },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    object: [],
    queryObject: {
      parentUID: "",
      dictionaryTypeUID: "",
    },
    deleteDialog: false,
    openUID: null,
  }),
  methods: {
    updateQueryObject(parentUID, dictionaryTypeUID) {
      this.queryObject.parentUID = parentUID;
      this.queryObject.dictionaryTypeUID = dictionaryTypeUID;
      this.getObject();
    },
    getObject() {
      queryDictionaries(
        this.queryObject.parentUID,
        this.queryObject.dictionaryTypeUID
      ).then((res) => {
        this.object = res.data;
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
    deleteItem() {
      delDictionary(this.openUID).then((res) => {
        this.$message.success("删除成功！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },
  },
};
</script>