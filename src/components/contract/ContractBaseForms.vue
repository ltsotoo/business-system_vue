<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="object.areaId"
              item-text="text"
              item-value="value"
              :items="areaList"
              label="区域"
              required
            ></v-select
          ></v-col>
          <v-col cols="4">
            <v-select
              v-model="object.userId"
              item-text="text"
              item-value="value"
              :items="userList"
              label="业务员"
              required
            ></v-select
          ></v-col>
        </v-row>

        <v-radio-group v-model="object.customerType" row>
          <template v-slot:label>
            <div>客户类型</div>
          </template>
          <v-radio label="已录入客户" value="1"></v-radio>
          <v-radio label="未录入客户" value="2"></v-radio>
        </v-radio-group>

        <v-row align="center" v-if="object.customerType == 1">
          <v-col class="d-flex" cols="4">
            <v-select
              :items="customerCompanyList"
              label="客户单位"
              required
            ></v-select>
          </v-col>

          <v-col class="d-flex" cols="4">
            <v-select
              :items="customerResearchGroupList"
              label="客户课题组"
              required
            ></v-select>
          </v-col>

          <v-col class="d-flex" cols="4">
            <v-select
              :items="customerList"
              label="客户名称"
              required
            ></v-select>
          </v-col>
        </v-row>

        <v-row v-if="object.customerType == 2">
          <v-col cols="4">
            <v-text-field
              v-model="object.customerCompanyName"
              :counter="10"
              label="客户单位"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.customerCompanyName"
              :counter="10"
              label="客户课题组"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.customerResearchGroupName"
              label="客户名称"
              required
            ></v-text-field
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-menu
              ref="menu"
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="object.contractDeliveryDate"
                  label="合同交货日期"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="zh-cn"
                v-model="object.date"
                min="2000-01-01"
                @change="$refs.menu.save(object.date)"
              ></v-date-picker> </v-menu
          ></v-col>
          <v-col cols="4">
            <v-select
              v-model="object.signingCompanyId"
              :items="signingCompanyList"
              item-text="text"
              item-value="value"
              label="签订单位"
              required
            ></v-select
          ></v-col>
        </v-row>

        <v-radio-group v-model="object.invoiceType" row>
          <template v-slot:label>
            <div>开票类型</div>
          </template>
          <v-radio label="不开发票" value="1"></v-radio>
          <v-radio label="普票" value="2"></v-radio>
          <v-radio label="专票" value="3"></v-radio>
          <v-radio label="形式发票" value="4"></v-radio>
        </v-radio-group>

        <v-textarea
          v-if="object.invoiceType != 1"
          label="开票内容"
          v-model="object.invoiceContent"
          hint="tips"
        ></v-textarea>

        <v-radio-group v-model="object.contractType" row>
          <template v-slot:label>
            <div style="color: red">特殊合同</div>
          </template>
          <v-radio label="是" value="1"></v-radio>
          <v-radio label="否" value="2"></v-radio>
        </v-radio-group>

        <v-textarea
          label="备注"
          v-model="object.remark"
          hint="tips"
        ></v-textarea>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import productDataTable from "../product/ProductDataTable";

export default {
  props: {
    openType: {
      //0:录入 1:编辑
      type: Number,
      default: 0,
    },
    openID: {
      type: Number,
    },
    parentFun: {
      type: Function,
      default: null,
    },
  },
  components: {
    productDataTable,
  },
  data: () => ({
    valid: true,
    rules: {
      yearRules: [
        (v) => !!v || "年份必须输入",
        (v) => (v && v.length == 4) || "年份必须为4位数字",
        (v) => /[0-9]+/.test(v) || "年份必须为数字",
      ],
    },
    areaList: [],
    userList: [],
    customerCompanyList: [],
    customerResearchGroupList: [],
    customerList: [],
    signingCompanyList: [],
    dateMenu: false,
    object: {
      id: "",
      areaId: "",
      userId: "",
      customerType: "1",
      customerCompanyId: "",
      customerCompanyName: "",
      customerResearchGroupId: "",
      customerResearchGroupName: "",
      customerId: "",
      customerName: "",
      signingCompanyId: "",
      contractDeliveryDate: "",
      invoiceType: "1",
      invoiceContent: "",
      contractType: "2",
      remark: "",
    },
  }),
  created() {
    this.object.id = this.openID;
  },
  methods: {
    uploadObject() {
      this.$emit("getContractBase", this.object);
    },
  },
  computed: {},
};
</script>