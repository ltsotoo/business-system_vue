  
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="#7bbfea">
      <v-list>
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item> -->

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h5"> 开发者 </v-list-item-title>
            <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list rounded>
        <v-list-item-group v-model="selectedItem" color="#6b473c">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.url">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="blue-grey lighten-5">
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="!drawer"></v-app-bar-nav-icon>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    selectedItem: 0,
    items: [
      { text: "首页", icon: "mdi-folder", url: "/index" },
      { text: "合同管理", icon: "mdi-folder", url: "/contract" },
      { text: "客户管理", icon: "mdi-account-multiple", url: "/customer" },
      { text: "产品管理", icon: "mdi-star", url: "/product" },
    ],
  }),
};
</script>