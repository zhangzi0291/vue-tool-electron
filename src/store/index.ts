import {createStore} from 'vuex'
import VueXAlong from 'vuex-along'
import {Note} from "@/views/Tool/notebook/Notebook.vue";

export default createStore({
  state: {
    user:{},
    apps:{},
    timeout:0,
    closeProperties:{
      rembermer: false,
      closeType: "exit",
    },
    notebookList:[] as Array<Note>,
    nowNotebookId:""
  },
  mutations: {
    setCloseProperties(state,properties){
      state.closeProperties.rembermer = properties.rembermer
      state.closeProperties.closeType = properties.closeType
    },
    setLoginTimeout(state,timeout){
      state.timeout = timeout
    },
    setUser(state,user){
      state.user = user
    },
    setApp(state,apps){
      state.apps = apps
    },
    setNotebookList(state,notebookList:Array<Note>){
      const list = notebookList.filter((x:any)=>x.title!=''&&x.content!='')
      state.notebookList = list
    },
    setNotebook(state,notebook:Note){
      state.notebookList.filter(x=>{
        if(x.id == notebook.id){
          x = notebook
        }
      })
    },
    setNowNotebookId(state,nowNotebookId){
      state.nowNotebookId = nowNotebookId
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[VueXAlong({
    name: 'along',     //存放在localStroage或者sessionStroage 中的名字
    // local: true,      //是否存放在local中  false 不存放 如果存放按照下面session的配置配
    session: { list: [], isFilter: true }
    //如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
  })]
})
