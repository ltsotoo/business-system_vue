<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ object.name }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field label="数量" v-model="object.number"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field label="价格" v-model="object.price"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="parentFun(object)">
        添加
      </v-btn>
      <v-btn color="blue darken-1" text @click="closeFun"> 取消 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    closeFun: {
      type: Function,
      default: null,
    },
    product: {
      type: Object,
      default: null,
    },
    parentFun: {
      type: Function,
      default: null,
    },
  },
  data: () => ({
    object: {},
  }),
  created() {
    this.createTempTask();
  },
  methods: {
    createTempTask() {
      this.object.productID = this.product.ID;
      this.object.name = this.product.name;
      this.object.brand = this.product.brand;
      this.object.specification = this.product.specification;
      this.object.number = 1;
      this.object.total = this.product.number;
      this.object.unit = this.product.unit;
      this.object.price = this.product.standardPrice;
    },
  },
};
</script>

