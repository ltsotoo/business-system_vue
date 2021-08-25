<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card  :elevation=0>
          <v-card-subtitle>
            <v-form ref="form">
              <v-row align="baseline">
                <v-spacer></v-spacer>
                <v-col cols="3">
                  <v-select
                    v-model="dictionaryType"
                    :items="dictionaryTypeItems"
                    item-text="text"
                    label="DicType"
                    return-object
                    @change="changeDictionaryType(dictionaryType)"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="dictionary"
                    :items="dictionartItems"
                    item-text="text"
                    return-object
                    label="Dic"
                    @change="changeDictionary(dictionary)"
                    :disabled="dictionartItems.length == 0"
                  ></v-select>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    rounded
                    color="success"
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
        <dictionaryDataTable ref="systemDataTable" />
      </v-col>
    </v-row>

    <v-dialog v-model="addDialog" max-width="400px" persistent v-if="addDialog">
      <dictionaryForms
        :closeDialog="closeAddDialog"
        :parentObj="{
          parentUID: dictionary.UID,
          dictionaryTypeUID: dictionaryType.UID,
        }"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import dictionaryDataTable from "@/components/dictionary/DataTable";
import dictionaryForms from "@/components/dictionary/Forms";
import { queryDictionaryTypes, queryDictionaries } from "@/api/dictionary";
export default {
  components: {
    dictionaryDataTable,
    dictionaryForms,
  },
  data: () => ({
    addBtnDisable: true,
    dictionaryTypeItems: [],
    dictionartItems: [],
    addDialog: false,
    dictionaryType: {
      UID: "",
      module: "product",
    },
    dictionary: {
      UID: "",
      text: "",
    },
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      queryDictionaryTypes(this.dictionaryType.module).then((res) => {
        this.dictionaryTypeItems = res.data;
        if (this.dictionaryTypeItems.length > 0) {
          this.dictionaryType = this.dictionaryTypeItems[0];
          this.changeDictionaryType(this.dictionaryType);
        }
      });
    },
    getDictionaryTypeItems() {
      queryDictionaryTypes(this.dictionaryType.module).then((res) => {
        this.dictionaryTypeItems = res.data;
      });
    },
    getDictionartItems(parentUID) {
      queryDictionaries(null, parentUID).then((res) => {
        this.dictionartItems = res.data;
        if (this.dictionartItems.length > 0) {
          this.dictionary = this.dictionartItems[0];
          this.changeDictionary(this.dictionary);
        }
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
      this.$refs.systemDataTable.getObject();
    },
    changeDictionaryType(dictionaryType) {
      this.$refs.systemDataTable.object = [];
      this.dictionartItems = [];
      this.dictionary = {};
      if (dictionaryType.parentUID == "") {
        this.$refs.systemDataTable.updateQueryObject(null, dictionaryType.UID);
      } else {
        this.getDictionartItems(dictionaryType.parentUID);
      }
    },
    changeDictionary(dictionary) {
      this.$refs.systemDataTable.object = [];
      this.$refs.systemDataTable.updateQueryObject(dictionary.UID, null);
    },
  },
  watch: {
    "dictionaryType.ID": {
      handler: function (val) {
        if (val && val != 0) {
          this.addBtnDisable = false;
        }
      },
    },
  },
};
</script>