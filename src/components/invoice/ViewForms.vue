<template>
  <div>
    <v-card>
      <v-card-title>合同开票记录</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row v-for="(item, i) in invoiceItems" :key="i" align="center">
            <v-col cols="3">
              <v-text-field label="录入时间" v-model="item.CreatedAt" />
            </v-col>
            <v-col cols="3">
              <v-text-field label="录入员工" v-model="item.employee.name" />
            </v-col>
            <v-col cols="4" v-if="openType == 0">
              <v-text-field label="发票编号" v-model="item.code" />
            </v-col>
            <v-col cols="3" v-if="openType == 2">
              <v-text-field label="发票编号" v-model="item.code" />
            </v-col>
            <v-col cols="2">
              <v-text-field label="开票金额" v-model="item.money" />
            </v-col>
            <v-col cols="1">
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
      <editForms :openItem="openInvioce" :closeDialog="closeEditDialog"></editForms>
    </v-dialog>
  </div>
</template>

<script>
import { queryInvoices } from "@/api/invoice";
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
  },
  data: () => ({
    openInvioce: {},
    editDialog: false,

    invoiceItems: [],
  }),
  created() {
    this.getInvoiceItems();
  },
  methods: {
    getInvoiceItems() {
      queryInvoices(this.openItem.UID).then((res) => {
        this.invoiceItems = res.data;
      });
    },
    openEditDialog(item) {
      this.openInvioce = item;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openInvioce = {};
      this.editDialog = false;
    },
  },
};
</script>