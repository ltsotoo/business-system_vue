<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-select
          v-model="forms.areaId"
          item-text="text"
          item-value="value"
          :items="areaList"
          label="区域"
          required
        ></v-select>

        <v-text-field
          v-model="forms.year"
          :counter="4"
          :rules="rules.yearRules"
          label="年份"
          required
        ></v-text-field>

        <v-select
          v-model="forms.userId"
          item-text="text"
          item-value="value"
          :items="userList"
          label="业务员"
          required
        ></v-select>

        <v-radio-group v-model="forms.customerType" row>
          <template v-slot:label>
            <div>客户类型</div>
          </template>
          <v-radio label="已录入客户" value="1"></v-radio>
          <v-radio label="未录入客户" value="2"></v-radio>
        </v-radio-group>

        <v-row align="center" v-if="forms.customerType == 1">
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

        <v-text-field
          v-if="forms.customerType == 2"
          v-model="forms.customerCompanyName"
          :counter="10"
          :rules="nameRules"
          label="客户单位"
          required
        ></v-text-field>

        <v-text-field
          v-if="forms.customerType == 2"
          v-model="forms.customerCompanyName"
          :counter="10"
          :rules="nameRules"
          label="客户课题组"
          required
        ></v-text-field>

        <v-text-field
          v-if="forms.customerType == 2"
          v-model="forms.customerResearchGroupName"
          :rules="emailRules"
          label="客户名称"
          required
        ></v-text-field>

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
              v-model="forms.contractDeliveryDate"
              label="合同交货日期"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="zh-cn"
            v-model="forms.date"
            min="2000-01-01"
            @change="$refs.menu.save(forms.date)"
          ></v-date-picker>
        </v-menu>

        <v-select
          v-model="forms.signingCompanyId"
          :items="signingCompanyList"
          item-text="text"
          item-value="value"
          label="签订单位"
          required
        ></v-select>

        <v-radio-group v-model="forms.invoiceType" row>
          <template v-slot:label>
            <div>开票类型</div>
          </template>
          <v-radio label="不开发票" value="1"></v-radio>
          <v-radio label="普票" value="2"></v-radio>
          <v-radio label="专票" value="3"></v-radio>
          <v-radio label="形式发票" value="4"></v-radio>
        </v-radio-group>

        <v-textarea
          v-if="forms.invoiceType != 1"
          label="开票内容"
          v-model="forms.invoiceContent"
          hint="tips"
        ></v-textarea>

        <v-radio-group v-model="forms.contractType" row>
          <template v-slot:label>
            <div style="color: red">特殊合同</div>
          </template>
          <v-radio label="是" value="1"></v-radio>
          <v-radio label="否" value="2"></v-radio>
        </v-radio-group>

        <v-textarea
          label="备注"
          v-model="forms.remark"
          hint="tips"
        ></v-textarea>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import productDataTable from "../product/ProductDataTable";

export default {
  components: {
    productDataTable,
  },
  data: () => ({
    valid: true,
    areaList: [
      { text: "区域1", value: "1" },
      { text: "区域2", value: "2" },
      { text: "区域3", value: "3" },
      { text: "区域4", value: "4" },
      { text: "区域5", value: "5" },
    ],
    userList: [
      { text: "用户1", value: "1" },
      { text: "用户2", value: "2" },
      { text: "用户3", value: "3" },
    ],
    customerCompanyList: [
      { text: "客户公司1", value: "1" },
      { text: "客户公司2", value: "2" },
      { text: "客户公司3", value: "3" },
    ],
    customerResearchGroupList: [
      { text: "客户公司课题组1", value: "1" },
      { text: "客户公司课题组2", value: "2" },
      { text: "客户公司课题组3", value: "3" },
    ],
    customerList: [
      { text: "客户1", value: "1" },
      { text: "客户2", value: "2" },
      { text: "客户3", value: "3" },
    ],
    signingCompanyList: [
      { text: "公司1", value: "1" },
      { text: "公司2", value: "2" },
      { text: "公司3", value: "3" },
    ],
    dateMenu: false,
    forms: {
      areaId: "",
      year: "",
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
    rules: {
      yearRules: [
        (v) => !!v || "年份必须输入",
        (v) => (v && v.length == 4) || "年份必须为4位数字",
        (v) => /[0-9]+/.test(v) || "年份必须为数字",
      ],
    },
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods:{
    uploadForms(){
       this.$emit('getContractBase',this.forms)
    }
  },
  computed: {},
};
</script>