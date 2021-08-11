<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-subtitle>
            <v-form ref="form">
              <v-row align="baseline">
                <v-spacer></v-spacer>
                <v-col cols="3">
                  <v-select
                    v-model="queryObject"
                    :items="dictionarieItems"
                    item-text="text"
                    label="options"
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    rounded
                    color="primary"
                    @click="getDictionaries"
                    :disabled="searchBtnDisable"
                  >
                    查询
                  </v-btn>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="auto">
                  <v-btn
                    rounded
                    color="green"
                    @click="openAddDialog"
                    :disabled="addBtnDisable"
                  >
                    添加
                  </v-btn>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-form>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <dictionaryDataTable :queryObject="queryObject" ref="systemDataTable" />
      </v-col>
    </v-row>

    <v-dialog v-model="addDialog" max-width="400px" persistent v-if="addDialog">
      <dictionaryForms
        :closeDialog="closeAddDialog"
        :parentFun="addDic"
        :parentObj="queryObject"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import dictionaryDataTable from "@/components/dictionary/DataTable";
import dictionaryForms from "@/components/dictionary/Forms";
import { QueryDictionaryTypes, createDictionary } from "@/api/dictionary";
export default {
  components: {
    dictionaryDataTable,
    dictionaryForms,
  },
  data: () => ({
    searchBtnDisable: true,
    addBtnDisable: true,
    dictionarieItems: [],
    addDialog: false,
    queryObject: {
      ID: null,
      module: "product",
    },
  }),
  created() {
    this.getDictionarieItems();
  },
  methods: {
    getDictionarieItems() {
      QueryDictionaryTypes(this.queryObject.module).then((res) => {
        this.dictionarieItems = res.data;
      });
    },
    getDictionaries() {
      this.$refs.systemDataTable.getObject();
    },
    openAddDialog() {
      this.addDialog = true;
    },
    closeAddDialog() {
      this.addDialog = false;
    },
    addDic(object) {
      createDictionary(object).then((res) => {
        this.$message.success("录入成功了！");
      });
      return true;
    },
  },
  watch: {
    "queryObject.ID": {
      handler: function (val) {
        if (val && val != 0) {
          this.searchBtnDisable = false;
          this.addBtnDisable = false;
        }
      },
    },
  },
};
</script>