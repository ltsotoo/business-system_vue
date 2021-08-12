<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      class="elevation-1"
      hide-default-header
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="openDeleteDialog(item.ID)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5">您确定删除该产品吗?</v-card-title>
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
import { queryDictionaries, delDictionary } from "@/api/dictionary";
export default {
  data: () => ({
    headers: [
      { text: "值", align: "center", value: "text", sortable: false },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    object: [],
    queryObject: {
      parentID: null,
      dictionaryTypeID: null,
    },
    deleteDialog: false,
    openID: null,
  }),
  methods: {
    updateQueryObject(parentID, dictionaryTypeID) {
      this.queryObject.parentID = parentID;
      this.queryObject.dictionaryTypeID = dictionaryTypeID;
      this.getObject();
    },
    getObject() {
      queryDictionaries(
        this.queryObject.parentID,
        this.queryObject.dictionaryTypeID
      ).then((res) => {
        this.object = res.data;
      });
    },
    openDeleteDialog(id) {
      this.openID = id;
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.openID = null;
      this.deleteDialog = false;
    },
    deleteItem() {
      delDictionary(this.openID).then((res) => {
        this.$message.success("删除成功！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },
  },
};
</script>