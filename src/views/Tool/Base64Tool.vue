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
</style>
<template>
  <div class="box">
    <div class="box-right">
      <a-typography-title>图片转BASE64</a-typography-title>
      <a-typography-title>文本BASE64互转</a-typography-title>
      <upload-image @imageChange="imageChange"></upload-image>
      <a-textarea style="height: calc(100% - 280px)" v-model:value="source" placeholder="待处理数据" allow-clear/>
    </div>
    <div class="box-tools">
      <a-space direction="vertical">
        <a-button class="tool-button" type="primary" size="large" @click="encode">编码</a-button>
        <a-button class="tool-button" type="primary" size="large" @click="decode">解码</a-button>
      </a-space>
    </div>
    <div class="box-left">
      <md-editor class="result-box" :modelValue="target" previewOnly/>
    </div>
  </div>
</template>
<script lang="ts">

import {defineComponent} from "vue";
import UploadImage from "@/components/UploadImage.vue";

export default defineComponent({
  name: 'Base64Tool',
  components: {
    UploadImage
  },
  data() {
    return {
      source: "",
      target: "",
    }
  },
  methods: {
    imageChange(fileList: any, key: any) {
      this.blobToDataURL(fileList[0].originFileObj)
    },
    blobToDataURL(blob:any) {
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (evt) => {
        const str = "> " + reader.result  + " "
        this.target = str
      };
    },
    encode(){
      const code = window.btoa(window.encodeURIComponent(this.source));
      this.target = code
    },
    decode(){
      const code = window.decodeURIComponent(window.atob(this.source));
      this.target = code
    }
  },
  created() {

  }
})
</script>