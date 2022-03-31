<style lang="less">
.study-pane {
  height: 100%;
}

.data-source-pane {
  padding: 5px;
  min-width: 250px;
  overflow-y: auto;
  user-select: none;
}

.flow-pane {
  position: relative;
  padding: 5px;
  min-width: 400px;
  height: 100%;
  min-height: 400px;
  flex-grow: 1;
}

.flow-container {
  width: 100%;
  height: 100%;
}

.flow-container-toolbar-top {
  position: absolute;
  left: 20px;
  top: 20px;
}

.flow-container-toolbar-right {
  position: absolute;
  right: 20px;
  top: 20px;
}

@keyframes running-line {
  to {
    stroke-dashoffset: -1000
  }
}

.splitpanes.splitpanes-default-theme .splitpanes__pane {
  background-color: #fff;
}

.splitpanes.splitpanes-default-theme .splitpanes__splitter {
  background-color: #efefef;
}

.ant-collapse-borderless {
  background-color: #fff
}

.process-div {
  cursor: pointer;
  width: 100%;

  &:hover {
    color: #1890ff;
  }
}

</style>
<template>
  <div style="height:100%; min-height: 100%; max-height: 100%;" @click.stop="hideFn">
    <splitpanes class="study-pane splitpanes-default-theme" style="height: 100%" @resized="resizeContainer">
      <pane :size="20" class="data-source-pane">
        <a-tabs v-model:activeKey="activeKeyTab">
          <a-tab-pane key="algorithm" tab="要素库">
            <div style="overflow-y: auto;  height: 100%;">
              <a-collapse v-model:activeKey="activeKey" :bordered="false" expand-icon-position="right"
                          style="background-color: #fff;">
                <a-collapse-panel key="数据源" header="数据源">
                  <template #extra>
                    <DatabaseOutlined/>
                  </template>
                  <a-list :data-source="items.filter(item=>item.type=='input')" size="small">
                    <template #renderItem="{ item }">
                      <a-list-item>
                        <drag-div :item="item" :target="container" style="width: 100%" @addNode="addNode"> {{
                            item.label
                          }}
                        </drag-div>
                      </a-list-item>
                    </template>
                  </a-list>
                </a-collapse-panel>
                <a-collapse-panel key="数据处理" header="数据处理">
                  <template #extra>
                    <ControlOutlined/>
                  </template>
                  <a-list :data-source="items.filter(item=>item.type=='dataProcess')" size="small">
                    <template #renderItem="{ item }">
                      <a-list-item>
                        <drag-div :item="item" :target="container" style="width: 100%" @addNode="addNode">{{
                            item.label
                          }}
                        </drag-div>
                      </a-list-item>
                    </template>
                  </a-list>
                </a-collapse-panel>
                <a-collapse-panel key="机器学习" header="机器学习">
                  <template #extra>
                    <RobotOutlined/>
                  </template>
                  <a-list :data-source="items.filter(item=>item.type=='ML')" size="small">
                    <template #renderItem="{ item }">
                      <a-list-item>
                        <drag-div :item="item" :target="container" style="width: 100%" @addNode="addNode"> {{
                            item.label
                          }}
                        </drag-div>
                      </a-list-item>
                    </template>
                  </a-list>
                </a-collapse-panel>
                <a-collapse-panel key="强化学习" header="强化学习">
                  <template #extra>
                    <SolutionOutlined/>
                  </template>
                  <a-list :data-source="items.filter(item=>item.type=='RL')" size="small">
                    <template #renderItem="{ item }">
                      <a-list-item>
                        <drag-div :item="item" :target="container" style="width: 100%" @addNode="addNode"> {{
                            item.label
                          }}
                        </drag-div>
                      </a-list-item>
                    </template>
                  </a-list>
                </a-collapse-panel>
                <a-collapse-panel key="输出" header="输出">
                  <template #extra>
                    <DownloadOutlined/>
                  </template>
                  <a-list :data-source="items.filter(item=>item.type=='output')" size="small">
                    <template #renderItem="{ item }">
                      <a-list-item>
                        <drag-div :item="item" :target="container" style="width: 100%" @addNode="addNode"> {{
                            item.label
                          }}
                        </drag-div>
                      </a-list-item>
                    </template>
                  </a-list>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </a-tab-pane>
          <a-tab-pane key="process" tab="模型列表">
            <a-list size="small">
              <a-list-item>
                <div class="process-div" @click="setProcess(1,'留痕学习模型')">留痕学习模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div" @click="setProcess(2,'5G低QoSFlow建立成功率方案制定模型')">5G低QoSFlow建立成功率方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">5G低下行低速率方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">5G高掉线方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">5G视频业务方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">5G数据质差方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">5G游戏高时延方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">5G上行低速率方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">5G低RRC连接建立成功率方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div" >5G低切换方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">4G低下载速率小区方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">5G视频业务方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">4G视频业务方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">4G数据质差方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">4G游戏高时延方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">4G上行低速率方案制定模型</div>
              </a-list-item>
              <a-list-item>
                <div class="process-div">4G低切换方案制定模型</div>
              </a-list-item>

            </a-list>
          </a-tab-pane>
        </a-tabs>

      </pane>
      <pane ref="flowPane" class="flow-pane">
        <div ref="containerPane" style="height: 100%;width: 100%">
          <div id="container" ref="container" class="flow-container" @drop="drop"></div>
        </div>
        <div class="flow-container-toolbar-top">
          <a-space>
            <a-tooltip placement="bottom">
              <template #title>
                <span>撤销</span>
              </template>
              <a-button size="small" @click="undo">
                <UndoOutlined/>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template #title>
                <span>反撤销</span>
              </template>
              <a-button size="small" @click="redo">
                <RedoOutlined/>
              </a-button>
            </a-tooltip>

          </a-space>
        </div>
        <div class="flow-container-toolbar-right">
          <a-space direction="vertical">
            <a-tooltip placement="left">
              <template #title>
                <span>清空</span>
              </template>
              <a-button size="small" @click="clear">
                <DeleteOutlined/>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="left">
              <template #title>
                <span>居中</span>
              </template>
              <a-button size="small" @click="center">
                <PicCenterOutlined/>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="left">
              <template #title>
                <span>运行</span>
              </template>
              <a-button size="small" @click="run">
                <PlayCircleOutlined/>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="left">
              <template #title>
                <span>保存</span>
              </template>
              <a-button size="small" @click="save">
                <SaveOutlined/>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="left">
              <template #title>
                <span>还原</span>
              </template>
              <a-button size="small" @click="restore">
                <RollbackOutlined/>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="left">
              <template #title>
                <span>下载当前数据</span>
              </template>
              <a-button size="small" @click="download('process.json',JSON.stringify(graph.toJSON()))">
                <CloudDownloadOutlined/>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="left">
              <template #title>
                <span>训练历史</span>
              </template>
              <a-button size="small" @click="openHistory">
                <HistoryOutlined/>
              </a-button>
            </a-tooltip>
          </a-space>
        </div>
      </pane>
    </splitpanes>

    <context-menu v-show="showContextMenu" ref="contextMenu" @callback="contextMenuCallback"></context-menu>
    <set-config ref="setConfig" :config-type="configType" :node="node"></set-config>
    <assessment-modal ref="assessmentModal"></assessment-modal>
    <history-modal ref="historyModal"></history-modal>
  </div>
