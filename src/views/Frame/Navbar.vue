<style lang="less" scoped>


.title-bar {
  user-select: none;
  position: relative;
  width: 100%;
  color: var(--text-color);
  height: var(--title-bar-height);
  background-color: var(--title-color);
  z-index: 1000;
  -webkit-app-region: drag;
}


.title-container {
  margin-left: 3px;
  height: var(--title-bar-height);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2000;
  top: 0px;
  left: 0px;
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

.title-bar-buttons {
  -webkit-app-region: no-drag;
  height: var(--title-bar-height);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  z-index: 2000;
  top: 0px;
  right: 130px;
}

.title-bar-button {
  -webkit-app-region: no-drag;
  margin-right: 12px;

  &:hover {
    cursor: pointer;
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
    <div class="title-container">
      <img class="app-icon" height="22" width="22" :src="'./logo.png'"/>
      <span class="title">Music Player v{{ version }}</span>
    </div>
    <div class="title-bar-buttons">
      <question-outlined class="title-bar-button"/>
    </div>
  </div>
</template>
<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'Navbar',
  data() {
    return {
      version: "0.1.0"
    }
  },
  methods: {},
})
</script>