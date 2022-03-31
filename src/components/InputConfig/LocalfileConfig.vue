<template>
  <a-form layout="vertical">
    <a-form-item label="文件类型" name="inputFileType">
      <a-select v-model:value="data.inputFileType" style="width: 100%" allowClear>
        <a-select-option v-for="select in inputFileType" :key="select.value" :value="select.value">
          {{ select.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="选择列" name="selectColNum">
      <a-input v-model:value="data.selectColNum" class="input-length"/>
    </a-form-item>
    <a-form-item label="是否包含header信息" name="hasHeader">
      <a-select v-model:value="data.hasHeader" style="width: 100%" allowClear>
        <a-select-option v-for="select in hasHeaders" :key="select.value" :value="select.value">
          {{ select.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="数据分隔符" name="inputSpliteStr">
      <a-select v-model:value="data.inputSpliteStr" style="width: 100%" allowClear>
        <a-select-option v-for="select in splites" :key="select.value" :value="select.value">
          {{ select.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="上传文件" name="file">
      <a-upload :before-upload="beforeUpload" :customRequest="customRequest" :file-list="fileList"
                @change="handleChange($event, item)"
      >
        <div v-if="fileList.length < maxImageNum">
          <a-button>
            <plus-outlined/>
            上传
          </a-button>
        </div>

      </a-upload>
    </a-form-item>

<!--    <a-form-item>-->
<!--      <a-button type="primary" @click="ok">确定</a-button>-->
<!--    </a-form-item>-->

  </a-form>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({

  name: 'LocalfileConfig',

  data() {
    return {
      data: {},
      fileList: [] as any[],
      maxImageSize: 10,
      maxImageNum: 1,
      layout: {
        labelCol: {span: 8},
        wrapperCol: {span: 14},
      },
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
    }
  },
  methods: {
    initData(data: any) {
      if (data.file?.length > 0) {
        this.fileList = data.file
      } else {
        this.fileList = [] as any[]
      }
      this.data = data
    },
    ok() {
      this.$emit('ok', Object.assign(this.data, {file: this.fileList})
      )
    },
    getData() {
      return Object.assign(this.data, {file: this.fileList})
    },
    beforeUpload(file: any) {
      if (!file) {
        return false
      }
      const isLt = file.size / 1024 / 1024 < this.maxImageSize;
      if (!isLt) {
        this.$message.error("文件大小超出限制，最大" + this.maxImageSize + "M");
        return false
      }

      return true
    },
    handleChange(fileItem: any, item: any) {
      let file = fileItem.file
      if (file.status == 'uploading') {
        file.status = 'done'
        this.fileList = [...this.fileList, file];
      }
      if (file.status == 'removed') {
        const index = this.fileList.indexOf(file);
        this.fileList.splice(index, 1);
      }
      this.$emit("imageChange", this.fileList)
    },
    customRequest(file: any) {
      //不做任何实现不会自动上传
    },
  }
})
</script>
<style lang="less">

</style>
