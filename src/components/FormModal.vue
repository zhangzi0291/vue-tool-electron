<style lang="less">

</style>
<template>
  <a-form ref="form" layout="vertical">
    <template v-for="item in columns" :key="item.key+item.title">
      <!--  插槽  -->
      <a-form-item v-if="canEdit(item.key) && item.type == 'Slot'" :label="item.title" :name="item.key">
        <slot :data="data" :name="item.slot"/>
      </a-form-item>
      <!--  字符串  -->
      <a-form-item v-else-if="canEdit(item.key) && item.type == 'String'" :label="item.title" :name="item.key">
        <a-input v-model:value="data[item.key]" allowClear/>
      </a-form-item>
      <!--  文本框  -->
      <a-form-item v-else-if="canEdit(item.key) && item.type == 'Textarea'" :label="item.title" :name="item.key">
        <a-textarea v-model:value="data[item.key]" allowClear/>
      </a-form-item>
      <!--  密码  -->
      <a-form-item v-else-if="canEdit(item.key) && item.type == 'Password'" :label="item.title" :name="item.key">
        <a-input-password v-model:value="data[item.key]"/>
      </a-form-item>
      <!--  数字  -->
      <a-form-item v-else-if="canEdit(item.key) && item.type == 'Number'" :label="item.title" :name="item.key">
        <a-input-number v-model:value="data[item.key]">
          {{ data[item.key] }}
        </a-input-number>
      </a-form-item>
      <!--  下拉框  -->
      <a-form-item v-else-if="canEdit(item.key) && item.type == 'Select'" :label="item.title" :name="item.key">
        <a-select v-model:value="data[item.key]">
          <template v-for="select in item.array">
            <a-select-option :value="select.value">
              {{ select.label }}
            </a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <!--  日期时间  -->
      <a-form-item v-else-if="canEdit(item.key) && item.type == 'DateTime'" :label="item.title" :name="item.key">
        <a-date-picker :defaultValue="data[item.key]" show-time @ok="onDateTimeOk($event,item)"/>
      </a-form-item>
      <!--  日期  -->
      <a-form-item v-else-if="canEdit(item.key) && item.type == 'Date'" :label="item.title" :name="item.key">
        <a-date-picker @ok="onDateTimeOk($event,item)"/>
      </a-form-item>

      <template v-else>

      </template>

    </template>
  </a-form>
</template>
<script lang="ts">

import {Options, Vue} from 'vue-class-component';
import {AxiosResponse} from 'axios';
import {Moment} from 'moment';


export class ModalField {

  public key = '';
  public title = '';
  public type: "String" | "Select" | "Number" | "Slot" | "Password" | "DateTime" | 'File' | 'Image' | 'Textarea' | undefined;
  public slot: string | undefined;
  public edit: boolean | undefined = true;
  public array: Array<Object> | undefined;
  public url: string | undefined;
  public ext: Ext | undefined = new Ext();

  public init(title: string, key: string, type: "String" | "Number" | "Slot" | "Password" | "DateTime" | 'File' | 'Image' | 'Textarea' | undefined, edit?: boolean, ext?: Ext) {
    this.key = key;
    this.title = title;
    this.type = type;
    this.slot = key;
    if (ext != undefined) {
      this.ext = ext;
    }
    if (edit != undefined) {
      this.edit = edit;
    }
    return this
  }

  public initNumber(title: string, key: string, ext?: Ext) {
    this.key = key;
    this.title = title;
    this.type = "Number";
    this.ext = ext;
    return this
  }

  public initSelect(title: string, key: string, ext: Ext, array: SelectField[] | undefined) {
    this.key = key;
    this.title = title;
    this.type = "Select";
    this.array = array;
    this.ext = ext;

    return this
  }


}

export class SelectField {

  public label: string | undefined;
  public value: any;

  constructor(label: string, value: any) {
    this.label = label;
    this.value = value;
  }

}

export class Ext {
  name = "files";
  fileNum = 1;
  fileSize = 2;
}

@Options({
  name: 'FormModal',
  data() {
    return {
      url: "",
      visible: false,
      data: {},
      fileList: {},
      img: "",
      layout: {
        labelCol: {span: 8},
        wrapperCol: {span: 14},
      },
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  methods: {
    initData(data: any) {
      this.data = data
    },
    getData() {
      return this.data
    },
    canEdit(key: string) {
      if (this.data.id == undefined) {
        return true
      }
      for (let column of this.columns) {
        if (column.key == key) {
          if (!column.edit) {
            return false
          }
        }
      }
      return true;
    },
    onDateTimeOk(date: Moment, item: ModalField) {
      this.data[item.key] = date.toDate().Format('yyyy-MM-dd hh:mm:ss')
    },


  },

})


export default class FormModal extends Vue {
}

</script>