<style lang="less" scoped>
.body {
  padding: 10px 20px 0px 20px;
}
</style>
<template>
  <a-modal :width="278" :title="'退出'" :visible="isVisible" centered @ok="ok" @cancel="cancel" :maskClosable="false">
    <div class="body">
      <a-form :v-bind="layout">
        <a-form-item name="closeType" label="关闭面板">
          <a-radio-group v-model:value="closeType">
            <a-radio value="minimizing">最小化到托盘</a-radio>
            <a-radio value="exit">直接退出</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="closeType" label="是否记住">
          <a-switch v-model:checked="rembermer"/>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'CloseWindow',
  components: {},
  data() {
    return {
      isVisible: false,
      rembermer: this.$store.state.closeProperties.rembermer,
      closeType: this.$store.state.closeProperties.closeType,
      layout: {
        labelCol: {span: 6},
        wrapperCol: {span: 16},
      },
    }
  },
  props: {
    closeCallable: {
      type: Function,
      required: true,
      default: () => {
        return () => {}
      }
    },
  },
  methods: {
    ok() {
      this.$store.commit('setCloseProperties', {
        closeType:this.closeType,
        rembermer:this.rembermer,
      })
      this.isVisible = false
      this.closeCallable()
    },
    open() {
      this.isVisible = true
    },
    cancel() {
      this.isVisible = false
    },
  },
})
</script>