<template>
  <div>
    <v-card>
      <v-card-title>预存款合同回款详情</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <div v-for="(item, i) in object" :key="i">
            <v-row align="center">
              <v-col cols="4">
                <v-text-field label="回款时间" v-model="item.paymentDate" />
              </v-col>
              <v-col cols="3">
                <v-text-field label="录入员工" v-model="item.employee.name" />
              </v-col>
              <v-col cols="3">
                <v-text-field label="回款金额(CNY)" v-model="item.money" />
              </v-col>
              <v-col cols="2">
                <v-btn
                  color="primary"
                  @click="openEditDialog(item)"
                  v-if="openType == 2"
                >
                  <v-icon left> mdi-pencil </v-icon>
                  编辑
                </v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </v-form>
      </v-card-subtitle>
    </v-card>

    <v-dialog
      v-model="editDialog"
      v-if="editDialog"
      width="800px"
      persistent
      @click:outside="closeEditDialog"
    >
      <editForms
        :openItem="openPayment"
        :refresh="refresh"
        :closeDialog="closeEditDialog"
        :closeAllDialog="closeDialog"
      ></editForms>
    </v-dialog>
  </div>
</template>

<script>
import { queryPrePayments } from "@/api/payment";
import editForms from "./EditForms";
export default {
  components: {
    editForms,
  },
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    openItem: {
      type: Object,
    },
    refresh: {
      type: Function,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    openPayment: {},
    editDialog: false,
    object: [],
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryPrePayments(this.openItem.UID).then((res) => {
        this.object = res.data;
      });
    },
    openEditDialog(item) {
      this.openPayment = item;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openPayment = {};
      this.editDialog = false;
    },
  },
};
</script>