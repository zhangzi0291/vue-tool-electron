<style lang="less" scoped>
.layout {
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  min-height: 100%;
  max-height: 100%;
  min-width: 720px;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  line-height: 32px;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.header {
  &-left {
    display: inline-block;
    width: 100px;
  }

  &-right {
    display: inline-block;
    padding: 0 20px;
    width: calc(100% - 100px);

    &-div {
      display: flex;
      flex-direction: row-reverse;

    }
  }


}
</style>
<template>
  <a-layout class="layout">

    <a-layout-sider :collapsed="collapsed"
                    @collapse="collapse">
      <div class="logo">
        {{ logoName }}
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark"
              @click="clickMenu">

        <template v-for="menu in menus">
          <template v-if="menu.child || !menu.data.resourceUrl ">
            <nmenu :key="menu.id" :menu="menu"></nmenu>
          </template>
          <template v-else>
            <a-menu-item :key="menu.data.resourceUrl" :title="menu.data.resourceType+''">
              <component :is="$icons[menu.data.resourceIcon]"/>
              <span>{{ menu.data.resourceName }}{{ menu.data.pid }}</span>
            </a-menu-item>
          </template>
        </template>

      </a-menu>
    </a-layout-sider>

    <a-layout>

      <a-layout-header style="background: #fff; padding: 0">
        <div>
          <span class="header-left" @click="() => (collapsed = !collapsed)">
            <menu-unfold-outlined v-if="collapsed" class="trigger"/>
            <menu-fold-outlined v-else class="trigger"/>
          </span>
          <span class="header-right">
            <div class="header-right-div">
              <a-space>
                <a-dropdown>
                  <a-avatar :src="user.iconUrl" size="large" style="border: 1px solid #fff;background-color: #66ccff">
                    <template v-if="1==1">{{ user.nickname }}</template>
                  </a-avatar>
                  <template #overlay>

                    <a-menu>
                      <a-menu-item>
                      用户名：{{ user.nickname }}
                      </a-menu-item>
                      <a-menu-divider/>
                      <a-menu-item @click="openChangeUserInfo()">
                        <a-button shape="circle" type="link">
                          个人信息
                          <template #icon>
                            <LockOutlined/>
                          </template>
                        </a-button>
                      </a-menu-item>
                    </a-menu>

                  </template>
                </a-dropdown>
              </a-space>
            </div>
          </span>
        </div>

      </a-layout-header>

      <a-layout-content
          :style="{  'overflow-x':'auto',margin: '24px 16px', padding: '24px', background: '#fff' }"
      >

        <router-view/>

      </a-layout-content>

    </a-layout>


  </a-layout>

</template>
<script lang="ts">

import {defineComponent} from "vue";
import nmenu from "@/components/n-menu.vue";


export default defineComponent({
  name: 'Index',
  components: {
    nmenu
  },
  data() {
    return {
      user:{},
      logoName: "学习中心",
      selectedKeys: ["/"],
      collapsed: true,
      menus: [{
        "id": "1",
        "pid": "-1",
        "data": {
          "id": "1",
          "resourceName": "学习中心",
          "resourceType": 1,
          "resourceUrl": "/studycentre",
          "parentId": "-1",
          "resourceIcon": "HomeOutlined",
          "resourceOrder": 0,
          "describe": ""
        },
        "child": null
      }],
      reconnectInterval: {},
    }
  },
  computed: {},

  methods: {
    clickMenu(item: any) {
      if (item.item.title == 4) {
        this.$router.push({
          path: "/iframePanel",
          query: {
            url: item.key
          }
        });
      } else if (item.item.title == 5) {
        window.open(item.key, '_blank');
      } else {
        this.$router.push(item.key);
      }
    },
    collapse(collapsed: boolean) {
      this.collapsed = collapsed
    },


  },
})
</script>