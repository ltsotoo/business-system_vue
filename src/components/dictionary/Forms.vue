<template>
  <v-card>
    <v-card-subtitle>
      <v-form>
        <v-row align="center">
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
import { createDictionary } from "@/api/dictionary";
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
    object: {
      parentID: null,
      dictionaryTypeID: 0,
      text: "",
    },
  }),
  created() {
    this.object = this.parentObj;
  },
  methods: {
    add() {
      createDictionary(this.object).then((res) => {
        this.$message.success("录入成功了！");
        this.closeDialog();
      });
    },
  },
};
</script>