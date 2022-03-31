<template>
  <a-form v-bind="layout">
    <a-form-item label="转换字段" name="field">
      <a-select v-model:value="data.field" style="width: 100%" allowClear>
        <a-select-option v-for="select in fields" :key="select.value" :value="select.value">
          {{ select.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="转换格式" name="format">
      <a-input v-model:value="data.format" class="input-length"/>
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

  name: 'dateConversionConfig',

  data() {
    return {
      data: {
      },
      fields: [
        {label: "name", value: "name"},
        {label: "create_time", value: "create_time"},
        {label: "status", value: "status"},
        {label: "region_code", value: "region_code"},
        {label: "leaf", value: "leaf"},
      ],
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
