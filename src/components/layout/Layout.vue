  <template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="#7bbfea">
      <v-list>
        <v-list-item-group>
          <v-list-group no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  class="text-h5 text-center"
                  v-text="object.name"
                ></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item :to="userItem.settingUrl">
              <v-list-item-icon>
                <v-icon v-text="userItem.settingIcon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content> 设置 </v-list-item-content>
            </v-list-item>
            <v-list-item @click="exit">
              <v-list-item-icon>
                <v-icon v-text="userItem.exitIcon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content> 退出 </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-list rounded>
        <v-list-item-group v-model="selectedItem" color="#6b473c">
          <div>
            <v-list-item
              v-for="(item, i) in systemItems"
              :key="i"
              :to="item.url"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div>
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.url">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="blue-grey lighten-5">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="!drawer"
      ></v-app-bar-nav-icon>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    object: {
      name: "",
      email: "",
    },
    drawer: null,
    selectedItem: 0,
    userItem: {
      settingIcon: "mdi-account-edit",
      settingUrl: "/my",
      exitIcon: "mdi-run",
    },
    systemItems: [
      { title: "首页", icon: "mdi-home", url: "/index" },
      { title: "我的报销", icon: "mdi-currency-usd", url: "/myExpense" },
      { title: "合同管理", icon: "mdi-folder", url: "/contract" },
      { title: "客户管理", icon: "mdi-account-multiple", url: "/customer" },
      { title: "产品管理", icon: "mdi-cube", url: "/product" },
      { title: "供应商管理", icon: "mdi-account-group", url: "/supplier" },
      { title: "企业管理", icon: "mdi-domain", url: "/enterprise" },
      { title: "财务管理", icon: "mdi-credit-card", url: "/expense" },
    ],
    items: [],
  }),
  created() {
    this.object.name = localStorage.getItem("name");
    // this.items = JSON.parse(localStorage.getItem("urls"));
    // this.items = JSON.parse(
    //   decodeURIComponent(window.atob(localStorage.getItem("urls")))
    // );
  },
  methods: {
    exit() {
      localStorage.removeItem("name");
      localStorage.removeItem("Authorization");
      this.$router.replace("/login");
    },
  },
};
</script>