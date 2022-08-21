<style lang="less" scoped>
.box {

  &-title {
    width: 100%;
    font-size: 24px;
    font-weight: bold;
  }

  &-time {
    width: 100%;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.45);

  }

  &-content {
    width: 100%;
    height: calc(100% - 100px);
  }
}

.md-box {
  height: calc(100% - 10px);
}

</style>
<template>
  <div style="height: 100%">
    <a-input class="box-title" v-model:value="title1" @change="change2" :bordered="false" placeholder="标题"/>
    <div class="box-time">{{ time1 }}</div>
    <a-divider/>
    <div class="box-content">
      <md-editor v-if="!perviewType" class="md-box" v-model="content1" @onChange="change"  />
      <md-editor v-else class="md-box" v-model="content1" @onChange="change" :previewOnly="true" />
    </div>
  </div>

</template>
<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'perview',
  data() {
    return {
      title1: "",
      content1: "",
      time1:""
    }
  },
  props: {
    title: String,
    content: String,
    time: String,
    perviewType:Boolean,
  },
  watch: {
    title(n, o) {
      this.title1 = n
    },
    content(n, o) {
      this.content1 = n
    },
    time(n, o) {
      this.time1 = n
    }
  },
  methods: {
    change(v: string) {
      if (this.title1 == "") {
        this.title1 = v.substr(0, 10)
      }
      this.update()
    },
    change2(v: string) {
      this.update()
    },
    update(){
      this.time1 = new Date().Format("yyyy-MM-dd hh:mm:ss")
      this.$emit("update", {
        tilte: this.title1,
        content: this.content1,
        time: this.time1
      })
      this.$emit("update:title", this.title1)
      this.$emit("update:content", this.content1)
      this.$emit("update:time", this.time1)
    }
  },
})
</script>