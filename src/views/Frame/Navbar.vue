<style lang="less" scoped>


.title-bar {
  -webkit-app-region: drag;
  user-select: none;
  position: relative;
  width: 100%;
  color: var(--text-color);
  height: var(--title-bar-height);
  background-color: var(--title-color);
  display: flex;
  align-items: center;

}

.title-logo{
  -webkit-app-region: no-drag;
  width: 22px;
  height: 22px;
  margin-left: 5px;
  margin-right: 10px;
}

.title-menu{
  -webkit-app-region: no-drag;

}

.title-container {
  margin-left: 3px;
  height: var(--title-bar-height);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.title-bar-buttons {
  -webkit-app-region: no-drag;
  height: var(--title-bar-height);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  .title-bar-button {
    -webkit-app-region: no-drag;
    height: 100%;
    line-height: var(--title-bar-height);
    padding: 0 15px;
    &:hover {
      cursor: pointer;
      background-color: #4f4f4f;
    }
  }
  .close-button {
    &:hover {
      color: #fff;
      background-color: #ff4d4f;
    }
  }
}

.title {
  margin-left: 5px;
  user-select: text;
  font-size: 18px;
  font-family: "Maven Pro", sans-serif;

  &:hover {
    cursor: text;
    color: white;
  }
}





@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.update-button:hover {
  animation: rotation 2s linear 0s infinite forwards;
}

.settings-button:hover {
  animation: rotation 5s linear 0s infinite forwards;
}
</style>
<template>
  <div class="title-bar">
    <img class="title-logo" :src="'./favicon.ico'"/>
    <div class="title-menu">
      <question-outlined class="title-bar-button"/>
      <question-outlined class="title-bar-button"/>

    </div>
    <div class="title-container">
      <span class="title">{{ title }} v{{ version }}</span>
    </div>
    <div class="title-bar-buttons">
      <minus-outlined class="title-bar-button" @click="miniWindow"/>
      <close-outlined class="title-bar-button close-button" @click="closeWindow"/>
    </div>
  </div>
</template>
<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'Navbar',
  data() {
    return {
      title: window.title,
      version: "0.1.0"
    }
  },
  methods: {
    closeWindow(){
      console.log("closewindow")
      window.ipcRenderer.send('close-window');
    },
    miniWindow(){
      console.log("miniwindow")
      window.ipcRenderer.send('minimizing-window');
    }
  },
})
</script>