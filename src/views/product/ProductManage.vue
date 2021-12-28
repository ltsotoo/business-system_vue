<template>
  <div>
    <v-card>
      <v-card-title>产品管理</v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-select
                v-model="queryObject.typeUID"
                :items="typeItems"
                item-text="name"
                item-value="UID"
                label="类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="产品名称"
                v-model.trim="queryObject.name"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="规格"
                v-model.trim="queryObject.specification"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn
                rounded
                color="success"
                dark
                @click="openAddDialog"
                v-if="nos.includes('05-01-02')"
              >
                添加
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <productDataTable :queryObject="queryObject" ref="productDataTable" />
      </v-card-subtitle>
    </v-card>

    <v-dialog v-model="addDialog" v-if="addDialog" width="1000px" persistent>
      <productEntryForms :refresh="query" :closeDialog="closAddDialog" />
    </v-dialog>
  </div>
</template>

<script>
import productDataTable from "@/components/product/DataTable";
import productEntryForms from "@/components/product/EntryForms";
import { queryProductTypes } from "@/api/productType";

export default {
  components: {
    productDataTable,
    productEntryForms,
  },
  data: () => ({
    nos: [],

    typeItems: [],
    queryObject: {
      typeUID: "",
      name: "",
      specification: "",
    },

    addDialog: false,
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
    this.getTypeItems();
  },
  methods: {
    getTypeItems() {
      queryProductTypes().then((res) => {
        this.typeItems = res.data;
      });
    },
    query() {
      this.$refs.productDataTable.getObject();
    },

    openAddDialog() {
      this.addDialog = true;
    },
    closAddDialog() {
      this.addDialog = false;
    },
  },
};
</script>