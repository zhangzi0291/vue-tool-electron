<style lang="less">
.img {
  width: 100%;
}
</style>
<template>
  <a-modal v-model:visible="visible" title="模型评估" @ok="handleOk">

    <template v-if="node.data!=undefined && node.data.label=='MCTS算法'">
      <a-row type="flex" justify="space-around" :gutter="gutter">
        <a-col :span="7">
          <a-space direction="vertical">
            <div>支持度</div>
            <div>89.51%</div>
          </a-space>
        </a-col>
        <a-col :span="7">
          <a-space direction="vertical">
            <div>准确率</div>
            <div>82.37%</div>
          </a-space>
        </a-col>
        <a-col :span="7">
          <a-space direction="vertical">
            <div>问题类型</div>
            <div>5G低用户下行速率</div>
          </a-space>
        </a-col>
      </a-row>
      <a-row :gutter="gutter">
        <a-col :span="24">
          <div>模型</div>
          <a-image class="img" :src="img.modal" />

        </a-col>
      </a-row>
    </template>

    <template v-else>
      <a-row type="flex" justify="space-around" :gutter="gutter">
        <a-col :span="5">
          <a-space direction="vertical">
            <div>真阳性</div>
            <div>1148</div>
          </a-space>
        </a-col>
        <a-col :span="5">
          <a-space direction="vertical">
            <div>伪阴性</div>
            <div>653</div>
          </a-space>
        </a-col>
        <a-col :span="5">
          <a-space direction="vertical">
            <div>准确率</div>
            <div>0.788</div>
          </a-space>
        </a-col>
        <a-col :span="5">
          <a-space direction="vertical">
            <div>精确率</div>
            <div>0.830</div>
          </a-space>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" :gutter="gutter">
        <a-col :span="5">
          <a-space direction="vertical">
            <div>伪阳性</div>
            <div>235</div>
          </a-space>
        </a-col>
        <a-col :span="5">
          <a-space direction="vertical">
            <div>真阴性</div>
            <div>2151</div>
          </a-space>
        </a-col>
        <a-col :span="5">
          <a-space direction="vertical">
            <div>召回率</div>
            <div>0.674</div>
          </a-space>
        </a-col>
        <a-col :span="5">
          <a-space direction="vertical">
            <div>F1测量</div>
            <div>0.721</div>
          </a-space>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" :gutter="gutter">
        <a-col :span="5">
          <a-space direction="vertical">
            <div>曲线下面积（AUC）</div>
            <div>0.831</div>
          </a-space>
        </a-col>

      </a-row>
      <a-row :gutter="gutter">
        <a-col :span="24">
          <div>AUC曲线</div>
          <a-image class="img" :src="img.p1" />
        </a-col>
      </a-row>
      <a-row :gutter="gutter">
        <a-col :span="24">
          <div>特征重要度</div>
          <a-image class="img" :src="img.p2" />
        </a-col>
      </a-row>
      <a-row :gutter="gutter">
        <a-col :span="24">
          <div>模型</div>
          <a-image class="img" :src="img.p3" />
        </a-col>
      </a-row>
    </template>
  </a-modal>
</template>
<script lang="ts">

import {defineComponent} from "vue";


export default defineComponent({
  name: 'AssessmentModal',
  components: {},
  data() {
    return {
      node: {} as any,
      visible: false,
      gutter: [48, 48],
      img: {
        p1: require("@/assets/p1.jpg"),
        p2: require("@/assets/p2.jpg"),
        p3: require("@/assets/p3.jpg"),
        modal: require("@/assets/modal.png"),
      }
    }
  },
  props: {},
  methods: {
    open(node: any) {
      this.node = node
      this.visible = true
      console.log(node)
    },
    close() {
      this.visible = false
    },
    handleOk() {
      this.visible = false
      console.log("ok")
    }
  },
})
</script>