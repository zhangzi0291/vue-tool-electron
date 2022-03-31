<template>
  <a-form v-bind="layout">
    <a-form-item label="训练日期" name="trainingDate">
      <a-date-picker :default-value='defaultMoment' v-model:value="data.trainingDate" :format="'YYYY-MM-DD'" />
    </a-form-item>
    <a-form-item label="最大节点数" name="maxNode">
      <a-input-number v-model:value="data.maxNode" class="input-length"/>
    </a-form-item>
    <a-form-item label="迭代次数" name="iteration">
      <a-input-number v-model:value="data.iteration" class="input-length"/>
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

  name: 'MctsConfig',

  data() {
    return {
      data: {
      },
      defaultMoment: stringToMoment(new Date().Format('yyyy-MM-dd'), 'YYYY-MM-DD'),
      databaseType: [
        {label: "MySql", value: "mysql"},
        {label: "Postgresql", value: "postgresql"},
        {label: "Oracle", value: "oracle"},
      ],
      tableNames: [
        {label: "tdl_cm_cell", value: "tdl_cm_cell"},
        {label: "tdl_pm_cell", value: "tdl_pm_cell"},
        {label: "tdl_kpi", value: "tdl_kpi"},
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
      console.log(stringToMoment(new Date().Format('yyyy-MM-dd'), 'YYYY-MM-DD'))
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
