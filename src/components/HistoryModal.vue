<template>
  <a-modal v-model:visible="visible" title="历史记录" @ok="handleOk" :width="800">

    <a-table :dataSource="dataSource" :columns="columns"/>


  </a-modal>
</template>
<script lang="ts">

import {defineComponent} from "vue";


export default defineComponent({
  name: 'HistoryModal',
  components: {},
  data() {
    return {
      visible: false,
      gutter: [48, 48],
      columns: [
        {title: '模型名称', key: 'modalName', dataIndex: 'modalName',},
        {title: '开始时间', key: 'startTime', dataIndex: 'startTime',},
        {title: '结束时间', key: 'endTime', dataIndex: 'endTime',},
        {title: '结果', key: 'result', dataIndex: 'result',},
      ],
      dataSource: [] as any
    }
  },
  props: {},
  methods: {
    open(modalName: string) {
      console.log(modalName)

      if (modalName == '5G低切换方案制定模型') {
        this.dataSource = [
          {modalName: "5G低切换方案制定模型", startTime: "3/10/2022 12:24:56", endTime: "3/10/2022 12:53:14", result: "训练成功"},
          {modalName: "5G低切换方案制定模型", startTime: "3/11/2022 14:08:13", endTime: "3/11/2022 16:07:27", result: "训练成功"},
          {modalName: "5G低切换方案制定模型", startTime: "3/12/2022 18:33:26", endTime: "3/12/2022 20:37:46", result: "训练成功"},
          {modalName: "5G低切换方案制定模型", startTime: "3/13/2022 18:08:19", endTime: "3/13/2022 19:04:09", result: "训练成功"},
          {modalName: "5G低切换方案制定模型", startTime: "3/14/2022 10:27:46", endTime: "3/14/2022 11:04:18", result: "训练成功"},
          {modalName: "5G低切换方案制定模型", startTime: "3/15/2022 15:08:37", endTime: "3/15/2022 15:59:21", result: "训练成功"},
        ]
      }else{
        this.dataSource = []
      }
      const itemName = modalName+"process"
      let array = JSON.parse(window.localStorage.getItem(itemName) as string)
      if(array&&array.length>0){
        this.dataSource = this.dataSource.concat(array)
      }
      this.visible = true
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