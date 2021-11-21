<template>
  <div>
    <v-card>
      <v-card-title>合同回款详情</v-card-title>
      <v-card-subtitle>
        <v-row v-for="(item, i) in parentObject" :key="i" align="center">
          <v-col cols="2">
            <v-text-field
              label="时间"
              readonly
              v-model.number="item.CreatedAt"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="回款金额(元)"
              readonly
              v-model.number="item.money"
            ></v-text-field>
          </v-col>
          <v-col cols="8" v-if="openType != 2">
            <v-textarea
              label="备注"
              readonly
              auto-grow
              rows="1"
              v-model="item.remarks"
            ></v-textarea>
          </v-col>
          <v-col cols="6" v-if="openType == 2">
            <v-textarea
              label="备注"
              readonly
              auto-grow
              rows="1"
              v-model="item.remarks"
            ></v-textarea>
          </v-col>
          <v-col cols="2" v-if="openType == 2">
            <v-btn x-large color="primary" @click="openEditDialog(item)">
              编辑
            </v-btn>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>

    <v-dialog
      v-model="editDialog"
      v-if="editDialog"
      width="800px"
      persistent
      @click:outside="closeEditDialog"
    >
      <edit :parentObject="openItem" :closeDialog="closeEditDialog"></edit>
    </v-dialog>
  </div>
</template>

<script>
import edit from "./Edit.vue";
export default {
  components: {
    edit,
  },
  props: {
    parentObject: {},
    openType: {
      type: Number,
      default: 0,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    openItem: {},
    editDialog: false,
  }),
  methods: {
    openEditDialog(item) {
      this.openItem = item;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openItem = {};
      this.editDialog = false;
    },
  },
};
</script>