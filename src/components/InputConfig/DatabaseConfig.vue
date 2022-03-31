<template>
  <a-form v-bind="layout">
    <a-form-item label="数据库类型" name="type">
      <a-select v-model:value="data.type" style="width: 100%" allowClear>
        <a-select-option v-for="select in databaseType" :key="select.value" :value="select.value">
          {{ select.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="IP" name="ip">
      <a-input v-model:value="data.ip" class="input-length"/>
    </a-form-item>
    <a-form-item label="端口" name="port">
      <a-input v-model:value="data.port" class="input-length"/>
    </a-form-item>
    <a-form-item label="库名" name="database">
      <a-input v-model:value="data.database" class="input-length"/>
    </a-form-item>
    <a-form-item label="账号" name="username">
      <a-input v-model:value="data.username" class="input-length"/>
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input-password v-model:value="data.password" class="input-length"/>
    </a-form-item>
    <a-form-item label="表名" name="tableName">
      <a-select v-model:value="data.tableName" style="width: 100%" allowClear>
        <a-select-option v-for="select in tableNames" :key="select.value" :value="select.value">
          {{ select.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="URL" name="URL">
      {{ 'jdbc:' + data.type + '://' + data.ip + ':' + data.port + '/' + data.database }}
    </a-form-item>
    <a-form-item label="SQL" name="sql">
      <a-textarea v-model:value="data.sql" class="input-length" :rows="4" />
    </a-form-item>
    <a-form-item label="描述" name="desc">
      <a-input v-model:value="data.desc" class="input-length"/>
    </a-form-item>
<!--    <a-form-item>-->
<!--      <a-button type="primary" @click="ok">确定</a-button>-->
<!--    </a-form-item>-->

  </a-form>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({

  name: 'DatabaseConfig',

  data() {
    return {
      data: {},
      databaseType: [
        {label: "MySql", value: "mysql"},
        {label: "Postgresql", value: "postgresql"},
        {label: "Oracle", value: "oracle"},
      ],
      tableNames: [
        {label: "Smark_WS_Complaints_Trace_records_table", value: "Smark_WS_Complaints_Trace_records_table"},
        {label: "Smark_WS_ MR_Trace_records_table", value: "Smark_WS_ MR_Trace_records_table"},
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
