<template>
  <a-form v-bind="layout">
    <a-form-item label="评估值" name="format">
      <a-input-number v-model:value="data.evaluation" class="input-length"/>
    </a-form-item>
<!--    <a-form-item>-->
<!--      <a-button type="primary" @click="ok">确定</a-button>-->
<!--    </a-form-item>-->
  </a-form>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {stringToMoment} from "ant-design-vue/lib/_util/moment-util";

export default defineComponent({

  name: 'modelEvaluationConfig',

  data() {
    return {
      data: {
      },
      layout: {
        labelCol: {span: 8},
        wrapperCol: {span: 14},
      },
    }
  },
  methods: {
    initData(data: any) {
      this.data = data
    },
    ok() {
      this.$emit('ok',
          this.data
      )
    },
    getData() {
      return this.data
    }
  }
})
</script>
<style lang="less">

</style>
