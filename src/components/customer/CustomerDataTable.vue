<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:item.actions>
      <v-icon small class="mr-2" @click="showItem(item)"> mdi-pencil </v-icon>
      <v-icon small> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "客户编号",
        align: "start",
        sortable: false,
        value: "customerId",
      },
      { text: "客户姓名", value: "customerName", sortable: false },
      { text: "公司", value: "companyName", sortable: false },
      { text: "课题组", value: "researchGroup", sortable: false },
      { text: "联系电话", value: "phone", sortable: false },
      { text: "微信号", value: "wxCode", sortable: false },
      { text: "电子邮箱", value: "email", sortable: false },
      { text: "区域", value: "areaId" },
      { text: "操作", value: "actions", sortable: false },
    ],
    data: [
      {
        customerId: "001",
        customerName: "客户1号",
        companyName: "公司1号",
        researchGroup: "课题组1号",
        phone: "123456789",
        wxCode: "123444444",
        email: "XXX@XXX.com",
        areaId: "1",
      },
    ],
  }),
  methods: {
    editItem(item) {},
  },
};
</script>