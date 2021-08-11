<template>
  <v-card>
    <v-card-subtitle>
      <v-form>
        <v-row align="center">
          <v-col cols="12" v-if="parentObj.parentID > 0">
            <v-select
              v-model="object.parentID"
              :items="parentItems"
              item-text="text"
              item-value="ID"
              label="父类"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model.trim="object.text" label="名称">
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="add"> 添加 </v-btn>
        <v-btn color="blue darken-1" text @click="closeDialog"> 取消 </v-btn>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    parentObj: {
      type: Object,
    },
    parentFun: {
      type: Function,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    parentItems: [],
    object: {
      parentID: null,
      dictionaryTypeID: 0,
      text: "",
    },
  }),
  created() {
    this.object.dictionaryTypeID = this.parentObj.ID;
    if (this.parentObj.parentID > 0) {
      this.getParentItems();
    }
  },
  methods: {
    getParentItems() {},
    add() {
      this.parentFun(this.object);
    },
  },
};
</script>