<style lang="less" scoped>
.back-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.header {
  height: 30px;
  background-color: rgb(224, 216, 216);;
}
.content{
  width: 100%;
  height:calc(100% - var(--title-bar-height));
  overflow-y: auto;
  position: relative;
}

</style>
<template>
  <div :style="['width: 100%','height: 100%',appStyle]">
    <navbar></navbar>
    <div class="content">
      <router-view/>
      <div v-if="$route.fullPath !== '/home'" class="back-button">
        <a-button type="primary" shape="circle" @click="back">
          <template #icon>
            <arrow-left-outlined/>
          </template>
        </a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import {defineComponent} from "vue";
import Navbar from "@/views/Frame/Navbar.vue";

export default defineComponent({
  name: 'Frame',
  components: {
    Navbar
  },
  data() {
    return {
      env: process.env.ELECTRON_NODE_INTEGRATION
    }
  },
  computed: {
    appStyle() {
      return `--title-color: #2f3241;--title-bar-height: 30px;--text-color: #74b1be;`
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
})
</script>