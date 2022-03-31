<template>
  <a-form layout="vertical">
    <template v-if="type!='input'">
      <a-form-item label="输入文件类型" name="inputFileType">
        <a-select v-model:value="data.inputFileType" style="width: 100%" allowClear>
          <a-select-option v-for="select in inputFileType" :key="select.value" :value="select.value">
            {{ select.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="选择列" name="selectColNum">
        <a-input-number v-model:value="data.selectColNum" class="input-length"/>
      </a-form-item>
      <a-form-item label="输入是否包含header信息" name="hasHeader">
        <a-select v-model:value="data.hasHeader" style="width: 100%" allowClear>
          <a-select-option v-for="select in hasHeaders" :key="select.value" :value="select.value">
            {{ select.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="输入数据分隔符" name="inputSpliteStr">
        <a-select v-model:value="data.inputSpliteStr" style="width: 100%" allowClear>
          <a-select-option v-for="select in splites" :key="select.value" :value="select.value">
            {{ select.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </template>
    <template v-if="type!='output'">
      <a-form-item label="输出文件类型" name="outputFileType">
        <a-select v-model:value="data.outputFileType" style="width: 100%" allowClear>
          <a-select-option v-for="select in outputFileType" :key="select.value" :value="select.value">
            {{ select.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="输出数据分隔符" name="outputSpliteStr">
        <a-select v-model:value="data.outputSpliteStr" style="width: 100%" allowClear>
          <a-select-option v-for="select in splites" :key="select.value" :value="select.value">
            {{ select.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </template>
  </a-form>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({

  name: 'IoConfig',

  data() {
    return {
      data: {},
      inputFileType: [
        {label: "CSV", value: "csv"},
      ],
      hasHeaders: [
        {label: "是", value: "1"},
        {label: "否", value: "0"},
      ],
      splites: [
        {label: "逗号", value: ","},
        {label: "空格", value: " "},
        {label: "分号", value: ";"},
        {label: "tab(\\t)", value: "\\t"},
        {label: "竖线(|)", value: "|"},
      ],
      outputFileType: [
        {label: "CSV", value: "csv"},
      ],
      layout: {
        labelCol: {span: 12},
        wrapperCol: {span: 12},
      },
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
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
