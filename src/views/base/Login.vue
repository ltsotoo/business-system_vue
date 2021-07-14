<template>
  <v-container fill-height>
    <v-row no-gutters align="center" justify="center">
      <v-col align="center" cols="4">
        <v-card min-width="400px" min-height="400px" :elevation="10">
          <v-card-title>
            <v-row no-gutters justify="center">
              <v-col>
                <v-toolbar-title
                  :class="[`text-h4`, active && `mb-${margin}`]"
                  >中研环科管理系统</v-toolbar-title
                >
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-subtitle>
            <v-form>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="firstname"
                      :counter="10"
                      label="手机号"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="firstname"
                      :counter="10"
                      label="密码"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      v-model="firstname"
                      :counter="10"
                      label="验证码"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-img
                      :aspect-ratio="4 / 1"
                      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                    ></v-img>
                  </v-col>
                </v-row>
                <v-row no-gutters justify="center">
                  <v-col cols="2" align="center">
                    <v-btn block @click="getImageCode"> 登录 </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {getImgCode} from "../../api/base"

export default {
  methods:{
    getImageCode(){
      getImgCode().then(res => {

      })
    }
  }
};
</script>