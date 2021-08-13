<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-row>
          <v-col
            cols="12"
            xl="6"
            lg="6"
            md="6"
            v-for="(item, i) in items"
            :key="i"
          >
            <v-card
              class="mx-auto"
              outlined
              :color="i == selectItem ? '#f05b72' : '#87CEEB'"
              :elevation="1"
              @click="toggle(item, i)"
            >
              <v-list-item three-line>
                <v-list-item-avatar tile size="99">
                  <v-img :src="item.src"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle :class="[`text-h3`]">
                    <p>{{ item.title }}</p>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-card style="margin-top: 20px">
      <router-view />
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: "合同设置",
        src: "/icon/contract.png",
        url: "/system/contract",
      },
      { title: "产品设置", src: "/icon/product.png", url: "/system/product" },
    ],
    selectItem: null,
  }),
  methods: {
    toggle(item, i) {
      this.selectItem = i;
      this.$router.replace(item.url);
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path == "/system") {
      this.selectItem = null;
    }
    next();
  },
};
</script>