<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="[`text-h4`]">
      产品子类型设置
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-select
              v-model="queryObject.typeName"
              :items="dictionaryTypeItems"
              item-text="text"
              item-value="name"
              label="类型"
              @change="queryProductTypes"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="名称"
              clearable
              v-model="queryObject.text"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="queryProductTypes">
              查询
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn rounded color="success" @click="openAddDialog" :disabled="!queryObject.typeName != ''"> 添加 </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <dictionaryDataTable
        ref="dictionaryDataTable"
        :queryObject="queryObject"
      />

      <v-dialog
        v-model="addDialog"
        max-width="500px"
        persistent
        v-if="addDialog"
        @click:outside="closeAddDialog"
      >
        <dictionaryForms
          :closeDialog="closeAddDialog"
          :refresh="queryProductTypes"
          :typeName="queryObject.typeName"
        />
      </v-dialog>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import dictionaryDataTable from "@/components/dictionary/DataTable";
import dictionaryForms from "@/components/dictionary/Forms";
export default {
  components: {
    dictionaryDataTable,
    dictionaryForms,
  },
  data: () => ({
    dictionaryTypeItems: [
      { name: "ProductSelf", text: "自研" },
      { name: "ProductThirdparty", text: "渠道" },
    ],
    queryObject: {
      typeName: "",
      text: "",
    },
    addDialog: false,
  }),
  methods: {
    queryProductTypes() {
      this.$refs.dictionaryDataTable.getObject(this.queryObject);
    },

    openAddDialog() {
      this.addDialog = true;
    },
    closeAddDialog() {
      this.addDialog = false;
    },
  },
};
</script>