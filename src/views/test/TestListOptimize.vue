<template>
  <div class="test-list-optimize">
    <el-select class="select" v-model="selectItem" :placeholder="'已生成' + list.length + '条数据'">
      <recycle-scroller
        class="scroller"
        :items="list"
        :item-size="34"
        key-field="value"
      >
        <template v-slot="{ item }">
          <el-option :label="item.label" :value="item.value"></el-option>
        </template>
      </recycle-scroller>
    </el-select>
    <el-button type="primary" class="btn" @click="addItems">新增 2000 条</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectItem: '',
        list: Array.from({length: 2000}, (v, k) => Object.freeze({label: k + 1, value: k + 1}))
      }
    },
    methods: {
      addItems() {
        let lastIndex = this.list[this.list.length - 1].value;
        this.list = this.list.concat(Array.from({length: 2000}, (v, k) => Object.freeze({label: k + 1 + lastIndex, value: k + 1 + lastIndex})));
      }
    }
  }
</script>

<style lang="scss" scoped>
.test-list-optimize {
  display: flex;
  padding: 20px 0;
  .btn {
    flex: 0 0 120px;
    width: 120px;
    margin-left: 20px;
  }
  .select {
    flex: 1;
  }
}
.scroller {
  max-height: 240px;
}
</style>