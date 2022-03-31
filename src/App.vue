<style lang="less">
html, body {
  padding: 0;
  margin: 0;
  font-family: "Microsoft YaHei";
}
#app{
  height: 100%;
}
.top {
  height: 100%;
}

</style>
<template>
  <div class="top">
    <a-config-provider :locale="locale">
      <router-view/>
    </a-config-provider>
  </div>
</template>
<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      locale: zhCN,
    };
  },
})
</script>

