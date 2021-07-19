<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    class="elevation-1"
    :server-items-length="options.total"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 20],
    }"
    :loading="options.loading"
    :options.sync="options"
    @update:page="getData"
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
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "供应商名称", value: "name", sortable: false },
      { text: "地址", value: "address", sortable: false },
      { text: "联系人姓名", value: "linkmanName", sortable: false },
      { text: "联系电话", value: "phone", sortable: false },
      { text: "微信号", value: "wxCode", sortable: false },
      { text: "电子邮箱", value: "email", sortable: false },
      { text: "操作", value: "actions", sortable: false },
    ],
    options: {
      loading: false,
      total: 100,
      page: 1,
      itemsPerPage: 5,
    },
    data: [
      {
        customerId: "001",
        name: "供应商1号",
        address: "地址1号",
        linkmanName: "联系人1号",
        phone: "123456789",
        wxCode: "123444444",
        email: "XXX@XXX.com",
      },
    ],
  }),
  methods: {
    getData() {},
    editItem(item) {},
  },
};
</script>