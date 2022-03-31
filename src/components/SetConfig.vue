<style lang="less">

</style>
<template>
  <a-drawer
      :visible="drawerVisible"
      placement="right"
      title="设置"
      width="400"
      @close="onDrawerClose"
  >
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="config" tab="参数配置">
        <a-space :size="40" direction="vertical" style="width: 100%">
          <a-collapse v-model:activeKey="activeKeyConfig">
<!--            <a-collapse-panel key="io" header="IO参数">-->
<!--              <io-config ref="ioConfig" :type="node.data.type"></io-config>-->
<!--            </a-collapse-panel>-->
            <a-collapse-panel key="config" header="配置">
              <form-modal ref="form" :columns="formColumns" >
                <template #resources="{data}">
                  <a-button type="primary" @click="openMenuModal(data)">分配资源</a-button>
                </template>
              </form-modal>

              <database-config v-if="configType == 'database'" ref="databaseConfig"></database-config>
              <localfile-config v-else-if="configType == 'localfile'" ref="localfileConfig"></localfile-config>
              <output-database-config v-else-if="configType == 'output-database'"
                                      ref="outputDatabaseConfig"></output-database-config>
              <output-localfile-config v-else-if="configType == 'output-localfile'"
                                       ref="outputLocalfileConfig"></output-localfile-config>
<!--              <mcts-config v-if="configType == 'mcts'" ref="mctsConfig"></mcts-config>-->
              <date-conversion-config v-if="configType == 'dateConversion'"
                                      ref="dateConversionConfig"></date-conversion-config>
              <model-evaluation-config v-if="configType == 'modelEvaluation'"
                                       ref="modelEvaluationConfig"></model-evaluation-config>
            </a-collapse-panel>
          </a-collapse>
        </a-space>
      </a-tab-pane>
      <a-tab-pane key="desc" tab="描述说明">
        <a-collapse v-model:activeKey="activeKeyDesc">
          <a-collapse-panel key="desc" :header="descInfo.title?descInfo.title:node.data.label">
            <md-editor :modelValue="descInfo.content" previewOnly/>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
    </a-tabs>


  </a-drawer>
</template>
<script lang="ts">

import {defineComponent} from "vue";
import ModelEvaluationConfig from "@/components/DataProcessConfig/ModelEvaluationConfig.vue";
import DateConversionConfig from "@/components/DataProcessConfig/DateConversionConfig.vue";
import MctsConfig from "@/components/algorithmConfig/MctsConfig.vue";
import OutputLocalfileConfig from "@/components/OutputConfig/OutputLocalfileConfig.vue";
import OutputDatabaseConfig from "@/components/OutputConfig/OutputDatabaseConfig.vue";
import LocalfileConfig from "@/components/InputConfig/LocalfileConfig.vue";
import DatabaseConfig from "@/components/InputConfig/DatabaseConfig.vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import IoConfig from "@/components/IoConfig/IoConfig.vue";
import FormModal, {Ext, ModalField} from "@/components/FormModal.vue";

export default defineComponent({
  name: 'SetConfig',
  components: {
    IoConfig,
    ModelEvaluationConfig,
    DateConversionConfig,
    MctsConfig,
    OutputLocalfileConfig,
    OutputDatabaseConfig,
    LocalfileConfig,
    DatabaseConfig,
    MdEditor,
    FormModal
  },
  data() {
    return {
      drawerVisible: false,
      pass: true,
      configRef: {} as any,
      activeKey: "config",
      activeKeyConfig:["io","config"],
      activeKeyDesc:"desc",
      descInfo: {title: "", content: ""},
      formColumns:[],
    }
  },
  props: {
    configType: String,
    node: Object,
  },
  methods: {
    openDrawer() {
      this.drawerVisible = true;
      this.activeKey = "config"
      if (this.node == undefined) {
        return
      }
      const node = this.node.getData()
      const data = node.data
      if(data.formColumns){
        this.formColumns = data.formColumns
      }else{
        this.formColumns = []
      }
      if (data.descInfo) {
        this.descInfo = data.descInfo
      } else {
        this.descInfo = {title: "", content: ""}
      }
      setTimeout(() => {
        switch (node.name) {
          case 'database':
            this.configRef = this.$refs.databaseConfig
            break
          case 'localfile':
            this.configRef = this.$refs.localfileConfig
            break
          case 'download-localfile':
            this.configRef = this.$refs.outputLocalfileConfig
            break
          case 'download-database':
            this.configRef = this.$refs.outputDatabaseConfig
            break
          case 'mcts':
            this.configRef = this.$refs.mctsConfig
            break
          case 'dateConversion':
            this.configRef = this.$refs.dateConversionConfig
            break
          case 'modelEvaluation':
            this.configRef = this.$refs.modelEvaluationConfig
            break
        }
        if (this.configRef != undefined) {
          try {
            this.configRef.initData(data)
          } catch (e) {}
        }
        // (this.$refs.ioConfig as any).initData(data);
        (this.$refs.form as any).initData(data);
      }, 100)
    },
    onDrawerClose() {
      this.drawerVisible = false;
      let data: any = {}
      try {
        data = Object.assign(data, this.configRef.getData())
      } catch (e) {
        console.log(e)
      }
      try {
        data = Object.assign((this.$refs.ioConfig as any).getData())
      } catch (e) {
        console.log(e)
      }
      try {
        data = Object.assign((this.$refs.form as any).getData())
      } catch (e) {
        console.log(e)
      }
      if (this.node == undefined) {
        return
      }
      const oldData = this.node.getData()

      const label = {} as any

      if (data.file != undefined && data.file[0]?.name) {
        label['label'] = data.file[0]?.name
      }
      if (data.desc) {
        label['label'] = data.desc
      }

      this.node.setData(Object.assign({
        ...oldData,
        data: data,
      }, label))
      if (data.evaluation < 80) {
        this.pass = true
      } else {
        this.pass = false
      }
    },

  },
})
</script>