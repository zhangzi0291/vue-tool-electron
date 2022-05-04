<style lang="less" scoped>
.app-flow {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.app-box {
  position: relative;
  width: 250px;
  margin: 20px;

  .app-image {
    width: 100%;
    height: 200px;
  }

  .app-title {
    font-weight: bold;
    text-align: center;
  }
}
</style>
<template>
  <div class="app-flow" style="padding: 30px">
    <a-card class="app-box" hoverable v-for="item in app" :key="item.title">
      <div @click="openApp(item.url)">
        <img class="app-image" v-if="item.img"
             alt="example"
             :src="item.img"
        />
        <img class="app-image" v-else
             alt="example"
             :src="'./APP应用.png'"
        />
        <div class="app-title">
          {{ item.title }}
        </div>
      </div>
<!--      <template #actions>-->
<!--        <a-tooltip>-->
<!--          <template #title>setting</template>-->
<!--          <setting-outlined key="setting"/>-->
<!--        </a-tooltip>-->
<!--        <a-tooltip>-->
<!--          <template #title>edit</template>-->
<!--          <edit-outlined key="edit"/>-->
<!--        </a-tooltip>-->
<!--      </template>-->
    </a-card>
  </div>
</template>
<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'AppHome',
  data() {
    return {
      app: [
        {url: "/JsonFormat", title: "JSON格式化"},
        {url: "/Base64Tool", title: "BASE64工具"},

      ]
    }
  },
  methods: {
    openApp(url:string){
      this.$router.push({
        path: url,
      });
    }
  },
})
</script>