</template>

<script lang="ts">
import {Cell, Graph, Node, Path} from "@antv/x6";
import {createVNode, defineComponent} from "vue";
import DragDiv from "@/components/DragDiv.vue";
import '@antv/x6-vue-shape'
import ContextMenu from "@/components/ContextMenu.vue";
import NodeCell from "@/components/nodeTheme/NodeCell.vue";
import axios from "axios";
import './splitpanes.css'
import {Pane, Splitpanes} from "splitpanes";
import SetConfig from "@/components/SetConfig.vue";
import {Ext, ModalField} from "@/components/FormModal.vue";
import AssessmentModal from "@/components/AssessmentModal.vue";
import HistoryModal from "@/components/HistoryModal.vue";

export default defineComponent({
  name: "StudyCentre",
  components: {
    HistoryModal,
    AssessmentModal,
    SetConfig,
    Splitpanes,
    Pane,
    ContextMenu,
    DragDiv,

  },
  data() {
    return {
      graph: {} as Graph,
      node: {} as Node,
      container: {} as HTMLDivElement,
      activeKey: ["数据处理", "机器学习"],
      activeKeyTab: "algorithm",
      modalName: "",
      items: [
        {
          type: 'input',
          label: '数据库',
          name: 'database',
          'data': {'logoName': 'db', descInfo: {content: "可通过数据库查询获取数据"}}
        },
        {
          type: 'input',
          label: '本地文件',
          name: 'localfile',
          'data': {'logoName': 'localfile', descInfo: {content: "可通过本地文件上传获取数据"}}
        },

        {type: 'output', label: '输出数据库', name: 'output-database', 'data': {'name': '输出数据库'}},
        {type: 'output', label: '输出文本文件', name: 'output-localfile', 'data': {'name': '输出文本文件'}},

        {
          type: 'dataProcess',
          label: '数据自处理',
          name: 'localfile',
          'data': {'logoName': 'dataHandler', descInfo: {content: "上传自己的处理脚本进行数据处理"}}
        },
        {
          type: 'dataProcess',
          label: '日期类型变换',
          name: 'dateConversion',
          'data': {'logoName': 'dateHandler'},
          descInfo: {content: "转换对应列的格式为日期格式"}
        },
        {
          type: 'dataProcess', label: '数据关联', name: '数据关联', 'data': {
            'logoName': 'datalink', descInfo: {
              content: "算法描述：类似SQL中的Join功能\n" +
                  "\n" +
                  "适用场景：适用于特征转换的场景。"
            },
            formColumns: [new ModalField().init('左特征列', 'leftFeatures', 'String'),
              new ModalField().init('右特征列', 'rightFeatures', 'String'),
              new ModalField().initSelect('join类型', 'joinType', new Ext(), [{
                label: "inner",
                value: "inner"
              }, {label: "cross", value: "cross"}, {label: "outer", value: "outer"}, {
                label: "full",
                value: "full"
              }, {label: "left", value: "left"}, {label: "right", value: "right"},]),
              new ModalField().init('左on条件', 'leftCondition', 'String'),
              new ModalField().init('右on条件', 'rightCondition', 'String'),]
          }
        },
        {
          type: 'dataProcess', label: '独热编码(one-hot)', name: '独热编码(one-hot)', 'data': {
            'logoName': 'dataHandler', descInfo: {
              content: "算法描述：将离散型特征的每一种取值都看成一种状态，若这一特征中有 N 个不相同的取值，就可以将该特征抽象成 N 种不同的状态，独热编码保证了每一个取值只会使得一种状态处于“激活态”，也就是说这 N 种状态中只有一个状态位值为1，其他状态位都是0。\n" +
                  "\n" +
                  "适用场景：适用于类别特征编码的场景。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),]
          }
        },
        {
          type: 'dataProcess', label: '去除重复行', name: '去除重复行', 'data': {
            'logoName': 'unrepeated', descInfo: {
              content: "算法描述：该算法用于将数据集中的重复样本进行去重处理。\n" +
                  "\n" +
                  "适用场景：需要去除重复样本的场景。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),]
          }
        },
        {
          type: 'dataProcess', label: '标准归一化', name: '标准归一化', 'data': {
            'logoName': 'normalization', descInfo: {
              content: "算法描述：在原始的数据中，各变量的范围大不相同。对于某些机器学习的算法，若没有做过标准化，目标函数会无法适当的运作。举例来说，多数的分类器利用两点间的距离计算两点的差异， 若其中一个特征具有非常广的范围，那两点间的差异就会被该特征左右，因此，有些特征应该被标准化，这样才能大略的使各特征依比例影响距离。另外一个做特征缩放的理由是他能使加速梯度下降法的收敛。标准归一化会使每个特征中的数值平均变为0(将每个特征的值都减掉原始数据中该特征的均值)、标准差变为1。\n" +
                  "\n" +
                  "适用场景：适用于特征归一化转换的场景"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().initSelect('是否均值', 'isMean', new Ext(), [{label: "是", value: "1"}, {
                label: "否",
                value: "0"
              }]),
              new ModalField().initSelect('是否方差', 'isVariance', new Ext(), [{label: "是", value: "1"}, {
                label: "否",
                value: "0"
              }])],
          }
        },
        {
          type: 'dataProcess', label: '最小最大归一化', name: '最小最大归一化', 'data': {
            'logoName': 'dataHandler', descInfo: {
              content: "算法描述：最小最大归一化将每个特征调整到一个特定的范围(通常是[0,1])。\n" +
                  "\n" +
                  "适用场景：适用于特征归一化转换的场景。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('最大值', 'max', 'String'),
              new ModalField().init('最小值', 'min', 'String'),]
          }
        },
        {
          type: 'dataProcess', label: '缺失值填充', name: '缺失值填充', 'data': {
            'logoName': 'nullHandler', descInfo: {
              content: "算法描述：该算法对数据中某列或某几列数据存在的缺失值进行替换。支持均值、中位值等填充方式\n" +
                  "\n" +
                  "适用场景：适合于有缺失数据数据集预处理的场景。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().initSelect('填充方法', 'isVariance', new Ext(), [{
                label: "zero",
                value: "0"
              }, {label: "minimum", value: "minimum"}, {label: "maximum", value: "maximum"}, {
                label: "average",
                value: "average"
              }, {label: "median", value: "median"}])],
          }
        },

        {
          type: 'ML', label: 'MCTS算法', name: 'mcts', 'data': {
            'name': '', 'logoName': 'modelTrain', descInfo: {
              content: "算法描述：MCTS 是一种通过随机抽样逼近实际结果的统计算法，利用蒙特卡洛模拟构建搜索树，可将树搜索的精度和随机抽样的多样性充分结合。搜索树中每个节点代表一种状态，节点上储存了访问次数、奖励值等信息。节点与节点之间的连线代表一个动作，通过“节点→节点间连线→节点”模拟了系统状态转移过程。\n\n" +
                  "适用场景：适用于用户行为学习建模的场景。"
            },
            modelEvaluation: "regression",
            formColumns: [new ModalField().init('状态指标', 'statusIndex', 'String'),
              new ModalField().init('动作指标', 'actionIndex', 'String'),
              new ModalField().init('UCI计算指标', 'qValue', 'String'),
              new ModalField().init('最大节点数', 'maxNode', 'Number'),
              new ModalField().init('迭代次数', 'iteration', 'Number'),
              new ModalField().init('置信度', 'confidence', 'Number'),
              new ModalField().init('TOP', 'top', 'Number'),
              new ModalField().init('支持度', 'support', 'Number'),
              new ModalField().init('准确率', 'accuracy', 'Number'),]
          }
        },
        {
          type: 'ML', label: '朴素贝叶斯-分类', name: '朴素贝叶斯-分类', 'data': {
            'logoName': 'dataHandler', descInfo: {
              content: "算法描述：朴素贝叶斯是一种常用的多分类算法。 算法假设各个特征之间是相互独立的，通过贝叶斯公式计算出某个样本属于某个类别的概率。\n" +
                  "\n" +
                  "适用场景：适用于分类以及自动建模的场景。\n" +
                  "\n" +
                  "朴素贝叶斯分类具体的输入、输出、参数信息，请参考帮助文档。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().init('priors', 'priors', 'String'),
              new ModalField().init('var_smoothing', 'var_smoothing', 'String'),]
          }
        },
        {
          type: 'ML', label: '随机森林-分类', name: '随机森林-分类', 'data': {
            'logoName': 'randomForests', descInfo: {
              content: "算法描述：随机森林是常用的机器学习算法，利用ensemble的思想，通过训练多个弱分类器(决策树)来合成强分类器。平台提供的随机森林算法支持二分类和多分类。\n" +
                  "\n" +
                  "适用场景：适用于分类以及自动建模的场景。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().init('n_estimators', 'n_estimators', 'String'),
              new ModalField().init('max_depth', 'max_depth', 'String'),
              new ModalField().init('min_samples_leaf', 'min_samples_leaf', 'String'),
              new ModalField().init('criterion', 'criterion', 'String'),
              new ModalField().init('min_samples_split', 'min_samples_split', 'String'),]
          }
        },
        {
          type: 'ML', label: 'Kmeans-聚类', name: 'Kmeans-聚类', 'data': {
            'logoName': 'kmeans', descInfo: {
              content: "算法描述：KMeans是最经典的的聚类算法，将无标签的数据聚成K个类。 平台提供的KMeans算法实现了并行的k-means++的初始化算法。\n" +
                  "\n" +
                  "适用场景：适用于聚类以及自动建模的场景。\n" +
                  "\n" +
                  "KMeans具体的输入、输出、参数信息，请参考帮助文档。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('k', 'k', 'String'),
              new ModalField().init('maxIter', 'maxIter', 'String'),
              new ModalField().init('tol', 'tol', 'String'),]
          }
        },
        {
          type: 'ML', label: '决策树-分类', name: '决策树-分类', 'data': {
            'logoName': 'DTC', descInfo: {
              content: "算法描述：决策树算法是机器学习中非常常用的一类分类算法。决策树算法有很多优点，如，解释性好，可以处理类别特征，支持多分类，不需要做特征scaling，可以表示非线性模型。\n" +
                  "\n" +
                  "适用场景：适用于分类以及自动建模的场景。\n" +
                  "\n" +
                  "决策树分类具体的输入、输出、参数信息，请参考帮助文档。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().init('max_depth', 'max_depth', 'String'),
              new ModalField().init('min_samples_leaf', 'min_samples_leaf', 'String'),
              new ModalField().init('criterion', 'criterion', 'String'),
              new ModalField().init('min_samples_split', 'min_samples_split', 'String'),]
          }
        },
        {
          type: 'ML', label: '决策树-回归', name: '决策树-回归', 'data': {
            'logoName': 'DTC', descInfo: {
              content: "算法描述：决策树算法是机器学习中非常常用的一类回归算法。 决策树算法有很多优点， 如，解释性好，可以处理类别特征，支持多分类，不需要做特征scaling，可以表示非线性模型。 平台上的决策树分类算法支持连续、非连续特征的多分类任务，最高可以支持百万级别的样本。\n" +
                  "\n" +
                  "适用场景：适用于回归以及自动建模的场景。\n" +
                  "\n" +
                  "决策树回归具体的输入、输出、参数信息，请参考帮助文档。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().init('max_depth', 'max_depth', 'String'),
              new ModalField().init('max_bins', 'max_bins', 'String'),
              new ModalField().init('min_info_gain', 'min_info_gain', 'String'),
              new ModalField().init('impurity', 'impurity', 'String'),
              new ModalField().init('min_instances_per_node', 'min_instances_per_node', 'String'),]
          }
        },
        {
          type: 'ML', label: '梯度提升树-回归', name: '梯度提升树-回归', 'data': {
            'logoName': 'GBDT', descInfo: {
              content: "算法描述：梯度提升树是一种常用的回归算法，每一轮根据梯度信息构造一课树来拟合之前所有树拟合的残差。\n" +
                  "\n" +
                  "适用场景：适用于回归以及自动建模的场景。\n" +
                  "\n" +
                  "梯度提升树回归具体的输入、输出、参数信息，请参考帮助文档。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().init('n_estimators', 'n_estimators', 'String'),
              new ModalField().init('max_depth', 'max_depth', 'String'),
              new ModalField().init('learning_rate', 'learning_rate', 'String'),]
          }
        },
        {
          type: 'ML', label: '梯度提升树-分类', name: '梯度提升树-分类', 'data': {
            'logoName': 'GBDT', descInfo: {
              content: "算法描述：梯度提升树是一种常用的回归算法，每一轮根据梯度信息构造一课树来拟合之前所有树拟合的残差。\n" +
                  "\n" +
                  "适用场景：适用于回归以及自动建模的场景。\n" +
                  "\n" +
                  "梯度提升树回归具体的输入、输出、参数信息，请参考帮助文档。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().init('n_estimators', 'n_estimators', 'String'),
              new ModalField().init('max_depth', 'max_depth', 'String'),
              new ModalField().init('learning_rate', 'learning_rate', 'String'),]
          }
        },
        {
          type: 'ML', label: '支持向量机-分类', name: '支持向量机-分类', 'data': {
            'logoName': 'svm', descInfo: {
              content: "算法描述：梯度提升树是一种常用的分类算法，每一轮根据梯度信息构造一课树来拟合之前所有树拟合的残差。\n" +
                  "\n" +
                  "适用场景：适用于分类以及自动建模的场景。\n" +
                  "\n" +
                  "梯度提升树分类具体的输入、输出、参数信息，请参考帮助文档。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().initSelect('kernel', 'kernel', new Ext(), [{
                label: "linear",
                value: "linear"
              }, {label: "poly", value: "poly"}, {label: "rbf", value: "rbf"}]),
              new ModalField().init('C', 'max_depth', 'String'),]
          }
        },
        {
          type: 'ML', label: '支持向量机-回归', name: '支持向量机-回归', 'data': {
            'logoName': 'svm', descInfo: {
              content: "算法描述：支持向量机(SVM)是机器学习中非常经典的算法，这里提供了线性支持向量机分类器， 目前只支持L2正则和二分类。\n" +
                  "\n" +
                  "适用场景：适用于分类以及自动建模的场景。\n" +
                  "\n" +
                  "线性支持向量机分类具体的输入、输出、参数信息，请参考帮助文档。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().initSelect('kernel', 'kernel', new Ext(), [{
                label: "linear",
                value: "linear"
              }, {label: "poly", value: "poly"}, {label: "rbf", value: "rbf"}]),
              new ModalField().init('C', 'max_depth', 'String'),]
          }
        },
        {
          type: 'ML', label: 'K最近邻-分类', name: 'k最近邻-分类', 'data': {
            'logoName': 'dataHandler', descInfo: {
              content: "算法描述：通过测量不同特征值之间的距离进行分类。它的思路是：如果一个样本在特征空间中的 k 个最相似(即特征空间中最邻近)的样本中的大多数属于某一个类别，则该样本也属于这个类别，其中K通常是不大于20的整数。\n" +
                  "\n" +
                  "适用场景：适用于分类的场景。\n" +
                  "\n" +
                  "k最近邻分类具体的输入、输出、参数信息，请参考帮助文档。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().init('n_neighbors', 'n_neighbors', 'String'),
              new ModalField().init('weights', 'weights', 'String'),]
          }
        },
        {
          type: 'ML', label: 'ARIMA-时间序列', name: 'ARIMA-时间序列', 'data': {
            'logoName': 'ARIMA', descInfo: {
              content: "算法描述：许多非平稳序列差分后会显示出平稳序列的性质，这个非平稳序列为差分平稳序列。差分平稳序列使用差分整合移动平均自回归模型（ARIMA）进行拟合。\n" +
                  "\n" +
                  "适用场景：适用于时间序列分析的场景。\n" +
                  "\n" +
                  "差分整合移动平均自回归模型具体的输入、输出、参数信息，请参考帮助文档。"
            },
            formColumns: [new ModalField().init('时间列', 'timeCol', 'String'),
              new ModalField().init('时间数据列', 'timeDateCol', 'String'),
              new ModalField().init('自回归项数', 'autoregressiveNum', 'String'),
              new ModalField().init('差分次数', 'differenceNum', 'String'),
              new ModalField().init('滑动平均项数', 'movingAverageNum', 'String'),]
          }
        },
        {
          type: 'ML', label: '孤立森林-异常检测', name: '孤立森林-异常检测', 'data': {
            'logoName': 'exception', descInfo: {
              content: "算法描述：该算法是一种基于孤立森林的异常点检测算法，该算法首先构建n颗树，每棵树都从原始数据中有放回的采样m个样本进行训练，每颗树在训练的时候都完全采用了随机选择特征以及特征分裂点的方式，然后再将每颗树的训练结果进行汇总就可以得到每个样本成为异常点的概率（0到1之间的浮点值），该值越大越有可能是异常点。\n" +
                  "\n" +
                  "适用场景：适用于异常检测的场景。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('树棵树', 'tree', 'String'),
              new ModalField().init('特征数', 'featuresNum', 'String'),
              new ModalField().init('样本数', 'sampleNum', 'String'),]
          }
        },
        {
          type: 'ML', label: 'lightgbm-分类', name: 'lightgbm-分类', 'data': {
            'logoName': 'dataHandler', descInfo: {
              content: "算法描述：LightGBM的提供一个快速高效、低内存占用、高准确度、支持并行和大规模数据处理的数据科学工具。\n\n" +
                  "适用场景：适用于分类以及自动建模的场景。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().init('boosting_type', 'boosting_type', 'String'),
              new ModalField().init('num_leaves', 'num_leaves', 'String'),
              new ModalField().init('max_depth', 'max_depth', 'String'),
              new ModalField().init('learning_rate', 'learning_rate', 'String'),
              new ModalField().init('n_estimators', 'n_estimators', 'String'),
              new ModalField().init('subsample_for_bin', 'subsample_for_bin', 'String'),
              new ModalField().init('objective', 'objective', 'String'),
              new ModalField().init('class_weight', 'class_weight', 'String'),
              new ModalField().init('min_split_gain', 'min_split_gain', 'String'),
              new ModalField().init('min_child_weight', 'min_child_weight', 'String'),
              new ModalField().init('subsample', 'subsample', 'String'),
              new ModalField().init('subsample_fre', 'subsample_fre', 'String'),
              new ModalField().init('colsample_bytree', 'colsample_bytree', 'String'),
              new ModalField().init('reg_alpha', 'reg_alpha', 'String'),
              new ModalField().init('reg_lambda', 'reg_lambda', 'String'),
              new ModalField().init('random_state', 'random_state', 'String'),
              new ModalField().init('n_jobs', 'n_jobs', 'String'),
              new ModalField().init('importance_type', 'importance_type', 'String'),
            ]
          }
        },
        {
          type: 'ML', label: 'lightgbm-回归', name: 'lightgbm-分类', 'data': {
            'logoName': 'dataHandler', descInfo: {
              content: "算法描述：LightGBM的提供一个快速高效、低内存占用、高准确度、支持并行和大规模数据处理的数据科学工具。\n\n" +
                  "适用场景：适用于分类以及自动建模的场景。"
            },
            formColumns: [new ModalField().init('特征列', 'features', 'String'),
              new ModalField().init('标签列', 'label', 'String'),
              new ModalField().init('boosting_type', 'boosting_type', 'String'),
              new ModalField().init('num_leaves', 'num_leaves', 'String'),
              new ModalField().init('max_depth', 'max_depth', 'String'),
              new ModalField().init('learning_rate', 'learning_rate', 'String'),
              new ModalField().init('n_estimators', 'n_estimators', 'String'),
              new ModalField().init('subsample_for_bin', 'subsample_for_bin', 'String'),
              new ModalField().init('objective', 'objective', 'String'),
              new ModalField().init('class_weight', 'class_weight', 'String'),
              new ModalField().init('min_split_gain', 'min_split_gain', 'String'),
              new ModalField().init('min_child_weight', 'min_child_weight', 'String'),
              new ModalField().init('subsample', 'subsample', 'String'),
              new ModalField().init('subsample_fre', 'subsample_fre', 'String'),
              new ModalField().init('colsample_bytree', 'colsample_bytree', 'String'),
              new ModalField().init('reg_alpha', 'reg_alpha', 'String'),
              new ModalField().init('reg_lambda', 'reg_lambda', 'String'),
              new ModalField().init('random_state', 'random_state', 'String'),
              new ModalField().init('n_jobs', 'n_jobs', 'String'),
              new ModalField().init('importance_type', 'importance_type', 'String'),
            ]
          }
        },


        {type: 'RL', label: 'Q-learning算法', name: 'Q-learning算法', 'data': {'name': ''}},
        {type: 'RL', label: 'DQN算法', name: 'DQN算法', 'data': {'name': ''}},
        {type: 'RL', label: 'DDPG算法', name: 'DDPG算法', 'data': {'name': ''}},

      ],
      showContextMenu: false,
      drawerVisible: false,
      configType: "",
      pass: true,
    }
  },
  methods: {
    hideFn() {
      this.showContextMenu = false
    },
    onDrawerClose() {
      this.drawerVisible = false;
    },
    configOk(data: any) {
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
      console.log(this.pass)
      this.onDrawerClose()
    },
    contextMenuCallback(type: string, node: any) {
      switch (type) {
        case 'remove':
          if (node.type == 'edge') {
            this.graph.removeEdge(node.item.id)
          } else if (node.type == 'node') {
            this.graph.removeNode(node.item.id)
          }
          break
        case "setConfig":
          this.openConfig(node)
          break;
        case "assessment":
          this.openAssessment(node)
          break;
        case "downloadModel":
          this.download(new Date().Format("yyyyMMddhhmmssS") + ".pk", "model")
          break;
      }
    },
    openAssessment(node: any) {
      (this.$refs.assessmentModal as any).open(node.item);
    },
    openHistory() {
      (this.$refs.historyModal as any).open(this.modalName);
    },
    openConfig(node: any) {
      const data = node.item.getData()
      this.configType = data.name
      const setConfig = (this.$refs.setConfig as any)
      setConfig.openDrawer()
    },
    changeStatusById(id: string, status: string) {
      const node = this.graph.getCellById(id)
      const data = node.getData()
      node.setData({
        ...data,
        status: status
      })
    },
    changeStatus(status: string) {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        const node = cells[0]
        const data = node.getData()
        node.setData({
          ...data,
          status: status
        })
      }
    },
    addNode(option: any) {
      const p = this.graph.pageToLocal(option.x, option.y)
      this.graph.addNode(Object.assign({}, option, p))
    },
    save() {
      const json = this.graph.toJSON({diff: true})
      this.$modal.confirm({
        title: '保存',
        icon: createVNode(this.$icons["ExclamationCircleOutlined"]),
        content: '确定要保存吗？',
        onOk: () => {
          this.$modal.success({
            title: '保存成功',
            content: '已保存当前视图',
          })
          window.localStorage.setItem("x6-graph", JSON.stringify(json))
          return
        },
      });

    },
    clear() {
      this.graph.removeCells(this.graph.getCells())
    },
    center() {
      this.graph.centerContent()
    },
    restore() {
      const json = JSON.parse(window.localStorage.getItem("x6-graph") + "")
      this.$modal.confirm({
        title: '还原',
        icon: createVNode(this.$icons["ExclamationCircleOutlined"]),
        content: '确定要还原吗？',
        onOk: () => {
          this.graph.fromJSON(json)
          this.center()
          return
        },
      });

    },
    run() {
      const cells = this.graph.getCells()
      if (cells.length) {
        for (let cell of cells) {
          const node = cell
          const data = node.getData()
          node.setData({
            ...data,
            status: "blank"
          })
        }
      }
      let start = new Date().Format("MM/dd/yyyy hh:mm:ss")
      const rootNodes = this.graph.getRootNodes()
      for (let rootNode of rootNodes) {
        this.getChildNode(rootNode)
      }
      let end = new Date(new Date().getTime() + Math.random() * 1000 * 180 + 60*1000).Format("MM/dd/yyyy hh:mm:ss")
      this.setHistory({
        modalName: this.modalName,
        startTime: start,
        endTime: end,
        result: "训练成功"
      })
    },
    setHistory(data:any){
      if(this.modalName&&this.modalName!=''){
        console.log("saveHis")
        const itemName = this.modalName+"process"
        if(window.localStorage.getItem(itemName)==undefined){
          window.localStorage.setItem(itemName,JSON.stringify([]))
        }
        let array = JSON.parse(window.localStorage.getItem(itemName) as string)
        array.push(data)
        window.localStorage.setItem(itemName,JSON.stringify(array))
      }
    },
    getChildNode(node: any) {
      const childrens = node.getChildren() as Array<Cell>
      this.changeStatusById(node.id, "running")

      setTimeout(() => {
        if (childrens != null && childrens.length > 0) {
          for (let index in childrens) {
            const child = childrens[index]
            if (!this.graph.isNode(child)) {
              continue
            }

            const topEdges = child.getPorts().filter(edge => edge.group == "top")

            const i = setInterval(() => {
              let totalNum = 0
              let successNum = 0
              for (let topEdge of topEdges) {
                const edges = this.graph.getEdges().filter(edge => edge.getTargetPortId() == topEdge.id)
                totalNum += edges.length
                for (let i = 0; i < edges.length; i++) {
                  const edge = edges[i]
                  const znode = edge.getSourceNode()
                  if (znode?.getData().status == "success") {
                    successNum++
                  }
                }
              }
              if (successNum == totalNum) {
                clearInterval(i)
                this.getChildNode(child)
                this.changeStatusById(child.id, "running")
              }
            }, 100)

          }
          if (node.getData().label == "模型评估") {
            console.log(this.pass)
            if (this.pass) {
              this.changeStatusById(node.id, "success")
            } else {
              this.changeStatusById(node.id, "failed")
            }
          } else {
            this.changeStatusById(node.id, "success")
          }

        } else {
          this.changeStatusById(node.id, "success")
        }
      }, Math.random() * 2000 + 1000)
    },
    // async showNodeStatus(statusList) {
    //   const status = statusList.shift()
    //   status?.forEach((item) => {
    //     const {id, status} = item
    //     const node = this.graph.getCellById(id)
    //     const data = node.getData()
    //     node.setData({
    //       ...data,
    //       status: status
    //     })
    //   })
    //   this.timer = setTimeout(() => {
    //     this.showNodeStatus(statusList)
    //   }, 300)
    // },
    // layout() {
    //   const dagreLayout = new DagreLayout({
    //     type: 'dagre',
    //     rankdir: 'LR',
    //     align: 'UR',
    //     ranksep: 35,
    //     nodesep: 15,
    //   })
    //   const data: Model = {
    //     nodes: this.graph.getNodes() as Node[],
    //     edges: this.graph.getEdges() as Edge[],
    //   }
    //
    //   const model = dagreLayout.layout(data)
    //   console.log(model)
    //   this.graph.fromJSON(model)
    // },
    init() {
      const container = this.$refs.container as HTMLDivElement
      this.container = container as HTMLDivElement
      this.graph = new Graph({
        container: container,
        history: true,
        keyboard: true,
        clipboard: true,
        snapline: true,
        panning: {
          enabled: true,
          eventTypes: ['leftMouseDown']
        },
        // autoResize: this.$refs.containerPane as HTMLDivElement,
        mousewheel: {
          enabled: true,
          factor: 1.1,
          maxScale: 3,
          minScale: 0.3
        },
        selecting: {
          enabled: true,
          multiple: true,
          rubberEdge: true,
          rubberNode: true,
          modifiers: 'shift',
          rubberband: true
        },
        connecting: {
          snap: true,
          allowBlank: false,
          allowLoop: false,
          highlight: true,
          connector: 'algo-connector',
          connectionPoint: 'anchor',
          anchor: 'center',
          validateMagnet({magnet}) {
            // return magnet.getAttribute('port-group') !== 'top'

            // 限制连线配置
            return true
          },
          createEdge() {
            return graph.createEdge({
              shape: 'dag-edge',
              attrs: {
                line: {
                  strokeDasharray: '5 5',
                  targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8
                  }
                }
              },
              zIndex: -1
            })

          },
        },
        background: {
          color: '#ffffff', // 设置画布背景颜色
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
      });

      const graph: Graph = this.graph as Graph

      graph.on('edge:contextmenu', ({e, x, y, edge, view}) => {
        this.showContextMenu = true
        this.$nextTick(() => {
          const p = graph.localToPage(x, y)
          const contextMenu: any = this.$refs.contextMenu
          contextMenu.initFn(p.x, p.y, {type: 'edge', item: edge})
        })
      })

      graph.on('node:contextmenu', ({e, x, y, node, view}) => {
        this.showContextMenu = true
        this.$nextTick(() => {
          this.node = node
          const p = graph.localToPage(x, y)
          const contextMenu: any = this.$refs.contextMenu
          contextMenu.initFn(p.x, p.y, {type: 'node', item: node})
        })
      })

      graph.on('edge:connected', ({edge}) => {
        const source = graph.getCellById((edge.source as any).cell)
        const target = graph.getCellById((edge.target as any).cell)
        // 只允许输入
        if (target.data.type == 'input') {
          return graph.removeEdge(edge.id)
        }

        // 只允许输出
        if (source.data.type == 'output') {
          return graph.removeEdge(edge.id)
        }

        // 如果线源头的一端链接桩只允许输入
        if (/in/.test((edge.source as any).port)) {
          return graph.removeEdge(edge.id)
        }

        // 目标一端链接桩只允许输出
        if (/out/.test((edge.target as any).port)) {
          return graph.removeEdge(edge.id)
        }

        if (source.data.type == 'condition') {
          console.log(source)
          console.log(target)
          console.log(edge)
          if (target.data.t === edge.id || target.data.f === edge.id) {
            return graph.removeEdge(edge.id)
          }
          // this.$refs.dialogCondition.visible = true
          // this.$refs.dialogCondition.init(source.data, edge)
        }

        source.addChild(target)

        edge.attr({
          line: {
            strokeDasharray: ''
          }
        })
      })

      graph.on('node:change:data', ({node}) => {
        const edges = graph.getIncomingEdges(node)
        const {status} = node.getData()
        edges?.forEach((edge) => {
          if (status === 'running') {
            edge.attr('line/strokeDasharray', 5)
            edge.attr('line/style/animation', 'running-line 30s infinite linear')
          } else {
            edge.attr('line/strokeDasharray', '')
            edge.attr('line/style/animation', '')
          }

        })

      })

      window.addEventListener("resize", () => {

        this.resizeContainer()
        // this.graph.resize(
        //     flowPane.clientWidth - 20  ,
        //     flowPane.clientHeight - 20
        // );
        // // 所有节点 适配
        // this.devs.forEach((item:any) => {
        //   // 注册时就是用的 设备id
        //   const node = this.graph.getCellById(item._id);
        //   if (node) {
        //     // 拿到 当前节点等 宽高 坐标 的Rem 信息
        //     const { widthRem, heightRem, xRem, yRem } = node.getData();
        //     // 设置节点的宽高
        //     node.resize(widthRem * currentFontSize, heightRem * currentFontSize);
        //     // 设置节点的位置
        //     node.position(xRem * currentFontSize, yRem * currentFontSize);
        //   }
        // });
      });

    },
    resizeContainer() {
      // 画布适配
      const flowPane = this.$refs.containerPane as HTMLDivElement
      this.graph.resize(
          flowPane.clientWidth - 1,
          flowPane.clientHeight - 1
      );
    },
    registeNode() {
      Graph.registerNode(
          'dag-condition',
          {
            inherit: 'vue-shape',
            width: 180,
            height: 36,
            component: {
              template: `
                <node-cell/>`,
              components: {
                NodeCell
              }
            },
            ports: {
              groups: {
                top: {
                  position: 'top',
                  attrs:
                      {
                        circle: {
                          r: 4,
                          magnet: true,
                          stroke:
                              '#C2C8D5',
                          strokeWidth: 1,
                          fill: '#fff'
                        }
                      }
                },
                bottom: {
                  position: 'bottom',
                  attrs: {
                    circle: {
                      r: 4,
                      magnet:
                          true,
                      stroke: '#C2C8D5',
                      strokeWidth: 1,
                      fill: '#fff'
                    }
                  }
                }
              }
            }
          },
          true
      )
      Graph.registerNode(
          'dag-onlyIn',
          {
            inherit: 'vue-shape',
            width: 180,
            height: 36,
            component: {
              template: `
                <node-cell/>`,
              components: {
                NodeCell
              }
            },
            ports: {
              groups: {
                top: {
                  position: 'top',
                  attrs:
                      {
                        circle: {
                          r: 4,
                          magnet: true,
                          stroke:
                              '#C2C8D5',
                          strokeWidth: 1,
                          fill: '#fff'
                        }
                      }
                },
                bottom: {
                  position: 'bottom',
                  attrs: {
                    circle: {
                      r: 4,
                      magnet:
                          true,
                      stroke: '#C2C8D5',
                      strokeWidth: 1,
                      fill: '#fff'
                    }
                  }
                }
              }
            }
          },
          true
      )
      Graph.registerConnector(
          'algo-connector',
          (s, e) => {
            const offset = 4
            const deltaY = Math.abs(e.y - s.y)
            const control = Math.floor((deltaY / 3) * 2)

            const v1 = {x: s.x, y: s.y + offset + control}
            const v2 = {x: e.x, y: e.y - offset - control}

            return Path.normalize(
                `M ${s.x} ${s.y}
           L ${s.x} ${s.y + offset}
           C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
           L ${e.x} ${e.y}
          `
            )
          },
          true
      )
      Graph.registerEdge(
          'dag-edge',
          {
            inherit: 'edge',
            attrs: {
              line: {
                stroke: '#C2C8D5',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8
                }
              }
            }
          },
          true
      )
      Graph.registerNode(
          'dag-output',
          {
            inherit: 'vue-shape',
            width: 180,
            height: 36,
            component: {
              template: `
                <node-cell/>`,
              components: {
                NodeCell
              }
            },
            ports: {
              groups: {
                top: {
                  position: 'top',
                  attrs:
                      {
                        circle: {
                          r: 4,
                          magnet: true,
                          stroke:
                              '#C2C8D5',
                          strokeWidth: 1,
                          fill: '#fff'
                        }
                      }
                },
                bottom: {
                  position: 'bottom',
                  attrs: {
                    circle: {
                      r: 4,
                      magnet:
                          true,
                      stroke: '#C2C8D5',
                      strokeWidth: 1,
                      fill: '#fff'
                    }
                  }
                }
              }
            }
          },
          true
      )
      Graph.registerNode(
          'dag-node',
          {
            inherit: 'vue-shape',
            width: 180,
            height: 36,
            component: {
              template: `
                <node-cell/>`,
              components: {
                NodeCell
              }
            },
            ports: {
              groups: {
                top: {
                  position: 'top',
                  attrs:
                      {
                        circle: {
                          r: 4,
                          magnet: true,
                          stroke:
                              '#C2C8D5',
                          strokeWidth: 1,
                          fill: '#fff'
                        }
                      }
                },
                bottom: {
                  position: 'bottom',
                  attrs: {
                    circle: {
                      r: 4,
                      magnet:
                          true,
                      stroke: '#C2C8D5',
                      strokeWidth: 1,
                      fill: '#fff'
                    }
                  }
                }
              }
            }
          },
          true
      )
    },
    keyBindFn() {
      // delete
      this.graph.bindKey(['delete'], () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          this.graph.removeCells(cells)
        }
        return false
      })

      // copy
      this.graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          this.graph.copy(cells)
        }
        return false
      })

      // cut
      this.graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          this.graph.cut(cells)
        }
        return false
      })

      // paste
      this.graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({offset: 32})
          this.graph.cleanSelection()
          this.graph.select(cells)
        }
        return false
      })

      // undo
      this.graph.bindKey(['meta+z', 'ctrl+z'], () => {
        this.undo()
        return false
      })
      // redo
      this.graph.bindKey(['meta+y', 'ctrl+y'], () => {
        this.redo()
        return false
      })
    },
    undo() {
      if (this.graph.history.canUndo()) {
        this.graph.history.undo()
      }
    },
    redo() {
      if (this.graph.history.canRedo()) {
        this.graph.history.redo()
      }
    },
    setProcess(index: number, modalName: string) {
      this.modalName = modalName
      let url = window.location.href.split("#")[0] + "./process/process" + index + ".json";
      axios.get(url).then(res => {
        this.graph.fromJSON(res.data)
        this.center()
      })

    },
    download(fileName: string, str: string) {
      const blob = new Blob([str])
      const objectUrl = window.URL.createObjectURL(blob)//创建新的URL表示指定Blob对象
      const a = document.createElement('a')//创建a标签
      a.href = objectUrl//指定下载链接
      a.download = fileName//指定下载文件名
      a.click()//触发下载
      a.remove()//除a标签
      window.URL.revokeObjectURL(objectUrl)//释放
    }
  },
  mounted() {
    setTimeout(() => {
      this.init()
      this.registeNode()
      this.keyBindFn()
      setTimeout(() => this.resizeContainer(), 200)
    }, 200)

  }
})
</script>
