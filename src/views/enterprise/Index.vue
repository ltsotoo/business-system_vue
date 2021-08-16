<template>
  <v-container>
    <v-card >
      <v-card-subtitle>
        <v-row>
          <v-col
            cols="12"
            xl="3"
            lg="3"
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
        title: "区域",
        src: "/icon/area.png",
        url: "/enterprise/area",
      },
      {
        title: "办事处",
        src: "/icon/office.png",
        url: "/enterprise/office",
      },
      { title: "部门", src: "/icon/department.png", url: "/enterprise/department" },
      { title: "员工", src: "/icon/employee.png", url: "/enterprise/employee" },
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
    if (to.path == "/enterprise") {
      this.selectItem = null;
    }
    next();
  },
};
</script>