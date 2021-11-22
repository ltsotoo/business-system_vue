<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          text
          color="error"
          @click="openDeleteDialog(item.UID)"
          class="mx-2"
          disabled
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="deleteDialog"
      width="600px"
      persistent
      @click:outside="closeDeleteDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定删除吗?</v-card-title>
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
import { delDictionary } from "@/api/dictionary";
import { queryDictionaries } from "@/api/dictionary";
export default {
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      { text: "名称", align: "center", value: "text", sortable: false },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    object: [],
    deleteDialog: false,
    openUID: null,
  }),
  created() {
    if (this.queryObject.typeName != "") {
      this.getObject();
    }
  },
  methods: {
    getObject() {
      queryDictionaries(this.queryObject.typeName, this.queryObject.text).then(
        (res) => {
          this.object = res.data;
        }
      );
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