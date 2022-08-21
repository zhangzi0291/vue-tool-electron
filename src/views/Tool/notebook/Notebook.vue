<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 20px 40px;

  &-title {
    width: 100%;
    font-size: 24px;
    font-weight: bold;
  }

  &-time {
    width: 100%;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.45);

  }

  &-content {
    width: 100%;
    height: calc(100% - 100px);
  }
}

.list-item {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
}

.left-botton {
  position: absolute;
  top: 0;
  right: 0;
}

.drawer-box {
  margin-top: 30px;
}

.drawer-button {
  position: absolute;
  top: 10px;
  left: 10px;
}

</style>
<template>
  <div ref="box" class="box">
    <div class="drawer-button">
      <a-space direction="vertical">
        <a-button type="primary" shape="circle" @click="open">
          <template #icon>
            <menu-fold-outlined/>
          </template>
        </a-button>
        <a-button type="primary" shape="circle" @click="changePerviewType">
          <template #icon>
            <monitor-outlined/>
          </template>
        </a-button>
      </a-space>
    </div>

    <perview v-model:title="data.title" v-model:content="data.content" v-model:time="data.time"
             :perviewType="perviewType" @update="update"/>

    <a-drawer
        v-model:visible="visible"
        :get-container="false"
        :style="{ position: 'absolute' }"
        title="笔记清单"
        placement="left"
    >

      <a-list bordered :data-source="list">
        <template #renderItem="{ item }">
          <a-list-item>
            <div class="list-item">
              <div @click="changePerview(item)">
                {{ item.title == '' ? '无标题' : item.title }}
              </div>
              <div class="left-botton">
                <a-button danger size="small" shape="circle" @click="deleteItem(item)">
                  <template #icon>
                    <delete-outlined/>
                  </template>
                </a-button>
              </div>
            </div>
          </a-list-item>
        </template>
      </a-list>

      <template v-slot:footer>
        <a-button :block="true" @click="addNote">添加笔记</a-button>
      </template>
    </a-drawer>
  </div>
</template>
<script lang="ts">
import perview from "@/views/Tool/notebook/perview.vue";
import {v4 as uuidv4} from 'uuid';
import {createVNode, defineComponent} from "vue";

export interface Note {
  id: string;
  title: string;
  content: string;
  time: string;
}

export default defineComponent({
  name: 'Notebook',
  components: {
    perview
  },
  data() {
    return {
      data: {
        id: "",
        title: "",
        content: "",
        time: "",
      },
      perviewType: false,
      list: [] as Array<Note>,
      visible: false,
      keyListener: {} as EventListener,
      saveInterval: 0 as number ,
    }
  },
  watch: {
    "list.length"(n, o) {
      if (n == 0) {
        this.addNote()
      }
    }
  },
  methods: {
    changePerviewType() {
      this.perviewType = !this.perviewType
    },
    open() {
      this.visible = true
    },
    update(data: any) {
      this.$nextTick(() => {
        this.$store.commit('setNotebook', data)

      })
    },
    changePerview(item: any) {
      this.setData(item)
      this.visible = false
    },
    addNote() {
      const data = {
        id: uuidv4(),
        title: "",
        content: "",
        time: "",
      }
      this.list.push(data)
      this.setData(data)
      this.visible = false
    },
    save() {
      this.$store.commit('setNotebookList', this.list)
      this.$message.success("保存成功")
    },
    saveOnline() {
      console.log(this.$store.state.user)
      console.log(this.data)
      console.log("saveOnline")
    },
    setData(item: any) {
      this.data = item
      this.$store.commit('setNowNotebookId', item.id)
    },
    deleteItem(item: any, e: Event) {
      this.$modal.confirm({
        title: '删除',
        icon: createVNode(this.$icons["ExclamationCircleOutlined"]),
        content: '确定要删除吗？',
        onOk: () => {
          this.list.forEach((x, i) => {
            if (x.id == item.id) {
              this.list.splice(i, 1)
              this.save()
            }
          })
        },
      });
    }
  },
  mounted() {
    this.list = this.$store.state.notebookList
    if (this.list.length == 0) {
      this.addNote()
    }

    this.list.filter(x => {
      if (x.id == this.$store.state.nowNotebookId) {
        this.data = x
      }
    })

    this.keyListener = ((e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        //  执行save方法
        this.save()
        this.saveOnline()
        // 阻止默认事件
        e.preventDefault()
      }
    }) as EventListener

    this.saveInterval = setInterval(() => {
      this.saveOnline();
    }, 5 * 60 * 1000) as unknown as number
    document.addEventListener('keydown', this.keyListener)
  },
  unmounted() {
    document.removeEventListener('keydown', this.keyListener)
    clearInterval(this.saveInterval)
  }
})
</script>