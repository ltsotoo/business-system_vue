<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-row>
          <v-col xs="6">
            <v-card class="mx-auto" outlined color="#FFB6C1" :elevation="1">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    <p>全部签约合同数</p>
                  </v-list-item-title>
                  <v-list-item-subtitle :class="[`text-h3`]">
                    <p>99</p>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="99">
                  <v-img src="/icon/contracts.png"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col xs="6">
            <v-card class="mx-auto" outlined color="#00BFFF" :elevation="1">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    <p>今年签约合同数</p>
                  </v-list-item-title>
                  <v-list-item-subtitle :class="[`text-h3`]">
                    <p>99</p>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="99">
                  <v-img src="/icon/contract.png"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col xs="6">
            <v-card class="mx-auto" outlined color="#FFA500" :elevation="1">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    <p>正在履行合同数</p>
                  </v-list-item-title>
                  <v-list-item-subtitle :class="[`text-h3`]">
                    <p>99</p>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="99">
                  <v-img src="/icon/production.png"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col xs="6">
            <v-card class="mx-auto" outlined color="green" :elevation="1">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    <p>今年完成合同数</p>
                  </v-list-item-title>
                  <v-list-item-subtitle :class="[`text-h3`]">
                    <p>99</p>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="99">
                  <v-img src="/ICON/finish.png"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {
  },
  data: () => ({}),
};
</script>