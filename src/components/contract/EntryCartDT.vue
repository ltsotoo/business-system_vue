<template>
  <div>
    <v-data-table
      :headers="headers"
      :items.sync="objItems"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
    >
      <template v-slot:[`item.remarks`]="{ item }">
        <v-textarea
          readonly
          :value="item.remarks"
          v-if="item.remarks"
          rows="1"
          auto-grow
        ></v-textarea>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="error" @click="openRemoveDialog(item)">
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    objItems: {
      type: Array,
    },
  },
  data: () => ({
    headers: [
      {
        text: "名称",
        align: "center",
        sortable: false,
        value: "name",
      },
      { text: "购买数量", align: "center", value: "number", sortable: false },
      { text: "单位", align: "center", value: "unit", sortable: false },
      {
        text: "单价",
        align: "center",
        value: "price",
        sortable: false,
      },
      {
        text: "总价格",
        align: "center",
        value: "totalPrice",
        sortable: false,
      },
      {
        text: "非标备注",
        align: "center",
        value: "remarks",
        sortable: false,
      },
      {
        text: "操作",
        align: "center",
        value: "actions",
        sortable: false,
      },
    ],
  }),
  methods: {
    openRemoveDialog(item) {
      this.$emit("child-event", item);
    },
  },
};
</script>