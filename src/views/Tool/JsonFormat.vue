<style lang="less" scoped>
.box {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;

  .box-right {
    flex-grow: 1;
    margin: 10px;
    max-width: 40%;
  }

  .box-left {
    flex-grow: 1;
    margin: 10px;
    max-width: 40%;
  }

  .box-tools {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .result-box {
    height: 100%;
    border: 1px solid #d9d9d9;
  }
}

.header-tools {

}

.tool-button {
  width: 100%;
}
</style>
<template>
  <div class="box">
    <div class="box-right">
      <a-textarea style="height: 100%" v-model:value="source" placeholder="待格式化JSON数据" allow-clear/>
    </div>
    <div class="box-tools">
      <a-space direction="vertical">
        <a-button class="tool-button" type="primary" size="large" @click="format">格式化</a-button>
        <a-button class="tool-button" type="primary" size="large" @click="compress">压缩</a-button>
      </a-space>
    </div>
    <div class="box-left">
      <md-editor class="result-box" :modelValue="target" previewOnly/>
    </div>
  </div>
</template>
<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'JsonFormat',
  data() {
    return {
      source: "",
      target: "",
    }
  },
  methods: {
    validate() {
      try {
        const json = eval("(" + this.source + ")")

        this.target = ""
      } catch (e) {
        this.target = "JSON格式错误"
      }
    },
    format() {
      this.validate()

      let str = JSON.stringify(eval("(" + this.source + ")"), null, "\t")
      str = "```js\n" + str + "\n```"
      this.target = str
    },
    compress() {
      this.validate()

      let str = JSON.stringify(eval("(" + this.source + ")"), null, "")
      str = "```js\n" + str + "\n```"
      this.target = str
    }
  },
})
</script>